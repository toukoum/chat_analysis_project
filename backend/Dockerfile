
# Backend Dockerfile

# Start from a Python base image
FROM python:3.12

# Set the working directory in the container
WORKDIR /app
RUN pip install --upgrade pip

# Copy the requirements file and install dependencies
COPY . .
RUN pip install -r requirements.txt

# Copy the rest of the Django app

# Expose the backend port
EXPOSE 8000

# Run Django’s development server (for production, use a WSGI server like Gunicorn)
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
