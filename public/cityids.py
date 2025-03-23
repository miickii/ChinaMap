import os

# Set the folder path where your city JSON files are stored
folder_path = "./geometryCities/"  # Replace with your actual folder path

# Get the list of JSON files in the folder
file_names = [f for f in os.listdir(folder_path) if f.endswith(".json")]

# Extract city IDs (assuming filenames follow "320500.json" -> "3205")
city_ids = sorted(set(f[:4] for f in file_names))

# Print city IDs for React usage
print(file_names)
