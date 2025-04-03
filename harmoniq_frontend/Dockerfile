### Stage 0: Build ###
FROM node:20 AS builder

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install Angular CLI Globally
RUN npm install -g @angular/cli

# Install app dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Angular app for production
RUN npm run build:dev

### Stage 1: Run ###
#--------------------------------------
# Defining nginx image to be used
FROM nginx:latest AS ngi

# Create App Path for build files for Angular 17 and above projects
ENV APP_PATH=/usr/src/app/dist/*

# Copy the built Angular app to the default Nginx public folder
COPY --from=builder $APP_PATH /usr/share/nginx/html/

# Need to make nginx config file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
