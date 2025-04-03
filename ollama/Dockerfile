# Use the official Ollama image
FROM ollama/ollama:latest

# Install curl to run healthcheck
RUN apt-get update && apt-get install -y curl

# Set the working directory
WORKDIR /app

# Copy an entrypoint script
COPY entrypoint.sh /entrypoint.sh

# Making the entrypoint as a executable file
RUN chmod +x /entrypoint.sh

# Expose the API port
EXPOSE 11434

# Start Ollama and pull the model dynamically
ENTRYPOINT ["/entrypoint.sh"]