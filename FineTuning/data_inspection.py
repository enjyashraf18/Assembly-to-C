import json
from transformers import AutoTokenizer
from collections import Counter

# ===== Choose the tokenizer matching your fine‑tune model =====
model_name = "qwen/Qwen‑2.5‑Coder‑14B‑Instruct"  # or whatever HF name
tokenizer = AutoTokenizer.from_pretrained(model_name, use_fast=True)

max_len = 0
lengths = []

with open("Dataset/chat_dataset.jsonl", "r", encoding="utf‑8") as f:
    for line in f:
        data = json.loads(line)

        # Build a single text from messages
        text = ""
        for msg in data.get("messages", []):
            # Include role if you want roles counted
            text += f"<{msg['role']}>: {msg['content']}\n"

        # Tokenize & count
        tokens = tokenizer(text)["input_ids"]
        count = len(tokens)
        lengths.append(count)
        if count > max_len:
            max_len = count

print("=== Token Length Results ===")
print("Maximum sequence length:", max_len)
print("Average sequence length:", sum(lengths) / len(lengths))
print("Distribution (top 10 lengths):", Counter(lengths).most_common(10))

