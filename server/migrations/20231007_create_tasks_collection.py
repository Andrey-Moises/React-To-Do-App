from datetime import datetime
from pymongo import MongoClient, ASCENDING
from pymongo.errors import DuplicateKeyError

def up(db):
    # Crear la colección (MongoDB la crea automáticamente al insertar datos, pero podemos forzarla)
    db.create_collection("tasks")

    # Crear índice único en "title" (sparse=True permite documentos sin el campo)
    db.tasks.create_index(
        [("title", ASCENDING)],
        unique=True,
        sparse=True,
        name="unique_title"
    )

    # Añadir validación de esquema (opcional)
    db.command({
        "collMod": "tasks",
        "validator": {
            "$jsonSchema": {
                "bsonType": "object",
                "required": ["title", "status"],
                "properties": {
                    "title": {"bsonType": "string"},
                    "status": {"enum": ["TODO", "IN_PROGRESS", "DONE"], "description": "Debe ser uno de los valores permitidos"}
                }
            }
        }
    })

def down(db):
    # Eliminar el índice y la colección (rollback)
    db.tasks.drop_index("unique_title")
    db.drop_collection("tasks")

if __name__ == "__main__":
    # Conexión a MongoDB (ajusta según tu configuración)
    client = MongoClient(
        host="mongodb://root:rootpassword@localhost:27017/",
        authSource="admin"
    )
    db = client.tasks_db  # Nombre de la base de datos

    try:
        up(db)
        print("✅ Migración aplicada correctamente")
    except DuplicateKeyError:
        print("❌ Error: Ya existen tareas con el mismo título")
    except Exception as e:
        print(f"❌ Error durante la migración: {str(e)}")