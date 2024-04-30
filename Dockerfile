# Stage 1: Backend Builder
FROM python:3.9-slim AS backend-builder

# Set environment variables for backend
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set working directory for backend
WORKDIR /app/backend

# Install development tools for backend
RUN apt-get update && apt-get install -y build-essential

# Upgrade pip for backend
RUN pip install --upgrade pip

# Install dependencies for backend
COPY ./backend/requirements.txt /app/backend/requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy Django files
COPY ./backend /app/backend

# Expose port for backend
EXPOSE 8000

# Stage 2: Frontend Builder
FROM node:14-slim AS frontend-builder

# Set working directory for frontend
WORKDIR /app/frontend

# Install Node.js and npm for frontend
RUN apt-get update \
    && apt-get install -y curl \
    && curl -fsSL https://deb.nodesource.com/setup_lts.x | bash - \
    && apt-get install -y nodejs

# Install npm globally
RUN npm install --quiet -g npm@6

# Copy package.json and package-lock.json for frontend
COPY ./frontend/myfrontend/package.json /app/frontend/package.json
COPY ./frontend/myfrontend/package-lock.json /app/frontend/package-lock.json

# Copy the rest of the frontend files
COPY ./frontend/myfrontend /app/frontend

# Expose port for frontend
EXPOSE 3000

# Stage 3: Final Image
FROM backend-builder AS final

# Install Node.js and npm for final image
RUN apt-get update \
    && apt-get install -y curl \
    && curl -fsSL https://deb.nodesource.com/setup_lts.x | bash - \
    && apt-get install -y nodejs

# Install npm globally
RUN npm install --quiet -g npm@6

# Install Supervisor for final image
RUN apt-get update && apt-get install -y supervisor

# Copy supervisord.ini to the correct location
COPY supervisord.ini /etc/supervisor/supervisord.ini

# Copy built backend and frontend artifacts
COPY --from=backend-builder /app/backend /app/backend
COPY --from=frontend-builder /app/frontend /app/frontend

# Command to run Supervisor for both backend and frontend
CMD ["supervisord", "-c", "/etc/supervisor/supervisord.ini"]