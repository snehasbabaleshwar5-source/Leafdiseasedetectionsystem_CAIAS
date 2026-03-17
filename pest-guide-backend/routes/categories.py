from flask import Blueprint, jsonify
from db.database import get_conn

categories_bp = Blueprint("categories", __name__)

CATEGORY_ORDER = [
    "fungal", "bacterial", "viral", "protozoal",
    "nematode", "physiological", "insect",
]


@categories_bp.route("", methods=["GET"])
def list_categories():
    conn = get_conn()

    rows = conn.execute(
        """
        SELECT c.slug, c.label,
               COUNT(e.id) AS entry_count
        FROM   categories c
        LEFT JOIN entries e ON e.category = c.slug
        GROUP  BY c.slug, c.label
        """
    ).fetchall()

    order_map = {s: i for i, s in enumerate(CATEGORY_ORDER)}
    result = sorted(
        [dict(r) for r in rows],
        key=lambda x: order_map.get(x["slug"], 99),
    )

    conn.close()
    return jsonify({"categories": result, "total": len(result)})


@categories_bp.route("/<slug>", methods=["GET"])
def get_category(slug):
    conn = get_conn()

    cat = conn.execute(
        "SELECT * FROM categories WHERE slug=?", (slug,)
    ).fetchone()

    if not cat:
        conn.close()
        return jsonify({"error": f"Category '{slug}' not found"}), 404

    entries = conn.execute(
        "SELECT id, name, agent FROM entries WHERE category=? ORDER BY name",
        (slug,),
    ).fetchall()

    conn.close()
    return jsonify({
        "slug":        cat["slug"],
        "label":       cat["label"],
        "entry_count": len(entries),
        "entries":     [dict(e) for e in entries],
    })


@categories_bp.route("/<slug>/crops", methods=["GET"])
def category_crops(slug):
    conn = get_conn()

    rows = conn.execute(
        """
        SELECT DISTINCT c.name
        FROM   crops c
        JOIN   entry_crops ec ON ec.crop_id = c.id
        JOIN   entries e      ON e.id = ec.entry_id
        WHERE  e.category = ?
        ORDER  BY c.name
        """,
        (slug,),
    ).fetchall()

    conn.close()

    return jsonify({
        "category": slug,
        "crops":    [r["name"] for r in rows],
        "total":    len(rows),
    })