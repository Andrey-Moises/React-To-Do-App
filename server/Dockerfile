FROM python:3.12

WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends gcc python3-dev
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .

EXPOSE 5000

CMD ["flask", "run", "--host=0.0.0.0", "--port=5000"]