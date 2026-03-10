# Groq Specialist Pipeline 🚀

An end-to-end pipeline to train a **QLoRA Specialist Model** and deploy it as a high-speed **VS Code Extension** using Groq's LPU.

## 🏗️ Architecture
- **Model:** Llama 3.1 8B (Base) + Custom LoRA Adapter.
- **Inference:** Groq Cloud API (300+ tokens/sec).
- **Extension:** TypeScript-based VS Code Extension Host.

## 🚀 Getting Started
1. `npm install` inside the root.
2. `pip install -r training/requirements.txt` inside `/training`.
3. Add your `GROQ_API_KEY` to `.env`.
4. Press `F5` to launch the extension in debug mode.

## 📊 Model Training
Run `python training/finetune.py` to start the QLoRA process. Results are saved as `.safetensors`.