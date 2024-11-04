# Frontend Dockerfile

# Start from a Node.js base image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy the frontend package.json and install dependencies
COPY . .

RUN npm install

# Copy the rest of the frontend code

# Expose the frontend port
EXPOSE 3000

# Run Vite in development mode (adjust if needed for production)
CMD ["npm", "run", "dev", "--", "--host"]
