from flask import Flask

app = Flask(__name__)
app.config["PROPAGATE_EXCEPTIONS"] = True
app.config["API_TITLE"]  = "Store REST API"
app.config["API_VERSION"]  = "1.0"
app.config["OPENAPI_VERSION"]  = "3.0.3"
app.config["OPENAPI_URL_PREFIX"] = "/"
app.config["OPENAPI_SWAGGER_UI_PATH"] = "/"
app.config["OPENAPI_SWAGGER_UI_URL"] = "https://cdn.jsdelivr.net/npm/swagger-ui-dist/"