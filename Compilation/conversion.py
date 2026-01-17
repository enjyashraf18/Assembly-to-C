import pandas as pd
import sys
import os
import subprocess
from pathlib import Path


def compile_c_to_assembly(c_code, output_prefix):
    c_file = f"{output_prefix}.c"
    o_file = f"{output_prefix}.o"

    with open(c_file, "w") as f:
        f.write(c_code)

    hal_base = "/home/enjy/work/Uni/iot/STM32CubeF4/Drivers"
    config_path = "/home/enjy/work/Uni/iot/repo/Assembly-to-C/Compilation/HAL"

    # Compile to object file
    compile_cmd = [
        'arm-none-eabi-gcc',
        '-mcpu=cortex-m4',
        '-mthumb',
        '-DSTM32F407xx',
        f'-I{config_path}',
        f'-I{hal_base}/STM32F4xx_HAL_Driver/Inc',
        f'-I{hal_base}/CMSIS/Device/ST/STM32F4xx/Include',
        f'-I{hal_base}/CMSIS/Include',
        '-O0',
        '-c', c_file,
        '-o', o_file
    ]

    try:
        result = subprocess.run(compile_cmd, capture_output=True, text=True, timeout=10)
        if result.returncode != 0:
            return None

    except Exception:
        return None

    disassembly_cmd = ['arm-none-eabi-objdump', '-d', o_file]

    try:
        result = subprocess.run(disassembly_cmd, capture_output=True, text=True, timeout=10)
        if result.returncode != 0:
            return None

        return result.stdout

    finally:
        for f in (c_file, o_file):
            if os.path.exists(f):
                os.remove(f)



def process_dataset(c_input, assembly_output):
    df = pd.read_parquet(c_input)

    # create temporary working directory
    work_dir = Path("temp_compile")
    work_dir.mkdir(exist_ok=True)
    original_dir = os.getcwd()
    os.chdir(work_dir)

    results = []
    df = df.head(6000)
    for idx, row in df.iterrows():
        sample_id = row['id']
        c_code = row['output']
        print(f"\n[{idx + 1}/{len(df)}] Processing {sample_id}...", end=' ')

        assembly_code = compile_c_to_assembly(c_code, f"sample_{idx}")
        if assembly_code is not None:
            results.append({
                'id': sample_id,
                'c_code': c_code,
                'assembly': assembly_code,
            })

    os.chdir(original_dir)
    results_df = pd.DataFrame(results)
    results_df.to_parquet(assembly_output, index=False)


if __name__ == "__main__":
    c_input = '/home/enjy/work/Uni/iot/repo/Assembly-to-C/Dataset/train/train-00000-of-00001.parquet'
    assembly_output = 'c_to_assembly.parquet'

    if not os.path.exists(c_input):
        print(f"c_input not found")
        sys.exit(1)

    process_dataset(c_input, assembly_output)



