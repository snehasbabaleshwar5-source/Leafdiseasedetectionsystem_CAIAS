from flask import Flask
from flask_cors import CORS

from db.database import init_db
from routes.entries import entries_bp
from routes.search import search_bp
from routes.categories import categories_bp
from routes.admin import admin_bp
from routes.diagnose import diagnose_bp

app = Flask(__name__)
app.config["SECRET_KEY"] = "pest-guide-secret-2024"

CORS(app, resources={r"/api/*": {"origins": "*"}})

app.register_blueprint(entries_bp,    url_prefix="/api/entries")
app.register_blueprint(search_bp,     url_prefix="/api/search")
app.register_blueprint(categories_bp, url_prefix="/api/categories")
app.register_blueprint(admin_bp,      url_prefix="/api/admin")
app.register_blueprint(diagnose_bp,   url_prefix="/api/diagnose")

@app.route("/")
def index():
    return {"name": "Pest Guide API", "status": "ok"}

@app.route("/health")
def health():
    return {"status": "ok"}

if __name__ == "__main__":
    init_db()
    app.run(debug=False, host="127.0.0.1", port=5000, use_reloader=False)
