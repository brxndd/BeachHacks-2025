# Use an official Node.js runtime as the base image (non-Alpine)
FROM node:18 AS builder

# Set the working directory in the container 
WORKDIR /app 

# Copy dependencies from package.json and package-lock.json 
COPY package.json package-lock.json* ./ 

# Install dependencies 
RUN npm install 

# Copy the rest of the application code 
COPY . . 

# Expose the port the app will run on 
EXPOSE 3000 

# Run the application in development mode 
CMD ["npm", "run", "dev"]
