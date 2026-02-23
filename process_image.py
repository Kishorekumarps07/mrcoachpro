import os
from rembg import remove
from PIL import Image

input_path = r"c:\Users\messi\Desktop\coachwebsite\public\images\products\gold-standard-whey.jpg"
output_path = r"c:\Users\messi\Desktop\coachwebsite\public\images\products\gold-standard-whey-nobg.png"

# Load image
input_img = Image.open(input_path)

# Remove background
output_img = remove(input_img)

# Crop the transparent borders (zoom in)
bbox = output_img.getbbox()
if bbox:
    output_img = output_img.crop(bbox)

# Save the final image
output_img.save(output_path)
print("Image processing complete!")
