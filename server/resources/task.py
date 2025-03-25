from flask.views   import MethodView
from flask_smorest import Blueprint
from models.task   import TaskModel
from schemas       import TaskSchema, SimpleTaskSchema
from flask import abort
from flask_jwt_extended import jwt_required, get_jwt_identity

from models.user   import UserModel


blp = Blueprint(
    'tasks',
    __name__,
    description='Operations on tasks'
)

@blp.route('/tasks')
class Tasks(MethodView):
    """
    Task list resource.
    """

    @jwt_required()
    @blp.arguments(SimpleTaskSchema)
    @blp.response(201, SimpleTaskSchema)
    def post(self, task_data):
        """
        Create a new task.
        """
        user = get_jwt_identity()
        task = TaskModel(**task_data, user=user)
        task.save()
        return task
    
    @jwt_required()
    @blp.response(200, SimpleTaskSchema(many=True))
    def get(self):
        
        """
        Get all task of a user.
        """

        user = UserModel.objects(id=get_jwt_identity()).first()
        if not user:
            abort(404, message="User not found")
        tasks = TaskModel.objects(user=user)
        return tasks
    
