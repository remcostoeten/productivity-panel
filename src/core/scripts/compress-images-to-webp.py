from PIL import Image
import os
import pyperclip
import sys
import argparse

def convert_to_webp(input_path, quality=80):
    # Validate input file
    if not os.path.isfile(input_path):
        raise FileNotFoundError(f"The file {input_path} does not exist.")
    
    # Ensure the file is an image
    if not input_path.lower().endswith(('.png', '.jpg', '.jpeg')):
        raise ValueError("Input file must be a PNG, JPG, or JPEG image.")
    
    # Define output path
    base, _ = os.path.splitext(input_path)
    output_path = os.path.abspath(f"{base}.webp")
    
    # Open the image file
    with Image.open(input_path) as img:
        # Save the image as WebP with the specified quality
        img.save(output_path, format='WEBP', quality=quality)
    
    # Get sizes for logging
    input_size = os.path.getsize(input_path)
    output_size = os.path.getsize(output_path)
    
    # Calculate the difference in size and percentage reduction
    size_difference = input_size - output_size
    percentage_reduction = (size_difference / input_size) * 100 if input_size > 0 else 0
    
    # Log results
    print(f"Input Size: {input_size / 1024:.2f} KB")
    print(f"Output Size: {output_size / 1024:.2f} KB")
    print(f"Difference: {size_difference / 1024:.2f} KB")
    print(f"Reduction Percentage: {percentage_reduction:.2f}%")
    
    # Copy the path of the new image to the clipboard
    pyperclip.copy(output_path)
    print(f"Path of the new image copied to clipboard: {output_path}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Convert images to WebP format.")
    parser.add_argument("--input", help="Path to the input image file.")
    parser.add_argument("--quality", type=int, default=80, help="Quality of the output WebP image (default: 80).")
    
    args = parser.parse_args()
    
    if args.input:
        convert_to_webp(args.input, quality=args.quality)
    else:
        # No input file provided, process all PNG, JPG, and JPEG files in the current directory
        for file_name in os.listdir('.'):
            if file_name.lower().endswith(('.png', '.jpg', '.jpeg')):
                try:
                    convert_to_webp(file_name, quality=args.quality)
                except Exception as e:
                    print(f"Failed to convert {file_name}: {e}")