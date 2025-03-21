from datetime    import datetime
from mongoengine import ReferenceField, Document, StringField, DateTimeField

class TaskModel(Document):
    meta = {
        'collection': 'tasks',
        'indexes': [
            {
                'fields' : ['title'],
                'unique' : False,
                'sparse' : True,
                'name'   : 'unique_title'
            },
            {
                'fields' : ['user'], 
                'name'   : 'user_tasks_index'
            },
        ]
    }

    title       = StringField(required=True)
    description = StringField()
    status      = StringField(choices=["TODO", "IN_PROGRESS", "DONE"], default="TODO")
    created_at  = DateTimeField(default=datetime.now, required=True)                     # Fecha automática al crear
    updated_at  = DateTimeField(default=datetime.now, required=True)                     # Fecha automática al crear y actualizar
    user        = ReferenceField('UserModel')                                            # Referencia a un usuario

    # Actualizar "updated_at" cada vez que se guarda
    def save(self, *args, **kwargs):
        self.updated_at = datetime.now()
        return super().save(*args, **kwargs)

    def __repr__(self):
        return f'TaskModel({self.title}, {self.description}, {self.status})'  # Corregido "completed" -> "status"