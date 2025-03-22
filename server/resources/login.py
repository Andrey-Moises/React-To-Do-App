from flask              import Blueprint
from flask.views        import MethodView
from flask_smorest      import Blueprint
from passlib.hash       import pbkdf2_sha256
from schemas            import LoginSchema
from models.user        import UserModel
from flask_jwt_extended import ( 
    create_access_token,
    create_refresh_token, 
    jwt_required, 
    get_jwt_identity
)

blp = Blueprint(
    'login',
    __name__,
    description='Operations on user login'
)


@blp.route('/login')
class Login(MethodView):
    """
    User login resource.
    """

    @blp.arguments(LoginSchema)
    @blp.response(200)
    @blp.response(400)
    @blp.response(500)
    @blp.doc(description="Login a user")
    @blp.doc(responses={400: {"description": "Invalid credentials"}})
    @blp.doc(responses={200: {"description": "Login successful"}})
    @blp.doc(responses={500: {"description": "Internal server error"}})
    def post(self, user_data):
        """
        Login a user.
        """
        # Check if the username exists
        user = UserModel.objects(username=user_data['username']).first()
        if not user:
            return {"message": "Invalid credentials"}, 400

        # Verify the password
        if not pbkdf2_sha256.verify(user_data['password'], user.password):
            return {"message": "Invalid credentials"}, 400

        return {
            "access_token"  : create_access_token(identity=str(user.id)),
            "refresh_token" : create_refresh_token(identity=str(user.id))
        }, 200
    
@blp.route('/refresh')
class RefreshToken(MethodView):
    """
    Refresh token resource.
    """

    @blp.response(200)
    @blp.response(500)
    @jwt_required(refresh=True)
    def post(self):
        """
        Refresh a token.
        """
        try:
            user = get_jwt_identity()
            return {
                "access_token": create_access_token(identity=user, fresh=False)
            }, 200
        except Exception as e:
            return {"message": "Internal server error", "error": str(e)}, 500

        
        