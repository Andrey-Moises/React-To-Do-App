from flask.views   import MethodView
from flask_smorest import Blueprint
from models.task   import TaskModel
from schemas       import TaskSchema

blp = Blueprint(
    'tasks',
    __name__,
    description='Operations on tasks'
)

@blp.route('/tasks')
class TaskList(MethodView):
    """
    Task list resource.
    """

    @blp.response(200, TaskSchema(many=True))
    def get(self):
        """
        Get all tasks.
        """
        return TaskModel.objects.all()

    @blp.arguments(TaskSchema)
    @blp.response(201, TaskSchema)
    def post(self, task_data):
        """
        Create a new task.
        """
        task = TaskModel(**task_data)
        task.save()
        return task