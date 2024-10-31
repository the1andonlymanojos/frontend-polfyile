# Step 1: Build the app
FROM node:16 AS build

# Set the working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the application
RUN npm run build

# Step 2: Serve the app
FROM nginx:alpine

# Copy the build output from the previous stage
COPY --from=build /app/dist /usr/share/nginx/html
# Copy your custom NGINX configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Expose the port nginx is running on
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
