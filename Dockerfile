# Use a base image
FROM python:3.9-slim

# Set the working directory
WORKDIR /app

# Copy local code to the container image
COPY . .

# Install dependencies
RUN pip install -r requirements.txt

# Run the web service on container startup
CMD ["python", "app.py"]
