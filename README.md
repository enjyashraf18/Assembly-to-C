# Assembly-to-C: AI-Powered Code Conversion Tool

[![Python 3.9+](https://img.shields.io/badge/python-3.9+-blue.svg)](https://www.python.org/downloads/)
[![FastAPI](https://img.shields.io/badge/fastapi-0.104+-green.svg)](https://fastapi.tiangolo.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## Project Overview

**Assembly-to-C** is fine-tuned AI system that automatically translates **ARM Cortex-M assembly code into clean, production-ready C code** optimized for STM microcontrollers. Using fine-tuned large language models and modern AI techniques, this tool bridges the gap between low-level assembly programming and maintainable high-level C code.

---

## Table of Contents
- [Features](#-features)
- [Architecture](#-architecture)
- [Project Structure](#-project-structure)
- [Tech Stack](#-tech-stack)
- [Setup & Installation](#-setup--installation)
- [Dataset & Training](#-dataset--training)
- [API Documentation](#-api-documentation)


---

## Features

| Feature | Description |
|---------|-------------|
| **Intelligent Conversion** | Uses fine-tuned AI to understand assembly semantics and generate meaningful C code |
| **ARM Cortex-M Support** | Optimized for ARM Cortex-M4 instruction set and STM32 peripherals |
| **Code Validation** | Automatically compiles generated C code to verify correctness |
| **REST API** | Async FastAPI endpoint for easy integration into other applications |

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Assembly-to-C System                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────────────────────────────────────────────┐   │
│  │           Dataset Preparation Layer                  │   │
│  │  • STM32 Assembly Code Collection                    │   │
│  │  • Assembly Parsing & Cleaning                       │   │
│  │  • Conversion to Chat Format (JSONL)                 │   │
│  └──────────────────────────────────────────────────────┘   │
│                            ↓                                │
│  ┌──────────────────────────────────────────────────────┐   │
│  │         Model Fine-Tuning Layer                      │   │
│  │  • Deepseek Model (Base) AND Qwen                    │   │
│  │  • LoRA Fine-tuning on Assembly-C pairs              │   │
│  │  • Validation & Optimization                         │   │
│  └──────────────────────────────────────────────────────┘   │
│                            ↓                                │
│  ┌──────────────────────────────────────────────────────┐   │
│  │      Deployment & Inference Layer                    │   │
│  │  • vLLM Server (Model Serving)                       │   │
│  │  • FastAPI Backend                                   │   │
│  │  • Async HTTP Client                                 │   │
│  │  • Frontend Interface                                │   │
│  └──────────────────────────────────────────────────────┘   │
│                            ↓                                │
│  ┌──────────────────────────────────────────────────────┐   │
│  │      Validation & Compilation Layer                  │   │
│  │  • ARM GCC Compiler Integration                      │   │
│  │  • Generated Code Verification                       │   │
│  │  • Assembly Output Comparison                        │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Project Structure

```
Assembly-to-C/
├── Dataset/                          # Training data management
│   ├── data_preprocessing.py         # Raw data cleaning & parsing
│   ├── data_inspection.ipynb         # EDA & data visualization
│   ├── chat_dataset.jsonl            # Formatted training data
│   ├── preprocessed_dataset.jsonl    # Preprocessed intermediate format
│   └── train/                        # Training scripts & checkpoints
│
├── FineTuning/                       # Model fine-tuning pipeline
│   ├── data_preparation.py           # Dataset to chat format conversion
│   └── finetuning-deepseek-assembly2c.ipynb  # Fine-tuning notebook
│
├── Compilation/                      # Code validation & compilation
│   ├── conversion.py                 # C-to-Assembly compiler wrapper
│   ├── HAL/                          # STM32 HAL configuration
│   │   └── stm32f4xx_hal_conf.h
│   └── STM32CubeF4/                  # STM32 SDK integration
│
├── Deployment/                       # API & serving
│   ├── Back/
│   │   ├── api_.py                   # FastAPI application
│   │   ├── model-inference-local.py  # Local inference script
│   │   └── runvllm.txt               # vLLM startup guide
│   └── front/                        # Frontend application
│
├── requirements.txt                  # Python dependencies
└── README.md                         # This file
```

---

## Tech Stack

### Core Technologies
- **Python 3.9+** - Primary language
- **FastAPI** - High-performance async web framework
- **vLLM** - High-throughput LLM serving
- **Deepseek** - Base model for fine-tuning
- **httpx** - Async HTTP client library

### ML/AI Stack
- **PyTorch/Transformers** - Model training framework
- **HuggingFace** - Model hub integration
- **LoRA** - Efficient fine-tuning technique

### Embedded Systems
- **ARM GCC Toolchain** - ARM Cortex-M cross-compiler
- **STM32CubeF4** - STM32F407xx SDK
- **STM32 HAL** - Hardware abstraction layer

### Development Tools
- **Jupyter Notebook** - Interactive data exploration
- **CORS Middleware** - Cross-origin request handling
- **Pydantic** - Data validation

---

## Setup & Installation

### Prerequisites
- Python 3.9+
- ARM GCC toolchain (for code compilation validation)
- vLLM compatible GPU or CPU

### Installation Steps

1. **Clone & Navigate**
   ```bash
   cd Assembly-to-C
   ```

2. **Create Virtual Environment**
   ```bash
   python -m venv .venv
   # On Windows:
   .\.venv\Scripts\activate
   # On Linux/Mac:
   source .venv/bin/activate
   ```

3. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure ARM Toolchain** (for compilation validation)
   ```bash
   # Update paths in Compilation/conversion.py
   # Adjust hal_base and config_path to your STM32CubeF4 location
   ```

---

## Usage

### Option 1: API Server 

1. **Start vLLM Server**
   ```bash
   # See Deployment/Back/runvllm.txt for detailed instructions
   python -m vllm.entrypoints.openai.api_server \
     --model [your-finetuned-model-path] \
     --tensor-parallel-size 1
   ```

2. **Start FastAPI Backend**
   ```bash
   cd Deployment/Back
   uvicorn api_:app --reload --host 0.0.0.0 --port 8000
   ```

3. **Call the API**
   ```bash
   curl -X POST http://localhost:8000/translate \
     -H "Content-Type: application/json" \
     -d '{"assembly": "mov r0, #0x42\nbx lr"}'
   ```

### Option 2: Local Inference
```bash
python Deployment/Back/model-inference-local.py
```

### Example Request/Response

**Request:**
```json
{
  "assembly": "mov r0, #42\nadd r0, r1\nbx lr"
}
```

**Response:**
```json
{
  "c_code": "int add_42_to_r1(int r1_value) {\n    int result = 42 + r1_value;\n    return result;\n}\n",
  "confidence": 0.95
}
```



---

## 🔌 API Documentation

### Endpoint: `/translate`

**Method:** `POST`

**Request Body:**
```json
{
  "assembly": "string (ARM assembly code)"
}
```

**Response (200 OK):**
```json
{
  "c_code": "string (generated C code)",
  "model": "assembly2c",
  "status": "success"
}
```

**Response (400 Bad Request):**
```json
{
  "detail": "Invalid assembly code"
}
```

**Response (503 Service Unavailable):**
```json
{
  "detail": "vLLM service temporarily unavailable"
}
```

---



**Created as a Senior Year IoT Project | SBME 2026**