# app.py
from fastapi import FastAPI
from pydantic import BaseModel
import requests
import uvicorn

VLLM_URL = "http://localhost:8000/v1/chat/completions"

app = FastAPI()

class AssemblyRequest(BaseModel):
    assembly: str

SYSTEM_PROMPT = (
    "You are an expert reverse engineer. "
    "Convert the given ARM Cortex-M assembly code into "
    "clean, readable C code compatible with STM microcontrollers. "
    "Use meaningful variable names and add helpful comments."
)

@app.post("/translate")
def translate(req: AssemblyRequest):
    payload = {
        "model": "merged-model",
        "messages": [
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": req.assembly}
        ],
        "temperature": 0.2,
        "max_tokens": 4096
    }

    response = requests.post(VLLM_URL, json=payload)
    response.raise_for_status()

    result = response.json()
    return {
        "c_code": result["choices"][0]["message"]["content"]
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8001)