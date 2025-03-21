from mongoengine import ReferenceField, ListField, Document, StringField

class MigrationModel(Document):
    meta = {
        "collection": "migrations"
    }

    name = StringField(required=True, unique=True)