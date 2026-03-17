from flask import Blueprint, jsonify, request
from models.entry import (
    get_all_entries,
    get_entry_by_id,
    create_entry,
    update_entry,
    delete_entry,
)

entries_bp = Blueprint("entries", __name__)

REQUIRED_FIELDS = {"category", "type_label", "name", "agent"}
VALID_CATEGORIES = {
    "fungal", "bacterial", "viral", "protozoal",
    "nematode", "physiological", "insect",
}


def _validate_entry_body(body):
    missing = REQUIRED_FIELDS - body.keys()
    if missing:
        return f"Missing required fields: {', '.join(sorted(missing))}"
    if body.get("category") not in VALID_CATEGORIES:
        return f"Invalid category. Must be one of: {', '.join(sorted(VALID_CATEGORIES))}"
    if not isinstance(body.get("crops", []), list):
        return "'crops' must be a list of strings."
    if not isinstance(body.get("management", []), list):
        return "'management' must be a list of strings."
    return None


@entries_bp.route("", methods=["GET"])
def list_entries():
    category = request.args.get("category")
    if category and category not in VALID_CATEGORIES:
        return jsonify({"error": f"Unknown category '{category}'"}), 400

    page     = max(1, int(request.args.get("page", 1)))
    per_page = min(100, max(1, int(request.args.get("per_page", 20))))

    all_items = get_all_entries(category)
    total     = len(all_items)
    start     = (page - 1) * per_page
    items     = all_items[start : start + per_page]

    return jsonify({
        "total":    total,
        "page":     page,
        "per_page": per_page,
        "pages":    max(1, -(-total // per_page)),
        "items":    items,
    })


@entries_bp.route("/<int:entry_id>", methods=["GET"])
def get_entry(entry_id):
    entry = get_entry_by_id(entry_id)
    if not entry:
        return jsonify({"error": "Entry not found"}), 404
    return jsonify(entry)


@entries_bp.route("", methods=["POST"])
def add_entry():
    body = request.get_json(silent=True)
    if not body:
        return jsonify({"error": "JSON body required"}), 400

    err = _validate_entry_body(body)
    if err:
        return jsonify({"error": err}), 422

    entry = create_entry(body)
    return jsonify(entry), 201


@entries_bp.route("/<int:entry_id>", methods=["PUT"])
def edit_entry(entry_id):
    if not get_entry_by_id(entry_id):
        return jsonify({"error": "Entry not found"}), 404

    body = request.get_json(silent=True)
    if not body:
        return jsonify({"error": "JSON body required"}), 400

    if "category" in body and body["category"] not in VALID_CATEGORIES:
        return jsonify({"error": "Invalid category"}), 422

    updated = update_entry(entry_id, body)
    return jsonify(updated)


@entries_bp.route("/<int:entry_id>", methods=["DELETE"])
def remove_entry(entry_id):
    if not delete_entry(entry_id):
        return jsonify({"error": "Entry not found"}), 404
    return jsonify({"message": f"Entry {entry_id} deleted successfully"}), 200