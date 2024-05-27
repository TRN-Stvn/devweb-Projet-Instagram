# Use an updated official Node runtime as a parent image
FROM node:20.13

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Copy the rest of your app's source code
COPY . .

# Make port 4200 available to the world outside this container
EXPOSE 4200

# Run ng serve
CMD ["ng", "serve", "--host", "0.0.0.0"]

