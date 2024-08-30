import subprocess
import re
import pyperclip

def run_command(command):
    """Run a shell command and return its output and error (if any)."""
    result = subprocess.run(command, shell=True, capture_output=True, text=True)
    return result.stdout.strip(), result.stderr.strip(), result.returncode

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
env_vars = f"DB_URL={db_url}\nAUTH_TOKEN={auth_token}"

# Print the environment variables to console
print("\nGenerated Environment Variables:")
print(env_vars)

# Write to a file
env_file = '.env.generated'
with open(env_file, 'w') as f:
    f.write(env_vars)

print(f"\nEnvironment variables have been saved to {env_file}")

# Copy to clipboard
pyperclip.copy(env_vars)
print("Environment variables have been copied to clipboard.")
