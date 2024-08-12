
# Stage 1: Builder
FROM public.ecr.aws/docker/library/node:20.9.0-slim AS builder


WORKDIR /app


COPY package*.json ./


# Install dependencies
RUN npm install


# Copy the rest of the application code
COPY . .


# Set environment variable for sharp
ENV NEXT_SHARP_PATH=/tmp/node_modules/sharp


# Build the application and capture logs
RUN npm run build > build.log || (cat build.log && exit 1)


# Stage 2: Runner
FROM public.ecr.aws/docker/library/node:20.9.0-slim AS runner


# Install aws-lambda-adapter
COPY --from=public.ecr.aws/awsguru/aws-lambda-adapter:0.7.2 /lambda-adapter /opt/extensions/lambda-adapter


# Set environment variables
ENV PORT=3000 NODE_ENV=production
ENV AWS_LWA_ENABLE_COMPRESSION=true


WORKDIR /app


# Copy static files and images from build
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Create a symbolic link to cache directory
RUN ln -s /tmp/cache ./.next/cache

# Create the /tmp/cache directory if it doesn't exist
RUN mkdir -p /tmp/cache

# Start the server
CMD ["node", "server.js"]

