from db import db
from datetime import datetime

class TaskModel(db.Document):
    meta = {
        'collection': 'tasks',
        'indexes': [
            {
                'fields': ['title'],
                'unique': False,
                'sparse': True,
                'name': 'unique_title'
            }
        ]
    }

    title = db.StringField(required=True)
    description = db.StringField()
    status = db.StringField(choices=["TODO", "IN_PROGRESS", "DONE"], default="TODO")
    created_at = db.DateTimeField(default=datetime.utcnow, required=True)  # Fecha automática al crear
    updated_at = db.DateTimeField(default=datetime.utcnow, required=True)  # Fecha automática al crear y actualizar

    # Actualizar "updated_at" cada vez que se guarda
    def save(self, *args, **kwargs):
        self.updated_at = datetime.utcnow()
        return super().save(*args, **kwargs)

    def __repr__(self):
        return f'TaskModel({self.title}, {self.description}, {self.status})'  # Corregido "completed" -> "status"