#Skip for now, not needed, the fastapi will call vllm directly

import torch
from transformers import AutoModelForCausalLM, AutoTokenizer
from peft import PeftModel

base_model_id = "deepseek-ai/deepseek-coder-7b-instruct-v1.5"
adapter_path = "FatmaElsharkawy/deepseek-lora-sft-assembly2C"

tokenizer = AutoTokenizer.from_pretrained(base_model_id)

base_model = AutoModelForCausalLM.from_pretrained(
    base_model_id,
    torch_dtype=torch.float16,
    device_map="auto"
)

model = PeftModel.from_pretrained(base_model, adapter_path)
