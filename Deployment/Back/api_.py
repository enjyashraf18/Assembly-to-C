# app.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import httpx  # <--- Use httpx instead of requests for Async
import uvicorn

# Ensure this matches your vLLM port
VLLM_URL = "https://a1b2-34-56.ngrok-free.app/v1/chat/completions"

app = FastAPI()

# 1. FIX: Enable CORS so your browser/HTML can access this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AssemblyRequest(BaseModel):
    assembly: str

SYSTEM_PROMPT = (
    "You are an expert reverse engineer. "
    "Convert the given ARM Cortex-M assembly code into "
    "clean, readable C code compatible with STM microcontrollers. "
    "Use meaningful variable names and add helpful comments."
)

# 2. FIX: Use 'async def' to prevent freezing the server
@app.post("/translate")
async def translate(req: AssemblyRequest):
    payload = {
        "model": "assembly2c",  
        "messages": [
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": req.assembly}
        ],
        "temperature": 0.1,    # Recommended: Lower temp for code logic
        "max_tokens": 2048     # Adjusted to match your vLLM limit
    }

    # 4. FIX: Use Async Client
    timeout = httpx.Timeout(60.0, connect=5.0) # Give vLLM time to think
    async with httpx.AsyncClient(timeout=timeout) as client:
        try:
            response = await client.post(VLLM_URL, json=payload)
            response.raise_for_status()
            result = response.json()
            return {
                "c_code": result["choices"][0]["message"]["content"]
            }
        except httpx.HTTPStatusError as e:
            raise HTTPException(status_code=e.response.status_code, detail=str(e))
        except Exception as e:
            raise HTTPException(status_code=500, detail="Connection to vLLM failed")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8001)