import os
import shutil

# Define the source (iCloud Drive) and destination (Local Backup) directories
source = os.path.expanduser('/Users/micki/Library/Mobile Documents/com~apple~CloudDocs/Desktop/Javascript')
destination = os.path.expanduser('~/Javascript')

# Create the destination directory if it doesn't exist
os.makedirs(destination, exist_ok=True)

# Walk through the iCloud Drive directory and copy files to the local backup
for foldername, subfolders, filenames in os.walk(source):
    for filename in filenames:
        source_file = os.path.join(foldername, filename)
        relative_path = os.path.relpath(source_file, source)
        destination_file = os.path.join(destination, relative_path)

        # Create the destination folder if it doesn't exist
        os.makedirs(os.path.dirname(destination_file), exist_ok=True)

        try:
            # Copy file to local backup
            shutil.copy2(source_file, destination_file)
            print(f'Copied: {source_file} to {destination_file}')
        except Exception as e:
            print(f'Error copying {source_file}: {e}')
