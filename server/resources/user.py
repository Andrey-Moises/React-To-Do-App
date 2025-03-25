from flask.views   import MethodView
from flask_smorest import Blueprint, abort
from passlib.hash  import pbkdf2_sha256
from models.user   import UserModel
from schemas       import UserRegisterSchema

blp = Blueprint(
    'users',
    __name__,
    description='Operations on users'
)


@blp.route('/register')
class Register(MethodView):
    """
    User registration resource.
    """

    @blp.arguments(UserRegisterSchema)
    @blp.response(201)
    def post(self, user_data):
        """
        Register a new user.
        """
        # Check if the username already exists
        if UserModel.objects(email=user_data['email']).first():
            abort(400, message="User with this email already exists.")

        # Hash the password
        hashed_password = pbkdf2_sha256.hash(user_data['password'])
        user_data['password'] = hashed_password

        # Create the user
        user = UserModel(**user_data)
        user.save()
        return {}