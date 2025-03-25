from mongoengine import ReferenceField, ListField, Document, StringField

class UserModel(Document):

    meta = {
        'collection': 'users',
    }

    username = StringField(required=True)
    email    = StringField(required=True, unique=True)
    password = StringField(required=True)
    name     = StringField(required=True)
    lastName = StringField(required=True)

    # Referencia a las tareas del usuario
    tasks    = ListField(ReferenceField('TaskModel'))
