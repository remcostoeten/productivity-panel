import subprocess
import re
import pyperclip
import argparse
import os

def run_command(command):
    """Run a shell command and return its output and error (if any)."""
    result = subprocess.run(command, shell=True, capture_output=True, text=True)
    return result.stdout.strip(), result.stderr.strip(), result.returncode

def update_env_file(file_path, new_vars):
    if not os.path.exists(file_path):
        print(f"File {file_path} does not exist. Creating new file.")
        with open(file_path, 'w') as f:
            f.write(new_vars)
        return

    with open(file_path, 'r') as f:
        lines = f.readlines()

    updated_lines = []
    updated = {'DB_URL': False, 'AUTH_TOKEN': False}

    for line in lines:
        if line.startswith('DB_URL='):
            updated_lines.append(f'OLD_{line.strip()}\n')
            updated_lines.append(f'DB_URL={new_vars["DB_URL"]}\n')
            updated['DB_URL'] = True
        elif line.startswith('AUTH_TOKEN='):
            updated_lines.append(f'OLD_{line.strip()}\n')
            updated_lines.append(f'AUTH_TOKEN={new_vars["AUTH_TOKEN"]}\n')
            updated['AUTH_TOKEN'] = True
        else:
            updated_lines.append(line)

    for key, value in new_vars.items():
        if not updated[key]:
            updated_lines.append(f'{key}={value}\n')

    with open(file_path, 'w') as f:
        f.writelines(updated_lines)

# Set up argument parser
parser = argparse.ArgumentParser(description='Generate Turso DB credentials and update .env file.')
parser.add_argument('--overwrite', metavar='PATH', help='Path to .env or .env.local file to overwrite')

args = parser.parse_args()

# Create a new database
print("Creating new database...")
create_output, create_error, create_code = run_command("turso db create")
print(f"Output: {create_output}")
if create_error:
    print(f"Error: {create_error}")
    print(f"Return code: {create_code}")
    exit(1)

# Extract database name from create output
db_name_match = re.search(r'Created database (\S+)', create_output)
if db_name_match:
    db_name = db_name_match.group(1)
else:
    print("Error: Could not extract database name from output.")
    exit(1)

# Show database details
print(f"\nRetrieving details for database: {db_name}")
show_output, show_error, show_code = run_command(f"turso db show {db_name}")
print(f"Output: {show_output}")
if show_error:
    print(f"Error: {show_error}")
    print(f"Return code: {show_code}")
    exit(1)

# Extract URL from show output
url_match = re.search(r'URL:\s+(libsql://[\w.-]+)', show_output)
db_url = url_match.group(1) if url_match else "URL not found"

# Create a new token
print(f"\nCreating token for database: {db_name}")
token_output, token_error, token_code = run_command(f"turso db tokens create {db_name}")
print("Token created successfully")
if token_error:
    print(f"Error: {token_error}")
    print(f"Return code: {token_code}")
    exit(1)

# Get token from token output
auth_token = token_output.strip()

# Generate environment variables
new_vars = {"DB_URL": db_url, "AUTH_TOKEN": auth_token}
env_vars = f"DB_URL={db_url}\nAUTH_TOKEN={auth_token}"

# Print the environment variables to console
print("\nGenerated Environment Variables:")
print(env_vars)

if args.overwrite:
    update_env_file(args.overwrite, new_vars)
    print(f"\nEnvironment variables have been updated in {args.overwrite}")
else:
    # Write to a file
    env_file = '.env.generated'
    with open(env_file, 'w') as f:
        f.write(env_vars)
    print(f"\nEnvironment variables have been saved to {env_file}")

# Copy to clipboard
pyperclip.copy(env_vars)
print("Environment variables have been copied to clipboard.")
import subprocess
import re
import pyperclip
import argparse
import os

def run_command(command):
    """Run a shell command and return its output and error (if any)."""
    result = subprocess.run(command, shell=True, capture_output=True, text=True)
    return result.stdout.strip(), result.stderr.strip(), result.returncode

