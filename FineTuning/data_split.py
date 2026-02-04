import json

INPUT_FILE = "Dataset/Dataset_model/train.jsonl"
TRAIN_FILE = "Dataset/Dataset_model/train.jsonl"
VAL_FILE = "Dataset/Dataset_model/validation.jsonl"

TRAIN_SIZE = 5000

with open(INPUT_FILE, "r", encoding="utf-8") as f:
    lines = f.readlines()

assert len(lines) >= TRAIN_SIZE, "Not enough samples!"

train_lines = lines[:TRAIN_SIZE]
val_lines = lines[TRAIN_SIZE:]

with open(TRAIN_FILE, "w", encoding="utf-8") as f:
    f.writelines(train_lines)

with open(VAL_FILE, "w", encoding="utf-8") as f:
    f.writelines(val_lines)

print(f"Train samples: {len(train_lines)}")
print(f"Validation samples: {len(val_lines)}")
print("Data split complete.")