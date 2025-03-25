from marshmallow import Schema, fields, validate

class SimpleTaskSchema(Schema):
    id          = fields.Str(dump_only=True)
    title       = fields.Str(required=True, validate=validate.Length(min=1))
    status      = fields.Str(
        required=True,
        validate=validate.OneOf(["TODO", "IN_PROGRESS", "DONE"])
    )
    created_at  = fields.DateTime(dump_only=True, format="iso")  # Formato ISO8601
    updated_at  = fields.DateTime(dump_only=True, format="iso")
    description = fields.Str(required=True, validate=validate.Length(min=1))
class TaskSchema(SimpleTaskSchema):
    user = fields.Str(required=True)  # ID del usuario que creó la tarea

class UserRegisterSchema(Schema):

    id       = fields.Str(dump_only=True)
    username = fields.Str(required=True, validate=validate.Length(min=1))
    email    = fields.Email(required=True)
    password = fields.Str(required=True, validate=validate.Length(min=6))
    name     = fields.Str(required=True, validate=validate.Length(min=1))
    lastName = fields.Str(required=True, validate=validate.Length(min=1))
    
class LoginSchema(Schema):
    user     = fields.Str(required=True, validate=validate.Length(min=1))
    password = fields.Str(required=True, validate=validate.Length(min=6))