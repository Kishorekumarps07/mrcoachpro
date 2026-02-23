file_path = r"c:\Users\messi\Desktop\coachwebsite\src\data\shop.ts"
with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []
skip = False
for i, line in enumerate(lines):
    if "export const PRODUCTS: Product[] = [" in line:
        new_lines.append(line)
        skip = True
        continue
        
    if skip and "// ============================================================" in line and i + 1 < len(lines) and "PROTEIN" in lines[i+1]:
        skip = False
        
    if not skip:
        new_lines.append(line)

with open(file_path, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print("Trimmed dummy products from shop.ts successfully!")
