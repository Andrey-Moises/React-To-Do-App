from marshmallow import Schema, fields, validate

class TaskSchema(Schema):

    id = fields.Str(dump_only=True)
    title = fields.Str(required=True, validate=validate.Length(min=1))
    description = fields.Str()
    status = fields.Str(
        required=True,
        validate=validate.OneOf(["TODO", "IN_PROGRESS", "DONE"])
    )
    created_at = fields.DateTime(dump_only=True, format="iso")  # Formato ISO8601
    updated_at = fields.DateTime(dump_only=True, format="iso")
    user       = fields.Str(required=True)  # ID del usuario que creó la tarea