# Use official Node.js image as base image
FROM node:14-slim

# Set working directory
WORKDIR /app

# Install Supervisor
RUN apt-get update && apt-get install -y supervisor
COPY ./frontend/myfrontend/supervisord.ini /etc/supervisor/supervisord.ini

# Copy package.json and package-lock.json
COPY ./frontend/myfrontend/package.json /app/package.json
COPY ./frontend/myfrontend/package-lock.json /app/package-lock.json

# Install dependencies
RUN npm install

# Copy the rest of the frontend files
COPY ./frontend/myfrontend /app

# Expose port
EXPOSE 3000

# # Set user to vidhan
# USER vidhan

# Command to run Supervisor
CMD ["supervisord", "-c", "/etc/supervisor/supervisord.ini"]