def update_env_file(file_path, new_vars):
    if not os.path.exists(file_path):
        print(f"File {file_path} does not exist. Creating new file.")
        with open(file_path, 'w') as f:
            f.write('\n'.join(f"{k}={v}" for k, v in new_vars.items()))
        return

    with open(file_path, 'r') as f:
        lines = f.readlines()

    updated_lines = []
    updated = {'DB_URL': False, 'AUTH_TOKEN': False}

    for line in lines:
        if line.startswith('DB_URL='):
            updated_lines.append(f'OLD_{line.strip()}\n')
            updated_lines.append(f'DB_URL={new_vars["DB_URL"]}\n')
            updated['DB_URL'] = True
        elif line.startswith('AUTH_TOKEN='):
            updated_lines.append(f'OLD_{line.strip()}\n')
            updated_lines.append(f'AUTH_TOKEN={new_vars["AUTH_TOKEN"]}\n')
            updated['AUTH_TOKEN'] = True
        else:
            updated_lines.append(line)

    for key, value in new_vars.items():
        if not updated[key]:
            updated_lines.append(f'{key}={value}\n')

    with open(file_path, 'w') as f:
        f.writelines(updated_lines)

def add_to_gitignore(file_name):
    gitignore_path = '.gitignore'
    if not os.path.exists(gitignore_path):
        with open(gitignore_path, 'w') as f:
            f.write(f"{file_name}\n")
        print(f"Created .gitignore and added {file_name}")
        return

    with open(gitignore_path, 'r') as f:
        content = f.read()

    if file_name not in content:
        with open(gitignore_path, 'a') as f:
            f.write(f"\n{file_name}\n")
        print(f"Added {file_name} to .gitignore")
    else:
        print(f"{file_name} is already in .gitignore")

# Set up argument parser
parser = argparse.ArgumentParser(description='Generate Turso DB credentials and update .env file.')
parser.add_argument('--overwrite', metavar='PATH', help='Path to .env or .env.local file to overwrite')

args = parser.parse_args()

# Create a new database
print("Creating new database...")
create_output, create_error, create_code = run_command("turso db create")
print(f"Output: {create_output}")
if create_error:
    print(f"Error: {create_error}")
    print(f"Return code: {create_code}")
    exit(1)

# Extract database name from create output
db_name_match = re.search(r'Created database (\S+)', create_output)
if db_name_match:
    db_name = db_name_match.group(1)
else:
    print("Error: Could not extract database name from output.")
    exit(1)

# Show database details
print(f"\nRetrieving details for database: {db_name}")
show_output, show_error, show_code = run_command(f"turso db show {db_name}")
print(f"Output: {show_output}")
if show_error:
    print(f"Error: {show_error}")
    print(f"Return code: {show_code}")
    exit(1)

# Extract URL from show output
url_match = re.search(r'URL:\s+(libsql://[\w.-]+)', show_output)
db_url = url_match.group(1) if url_match else "URL not found"

# Create a new token
print(f"\nCreating token for database: {db_name}")
token_output, token_error, token_code = run_command(f"turso db tokens create {db_name}")
print("Token created successfully")
if token_error:
    print(f"Error: {token_error}")
    print(f"Return code: {token_code}")
    exit(1)

# Get token from token output
auth_token = token_output.strip()

# Generate environment variables
new_vars = {"DB_URL": db_url, "AUTH_TOKEN": auth_token}
env_vars = f"DB_URL={db_url}\nAUTH_TOKEN={auth_token}"

# Print the environment variables to console
print("\nGenerated Environment Variables:")
print(env_vars)

if args.overwrite:
    update_env_file(args.overwrite, new_vars)
    print(f"\nEnvironment variables have been updated in {args.overwrite}")
else:
    # Write to a file
    env_file = '.env.generated'
    with open(env_file, 'w') as f:
        f.write(env_vars)
    print(f"\nEnvironment variables have been saved to {env_file}")
    
    # Add to .gitignore
    add_to_gitignore(env_file)

# Copy to clipboard
pyperclip.copy(env_vars)
print("Environment variables have been copied to clipboard.")
