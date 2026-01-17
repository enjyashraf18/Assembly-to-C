import json
import os 
SYSTEM_PROMPT = (
    "You are an expert reverse engineer. "
    "Convert the given assembly code into C code compatible with STM microcontrollers. "
    "Use meaningful variable and function names, rename registers and temporary variables "
    "to descriptive names, and add clear, helpful comments explaining the logic."
)

input_path = "Dataset\\preprocessed_dataset.jsonl"
output_path = "Dataset\\chat_dataset.jsonl"

with open(input_path, "r", encoding="utf-8") as fin, \
     open(output_path, "w", encoding="utf-8") as fout:

    for line in fin:
        data = json.loads(line)

        chat_example = {
            "messages": [
                {
                    "role": "system",
                    "content": SYSTEM_PROMPT
                },
                {
                    "role": "user",
                    "content": data["assembly_clean"]
                },
                {
                    "role": "assistant",
                    "content": data["c_code"]
                }
            ]
        }

        fout.write(json.dumps(chat_example, ensure_ascii=False) + "\n")

print("Conversion complete.")

    
        
    