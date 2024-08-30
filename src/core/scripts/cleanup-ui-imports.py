import os
import re
import argparse
from typing import List, Set

def process_file(file_path: str) -> None:
    with open(file_path, 'r') as file:
        content = file.read()

    # Regular expression to match UI component imports
    ui_import_pattern = r'import\s+{([^}]+)}\s+from\s+[\'"]@/components/ui/[^\'"]+[\'"];?'

    # Find all UI component imports
    ui_imports = re.findall(ui_import_pattern, content, re.DOTALL)

    if not ui_imports:
        return  # No UI imports to process

    # Collect all imported UI components
    all_components: Set[str] = set()
    for imp in ui_imports:
        components = re.split(r',\s*', imp)
        all_components.update(comp.strip() for comp in components if comp.strip() and not comp.strip().startswith(','))

    # Create new import statement
    new_import = f"import {{\n  {', '.join(sorted(all_components))}\n}} from '@/components/ui/';"

    # Replace all UI imports with the new import statement
    content = re.sub(ui_import_pattern, '', content, flags=re.DOTALL)
    
    # Find the position to insert the new import
    insert_position = content.find('import')
    if insert_position == -1:
        insert_position = 0
    
    # Insert the new import statement
    content = content[:insert_position] + new_import + '\n' + content[insert_position:]

    # Remove any extra newlines
    content = re.sub(r'\n{3,}', '\n\n', content)

    # Write updated content back to file
    with open(file_path, 'w') as file:
        file.write(content)

def process_directory(directory: str, exclude_dirs: List[str]) -> None:
    for root, dirs, files in os.walk(directory):
        dirs[:] = [d for d in dirs if d not in exclude_dirs]
        for file in files:
            if file.endswith('.tsx'):
                file_path = os.path.join(root, file)
                process_file(file_path)

def main():
    parser = argparse.ArgumentParser(description='Cleanup UI component imports in TypeScript files.')
    parser.add_argument('--i', metavar='INPUT', help='Path to a specific file to process')
    args = parser.parse_args()

    if args.i:
        if args.i.endswith('.tsx'):
            process_file(args.i)
            print(f"Processed file: {args.i}")
        else:
            print(f"Error: {args.i} is not a .tsx file")
    else:
        src_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
        app_dir = os.path.join(src_dir, 'app')
        components_dir = os.path.join(src_dir, 'components')
        exclude_dirs = ['ui']

        process_directory(app_dir, exclude_dirs)
        process_directory(components_dir, exclude_dirs)
        print("Processed all eligible .tsx files in src/app and src/components directories")

if __name__ == "__main__":
    main()
