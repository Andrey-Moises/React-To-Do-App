import os
import glob
import importlib.util
from db             import db
from flask          import Flask
from models         import *
from pymongo        import MongoClient
from flask_smorest  import Api
from resources.task import blp as TaskBlueprint

def run_migrations():

    """Ejecuta las migraciones en el directorio /migrations."""
    try:
        client = MongoClient(os.getenv("DATABASE_URL"))
        db     = client.get_database("todoApp")
        print("✅   Conexión a la base de datos establecida")

        migrations_dir  = os.path.join(os.path.dirname(__file__), "migrations", "versions")
        migration_files = sorted(glob.glob(os.path.join(migrations_dir, "*.py")))

        try:
            # Obtener las migraciones aplicadas
            applied_migrations = db["migrations"].find({}, {"name": 1})
            applied_names = [m["name"] for m in applied_migrations]
        except Exception as e:
            print("⚠️   Colección migrations no existe, iniciando desde cero")
            applied_names = []

        for file_path in migration_files:
            filename = os.path.basename(file_path)
            if filename in applied_names:
                continue

            try:
                # Cargar y ejecutar la migración
                spec = importlib.util.spec_from_file_location("migration_module", file_path)
                module = importlib.util.module_from_spec(spec)
                spec.loader.exec_module(module)

                module.up(db)                                    # Ejecutar la función `up` de la migración
                db["migrations"].insert_one({"name": filename})  # Registrar la migración
                print(f"✅  Migración aplicada: {filename}")
            except Exception as e:
                print(f"❌  Error en {filename}: {str(e)}")
                raise
    except Exception as e:
        print(f"❌  Error al conectar a la base de datos: {str(e)}")
        raise

def create_app():

    app = Flask(__name__)

    app.config["MONGODB_SETTINGS"] = {
        "host" : os.getenv("DATABASE_URL") + "todoApp?authSource=admin"
    }
    
    print(f"MongoDB URL: {app.config['MONGODB_SETTINGS']['host']}")

    # Configuración de Flask-Smorest
    app.config["API_TITLE"] = "Tasks API"
    app.config["API_VERSION"] = "v1"
    app.config["OPENAPI_VERSION"] = "3.0.2"
    app.config["OPENAPI_URL_PREFIX"] = "/"
    app.config["OPENAPI_SWAGGER_UI_PATH"] = "/swagger-ui"
    app.config["OPENAPI_SWAGGER_UI_URL"] = "https://cdn.jsdelivr.net/npm/swagger-ui-dist/"

    api = Api(app)

    db.init_app(app)

    # Correr migraciones al iniciar la aplicación

    with app.app_context():
        run_migrations()

    # Registrar los blueprints

    api.register_blueprint(TaskBlueprint)

    return app