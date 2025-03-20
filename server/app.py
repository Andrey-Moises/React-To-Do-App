from db import db
from flask         import Flask
from flask_smorest import Api
from dotenv import load_dotenv
from resources.task import blp as TaskBlueprint

load_dotenv()


def create_app():
    app = Flask(__name__)
    
    # Configuración de Flask-Mongoengine
    app.config["MONGODB_SETTINGS"] = {
        "db": "tasks_db",
        "host": "localhost",
        "port": 27017,
        "username": "root",
        "password": "rootpassword",
        "authentication_source": "admin"
    }

    # Configuración de Flask-Smorest
    app.config["API_TITLE"] = "Tasks API"
    app.config["API_VERSION"] = "v1"
    app.config["OPENAPI_VERSION"] = "3.0.2"
    app.config["OPENAPI_URL_PREFIX"] = "/"
    app.config["OPENAPI_SWAGGER_UI_PATH"] = "/swagger-ui"
    app.config["OPENAPI_SWAGGER_UI_URL"] = "https://cdn.jsdelivr.net/npm/swagger-ui-dist/"

    api = Api(app)

    db.init_app(app)

    # Register blueprints

    api.register_blueprint(TaskBlueprint)

    return app