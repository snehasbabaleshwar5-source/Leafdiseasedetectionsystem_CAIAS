from flask import Blueprint, jsonify, request
from db.database import get_conn, init_db
import os

admin_bp = Blueprint("admin", __name__)

ADMIN_TOKEN = os.environ.get("ADMIN_TOKEN", "narei-admin-2024")


def _require_token():
    token = request.headers.get("X-Admin-Token") or request.args.get("token")
    if token != ADMIN_TOKEN:
        return jsonify({"error": "Unauthorized. Provide X-Admin-Token header."}), 401
    return None


@admin_bp.route("/stats", methods=["GET"])
def stats():
    conn = get_conn()

    total_entries = conn.execute("SELECT COUNT(*) FROM entries").fetchone()[0]
    total_crops   = conn.execute("SELECT COUNT(*) FROM crops").fetchone()[0]
    total_steps   = conn.execute("SELECT COUNT(*) FROM management").fetchone()[0]

    by_category = conn.execute(
        """
        SELECT category, COUNT(*) AS count
        FROM   entries
        GROUP  BY category
        ORDER  BY count DESC
        """
    ).fetchall()

    top_crops = conn.execute(
        """
        SELECT c.name, COUNT(ec.entry_id) AS entry_count
        FROM   crops c
        JOIN   entry_crops ec ON ec.crop_id = c.id
        GROUP  BY c.name
        ORDER  BY entry_count DESC
        LIMIT  10
        """
    ).fetchall()

    conn.close()

    return jsonify({
        "total_entries":          total_entries,
        "total_crops":            total_crops,
        "total_management_steps": total_steps,
        "entries_by_category":    [dict(r) for r in by_category],
        "top_10_crops":           [dict(r) for r in top_crops],
    })


@admin_bp.route("/crops", methods=["GET"])
def all_crops():
    conn = get_conn()
    rows = conn.execute(
        """
        SELECT c.name, COUNT(ec.entry_id) AS entry_count
        FROM   crops c
        LEFT JOIN entry_crops ec ON ec.crop_id = c.id
        GROUP  BY c.name
        ORDER  BY c.name
        """
    ).fetchall()
    conn.close()
    return jsonify({"crops": [dict(r) for r in rows], "total": len(rows)})


@admin_bp.route("/reset", methods=["POST"])
def reset_db():
    err = _require_token()
    if err:
        return err

    conn = get_conn()
    conn.executescript("""
        DELETE FROM management;
        DELETE FROM entry_crops;
        DELETE FROM crops;
        DELETE FROM entries;
        DELETE FROM categories;
    """)
    conn.commit()
    conn.close()

    init_db()

    return jsonify({"message": "Database reset and re-seeded successfully."})
