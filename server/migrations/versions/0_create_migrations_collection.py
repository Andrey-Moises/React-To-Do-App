from pymongo import ASCENDING

def up(db):
    """
    Crea la colección 'migrations' con:
    - Índice único en el campo 'name'
    - Validación básica de esquema
    """
    # Crear la colección si no existe
    if "migrations" not in db.list_collection_names():
        db.create_collection("migrations")

    # Crear índice único en 'name'
    db.migrations.create_index(
        [("name", ASCENDING)],
        unique=True,
        name="unique_name"
    )

    # Validación de esquema opcional
    db.command({
        "collMod": "migrations",
        "validator": {
            "$jsonSchema": {
                "bsonType": "object",
                "required": ["name"],
                "properties": {
                    "name": {
                        "bsonType": "string",
                        "description": "Nombre único de la migración"
                    }
                }
            }
        }
    })

def down(db):
    """
    Rollback: Elimina la colección y sus índices
    """
    if "migrations" in db.list_collection_names():
        db.migrations.drop_index("unique_name")
        db.drop_collection("migrations")