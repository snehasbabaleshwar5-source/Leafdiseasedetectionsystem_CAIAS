from db.database import get_conn


def _row_to_entry(conn, row) -> dict:
    entry_id = row["id"]

    crops = [
        r["name"]
        for r in conn.execute(
            """SELECT c.name FROM crops c
               JOIN entry_crops ec ON ec.crop_id = c.id
               WHERE ec.entry_id = ?
               ORDER BY c.name""",
            (entry_id,),
        ).fetchall()
    ]

    steps = [
        r["step"]
        for r in conn.execute(
            "SELECT step FROM management WHERE entry_id=? ORDER BY step_no",
            (entry_id,),
        ).fetchall()
    ]

    return {
        "id":         row["id"],
        "category":   row["category"],
        "type_label": row["type_label"],
        "name":       row["name"],
        "agent":      row["agent"],
        "created_at": row["created_at"],
        "crops":      crops,
        "management": steps,
    }


def get_all_entries(category=None):
    conn = get_conn()
    if category:
        rows = conn.execute(
            "SELECT * FROM entries WHERE category=? ORDER BY name", (category,)
        ).fetchall()
    else:
        rows = conn.execute("SELECT * FROM entries ORDER BY category, name").fetchall()
    result = [_row_to_entry(conn, r) for r in rows]
    conn.close()
    return result


def get_entry_by_id(entry_id):
    conn = get_conn()
    row = conn.execute(
        "SELECT * FROM entries WHERE id=?", (entry_id,)
    ).fetchone()
    if not row:
        conn.close()
        return None
    result = _row_to_entry(conn, row)
    conn.close()
    return result


def create_entry(data):
    conn = get_conn()
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO entries (category, type_label, name, agent) VALUES (?,?,?,?)",
        (data["category"], data["type_label"], data["name"], data["agent"]),
    )
    entry_id = cur.lastrowid

    for crop_name in data.get("crops", []):
        cur.execute("INSERT OR IGNORE INTO crops (name) VALUES (?)", (crop_name,))
        crop_id = cur.execute(
            "SELECT id FROM crops WHERE name=?", (crop_name,)
        ).fetchone()["id"]
        cur.execute("INSERT OR IGNORE INTO entry_crops VALUES (?,?)", (entry_id, crop_id))

    for i, step in enumerate(data.get("management", []), 1):
        cur.execute(
            "INSERT INTO management (entry_id, step_no, step) VALUES (?,?,?)",
            (entry_id, i, step),
        )

    conn.commit()
    result = get_entry_by_id(entry_id)
    conn.close()
    return result


def update_entry(entry_id, data):
    conn = get_conn()
    cur = conn.cursor()

    fields = []
    values = []
    for key in ("category", "type_label", "name", "agent"):
        if key in data:
            fields.append(f"{key}=?")
            values.append(data[key])
    if fields:
        values.append(entry_id)
        cur.execute(f"UPDATE entries SET {', '.join(fields)} WHERE id=?", values)

    if "crops" in data:
        cur.execute("DELETE FROM entry_crops WHERE entry_id=?", (entry_id,))
        for crop_name in data["crops"]:
            cur.execute("INSERT OR IGNORE INTO crops (name) VALUES (?)", (crop_name,))
            crop_id = cur.execute(
                "SELECT id FROM crops WHERE name=?", (crop_name,)
            ).fetchone()["id"]
            cur.execute(
                "INSERT OR IGNORE INTO entry_crops VALUES (?,?)", (entry_id, crop_id)
            )

    if "management" in data:
        cur.execute("DELETE FROM management WHERE entry_id=?", (entry_id,))
        for i, step in enumerate(data["management"], 1):
            cur.execute(
                "INSERT INTO management (entry_id, step_no, step) VALUES (?,?,?)",
                (entry_id, i, step),
            )

    conn.commit()
    conn.close()
    return get_entry_by_id(entry_id)


def delete_entry(entry_id):
    conn = get_conn()
    affected = conn.execute(
        "DELETE FROM entries WHERE id=?", (entry_id,)
    ).rowcount
    conn.commit()
    conn.close()
    return affected > 0