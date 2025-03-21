import os
from pymongo import ASCENDING

DATABASE_URL  = os.getenv("DATABASE_URL")
DATABASE_NAME = os.getenv("DATABASE_NAME")
AUTH_SOURCE   = os.getenv("AUTH_SOURCE")

def up(db):
    # 1. Crear colección 'users' si no existe
    if "users" not in db.list_collection_names():
        db.create_collection("users")

    # 2. Crear índice único en 'username' para usuarios
    db.users.create_index([("username", ASCENDING)], unique=True, name="unique_username")

    # 3. Añadir campo 'user' a tasks (como referencia)
    # - Si ya hay tareas, asignar un usuario por defecto (ej: admin)
    admin_user = db.users.find_one({"username": "admin"})
    if not admin_user:
        admin_user_id = db.users.insert_one({
            "username": "Andrey",
            "email": "andreygarciamoises@gmail.com",
            "password": "adminMoises88!",
            "tasks": []
        }).inserted_id
    else:
        admin_user_id = admin_user["_id"]

    # Actualizar todas las tareas existentes con 'user' por defecto
    db.tasks.update_many(
        {"user": {"$exists": False}},
        {"$set": {"user": admin_user_id}}
    )

    # 4. Crear índice en 'user' para tasks
    db.tasks.create_index([("user", ASCENDING)], name="user_tasks_index")

def down(db):
    # Rollback: Eliminar índices y campos
    db.tasks.drop_index("user_tasks_index")
    db.users.drop_index("unique_username")
    db.tasks.update_many({}, {"$unset": {"user": ""}})