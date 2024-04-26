# Use official Python image as base image
FROM python:3.9-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set working directory
WORKDIR /app

# Install development tools
RUN apt-get update && apt-get install -y build-essential

# Install Supervisor
RUN apt-get update && apt-get install -y supervisor
COPY supervisord.ini /etc/supervisor/supervisord.ini

# Upgrade pip
RUN pip install --upgrade pip

# Install dependencies
COPY ./backend/requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy Django files
COPY ./backend /app

# Expose port
EXPOSE 8000

# # Set user to vidhan
# USER vidhan

# Command to run Supervisor
CMD ["supervisord", "-c", "/etc/supervisor/supervisord.ini"]