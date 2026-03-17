from flask import Blueprint, jsonify, request
from db.database import get_conn

search_bp = Blueprint("search", __name__)


def _hydrate(conn, row):
    entry_id = row["id"]
    crops = [
        r["name"]
        for r in conn.execute(
            """SELECT c.name FROM crops c
               JOIN entry_crops ec ON ec.crop_id = c.id
               WHERE ec.entry_id = ?""",
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
        "crops":      crops,
        "management": steps,
    }


@search_bp.route("", methods=["GET"])
def search():
    q        = (request.args.get("q") or "").strip()
    category = request.args.get("category", "").strip() or None
    page     = max(1, int(request.args.get("page", 1)))
    per_page = min(100, max(1, int(request.args.get("per_page", 20))))

    if len(q) < 2:
        return jsonify({"error": "Search query must be at least 2 characters"}), 400

    like = f"%{q}%"

    conn = get_conn()

    sql = """
        SELECT DISTINCT e.*
        FROM entries e
        LEFT JOIN entry_crops ec ON ec.entry_id = e.id
        LEFT JOIN crops c        ON c.id = ec.crop_id
        LEFT JOIN management m   ON m.entry_id = e.id
        WHERE (
            e.name       LIKE ? OR
            e.agent      LIKE ? OR
            e.type_label LIKE ? OR
            c.name       LIKE ? OR
            m.step       LIKE ?
        )
    """
    params = [like, like, like, like, like]

    if category:
        sql    += " AND e.category = ?"
        params.append(category)

    sql += " ORDER BY e.category, e.name"

    rows  = conn.execute(sql, params).fetchall()
    total = len(rows)

    start     = (page - 1) * per_page
    page_rows = rows[start : start + per_page]

    items = [_hydrate(conn, r) for r in page_rows]
    conn.close()

    return jsonify({
        "query":    q,
        "total":    total,
        "page":     page,
        "per_page": per_page,
        "pages":    max(1, -(-total // per_page)),
        "items":    items,
    })