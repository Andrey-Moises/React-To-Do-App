import os
from pymongo        import MongoClient, ASCENDING
from pymongo.errors import DuplicateKeyError

DATABASE_URL  = os.getenv("DATABASE_URL")
DATABASE_NAME = os.getenv("DATABASE_NAME")
AUTH_SOURCE   = os.getenv("AUTH_SOURCE")

def up(db):
    # Crear la colección (MongoDB la crea automáticamente al insertar datos, pero podemos forzarla)
    db.create_collection("tasks")

    db.tasks.create_index(
        [("title", ASCENDING)],
        unique=False,
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