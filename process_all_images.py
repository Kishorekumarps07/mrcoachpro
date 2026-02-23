import os
from rembg import remove
from PIL import Image

image_paths = [
    r"c:\Users\messi\Desktop\coachwebsite\public\images\products\wrist-wraps.jpg",
    r"c:\Users\messi\Desktop\coachwebsite\public\images\products\lifting-straps.jpg",
    r"c:\Users\messi\Desktop\coachwebsite\public\images\products\knee-sleeves.jpg",
    r"c:\Users\messi\Desktop\coachwebsite\public\images\products\gym-gloves.jpg",
    r"c:\Users\messi\Desktop\coachwebsite\public\images\products\gallon-shaker.jpg"
]

for img_path in image_paths:
    out_path = img_path.replace('.jpg', '-nobg.png')
    print(f"Processing {img_path} -> {out_path}")
    try:
        input_img = Image.open(img_path)
        output_img = remove(input_img)
        bbox = output_img.getbbox()
        if bbox:
            output_img = output_img.crop(bbox)
        output_img.save(out_path)
    except Exception as e:
        print(f"Failed to process {img_path}: {e}")

print("All gear images processed!")
