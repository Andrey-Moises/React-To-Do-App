import os
from db                 import db
from flask              import Flask
from models             import *
from datetime           import timedelta
from flask_smorest      import Api
from resources.task     import blp as TaskBlueprint
from resources.user     import blp as UserBlueprint
from resources.login    import blp as LoginBlueprint
from flask_jwt_extended import JWTManager
            
def create_app():

    app = Flask(__name__)
    app.config["MONGODB_SETTINGS"] = {
        "host" : os.getenv("DATABASE_URL") + "todoApp?authSource=admin"
    }

    # Configuración de Flask-Smorest
    app.config["API_TITLE"] = "Tasks API"
    app.config["API_VERSION"] = "v1"
    app.config["OPENAPI_VERSION"] = "3.0.2"
    app.config["OPENAPI_URL_PREFIX"] = "/"
    app.config["OPENAPI_SWAGGER_UI_PATH"] = "/swagger-ui"
    app.config["OPENAPI_SWAGGER_UI_URL"] = "https://cdn.jsdelivr.net/npm/swagger-ui-dist/"

    # Configuración de Flask-Smorest
    api = Api(app)

    # Configuración de la base de datos
    db.init_app(app)

    # Configuración de JWT
    app.config["JWT_SECRET_KEY"]            = os.getenv("JWT_SECRET_KEY")
    app.config["JWT_ACCESS_TOKEN_EXPIRES"]  = timedelta(seconds=int(os.getenv("JWT_ACCESS_TOKEN_EXPIRES")))
    app.config["JWT_REFRESH_TOKEN_EXPIRES"] = timedelta(seconds=int(os.getenv("JWT_REFRESH_TOKEN_EXPIRES")))
    jwt = JWTManager(app)

    # Registrar los blueprints
    api.register_blueprint(TaskBlueprint)
    api.register_blueprint(UserBlueprint)
    api.register_blueprint(LoginBlueprint)

    return app