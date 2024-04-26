# Node.js 18 image
FROM node:18-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY ./ ./

# Expose port
CMD ["npm", "start"]