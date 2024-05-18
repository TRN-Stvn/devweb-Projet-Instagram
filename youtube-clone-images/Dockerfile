# Step 1: Use a Node.js base image that meets the minimum version requirement
FROM node:18.13 as build

# Step 2: Set the working directory
WORKDIR /app

# Step 3: Copy package.json and package-lock.json
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of your app's source code
COPY . .

# Step 6: Build the application
RUN npm run build

# Step 7: Use nginx to serve the application
FROM nginx:alpine
COPY --from=build /app/dist/youtube-clone-images /usr/share/nginx/html

# Step 8: Expose port 80
EXPOSE 80

# Step 9: Start nginx
CMD ["nginx", "-g", "daemon off;"]

