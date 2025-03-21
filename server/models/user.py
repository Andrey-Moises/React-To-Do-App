from mongoengine import ReferenceField, ListField, Document, StringField

class UserModel(Document):

    meta = {
        'collection': 'users',
    }

    username = StringField(required=True, unique=True)
    email    = StringField(required=True)
    password = StringField(required=True)
    tasks    = ListField(ReferenceField('TaskModel'))
