#!/bin/sh

# Start Ollama in the background
ollama serve &

# Record the process ID
pid=$!

# Wait for Ollama to be ready
sleep 5

# Pulling the Ollama Model
if ollama list | grep -q "mistral"; then
    echo "(/) Mistral model already exists. Skipping download."
else
    echo "(/) Retrieving the Model..."
    ollama pull mistral
    echo "(/) Model Pulled Successfully!"
fi

# Keep the container running
wait $pid