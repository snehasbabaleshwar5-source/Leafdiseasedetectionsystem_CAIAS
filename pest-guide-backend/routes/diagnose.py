from flask import Blueprint, jsonify, request
from predict import predict_disease

diagnose_bp = Blueprint("diagnose", __name__)


@diagnose_bp.route("", methods=["POST"])
def diagnose():
    if 'image' not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    file = request.files['image']

    if file.filename == '':
        return jsonify({"error": "No file selected"}), 400

    allowed = {'png', 'jpg', 'jpeg', 'webp'}
    ext = file.filename.rsplit('.', 1)[-1].lower()
    if ext not in allowed:
        return jsonify({"error": "File must be png, jpg, jpeg or webp"}), 400

    image_bytes = file.read()
    result = predict_disease(image_bytes)

    if not result['success']:
        return jsonify({"error": result['error']}), 500

    return jsonify(result)