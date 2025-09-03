# ---------- Build Stage ----------
FROM node:20 AS build
WORKDIR /app

# Install dependencies needed for native builds
RUN apk add --no-cache python3 make g++

# Copy only package.json and lock file first (better caching)
COPY package*.json ./

# Use npm ci for faster, reproducible installs
RUN npm ci

# Copy rest of the source code
COPY . .

# Pass environment variable for Vite build
ARG VITE_CLERK_PUBLISHABLE_KEY
ENV VITE_CLERK_PUBLISHABLE_KEY=$VITE_CLERK_PUBLISHABLE_KEY

# Build the app
RUN npm run build

# ---------- Production Stage ----------
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Remove default nginx index
RUN rm -rf ./*

# Copy built frontend
COPY --from=build /app/dist .

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
