import torch
from transformers import AutoModelForCausalLM, AutoTokenizer, BitsAndBytesConfig
from peft import LoraConfig, get_peft_model

model_id = "mistralai/Mistral-7B-v0.3"

# 1. 4-bit Quantization Config
bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_quant_type="nf4",
    bnb_4bit_compute_dtype=torch.bfloat16
)

# 2. Load Base Model
model = AutoModelForCausalLM.from_pretrained(
    model_id, 
    quantization_config=bnb_config,
    device_map="auto"
)

# 3. LoRA Configuration (Groq compatible: rank 8, 16, or 32)
peft_config = LoraConfig(
    r=16, 
    lora_alpha=32,
    target_modules=["q_proj", "v_proj"],
    lora_dropout=0.05,
    bias="none",
    task_type="CAUSAL_LM"
)

model = get_peft_model(model, peft_config)
print("Model ready for training with LoRA adapters.")