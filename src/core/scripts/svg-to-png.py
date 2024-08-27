# requires pip install cairosvg pillow
## usage: 
# python svg-to-image.py --svg <YOUR_SVG_STRING> --format <png|jpg|webp>
# Example SVG string:##

#$ python svg-to-image.py --svg <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"> --format png

## parameters
# --svg <YOUR_SVG_STRING> (without the <>)
# --format <png|jpg|webp> (optional, default is png)
## output wi ll be saved as output.<format> in the same directory as the script

import argparse
import cairosvg
from PIL import Image
import io

def convert_svg_to_image(svg_string, output_file='output.png', output_format='png'):
    # Convert SVG to PNG using cairosvg
    png_data = cairosvg.svg2png(bytestring=svg_string.encode('utf-8'))
    
    # Convert PNG to desired format using Pillow
    image = Image.open(io.BytesIO(png_data))
    
    if output_format.lower() == 'jpg':
        output_file = output_file.replace('.png', '.jpg')
        image = image.convert('RGB')  # JPG does not support transparency
    elif output_format.lower() == 'webp':
        output_file = output_file.replace('.png', '.webp')
    
    image.save(output_file, format=output_format.upper())
    print(f"{output_format.upper()} file saved as {output_file}")

def main():
    parser = argparse.ArgumentParser(description='Convert SVG string to image file.')
    parser.add_argument('--svg', type=str, required=True, help='SVG string to convert')
    parser.add_argument('--format', type=str, choices=['png', 'jpg', 'webp'], default='png', help='Output image format')
    args = parser.parse_args()

    output_file = f"output.{args.format}"
    convert_svg_to_image(args.svg, output_file, args.format)

if __name__ == '__main__':
    main()
# python3 svg-to-png.py --svg '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 80 80"><defs><style>.g{fill:#f8fcf7;}.g,.h,.i{stroke-width:0px;}.h{fill:url(#e);}.i{fill:#81c66c;}</style><linearGradient id="e" x1="40" y1="80" x2="40" y2="0" gradiyentUnits="userSpaceOnUse"><stop offset=".1" stop-color="#fff" stop-opacity="0"/><stop offset=".9" stop-color="#fff" stop-opacity=".1"/></linearGradient></defs><g id="c"><rect class="i" width="80" height="80" rx="18.25" ry="18.25"/></g><g id="d"><rect class="h" width="80" height="80" rx="18.25" ry="18.25"/></g><g id="f"><path class="g" d="M63.4367,58.0615c-.0536,3.2127-2.7418,5.7593-5.955,5.7593h-24.1527c-.9392,0-1.5768-.9548-1.2169-1.8223l.0082-.0197c1.5882-3.8346,4.1653-7.0703,7.456-9.4308.4093-.2936.9032-.4459,1.407-.4459h16.5948c3.2694,0,5.9133,2.6775,5.8585,5.9594Z"/><path class="g" d="M46.671,16.9458c.9392,0,1.5768.9548,1.2169,1.8223l-.0082.0197c-1.5882,3.8346-4.1653,7.0703-7.456,9.4308-.4093.2936-.9032.4459-1.407.4459h-16.4984c-3.2132,0-5.9014-2.5466-5.955-5.7593-.0547-3.2819,2.5892-5.9594,5.8585-5.9594h24.2491Z"/><path class="g" d="M22.4208,63.8208c-.7473,0-1.5065-.1438-2.2398-.4475-2.9896-1.2383-4.4093-4.6657-3.171-7.6551,1.9045-4.5977,4.6342-8.7196,8.1136-12.251,3.6044-3.6585,7.8551-6.5172,12.6343-8.4968,6.5691-2.7211,11.6853-7.8373,14.4061-14.4061,1.2383-2.9897,4.6658-4.4091,7.6551-3.171,2.9896,1.2383,4.4093,4.6657,3.171,7.6551-1.9045,4.5977-4.6342,8.7196-8.1136,12.251-3.6044,3.6585-7.8551,6.5172-12.6343,8.4968-6.5691,2.7211-11.6853,7.8373-14.4061,14.4061-.9345,2.2562-3.1164,3.6185-5.4153,3.6185Z"/></g></svg>' --format png
