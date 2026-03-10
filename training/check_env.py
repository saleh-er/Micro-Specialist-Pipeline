import torch
import groq
import os

print(f"CUDA Available: {torch.cuda.is_available()}")
if torch.cuda.is_available():
    print(f"GPU: {torch.cuda.get_device_name(0)}")

if os.getenv("GROQ_API_KEY"):
    print("Groq API Key detected in .env")
else:
    print("Warning: GROQ_API_KEY missing!")