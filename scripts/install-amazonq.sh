#!/bin/bash

# Script to identify and download the latest Amazon Q VSIX file from AWS Toolkit for VS Code
# If the extension is not already installed, it will install it automatically

set -e

# Parse command line arguments
DOWNLOAD_ONLY=false
HELP=false

for arg in "$@"; do
  case $arg in
    --download-only)
      DOWNLOAD_ONLY=true
      shift
      ;;
    --help|-h)
      HELP=true
      shift
      ;;
    *)
      # Unknown option
      ;;
  esac
done

if [ "$HELP" = true ]; then
  echo "Usage: $0 [OPTIONS]"
  echo ""
  echo "Options:"
  echo "  --download-only    Download the VSIX file but don't install it"
  echo "  --help, -h         Show this help message"
  exit 0
fi

# Check if VS Code is installed (only if we're not in download-only mode)
if [ "$DOWNLOAD_ONLY" = false ] && ! command -v code &> /dev/null; then
    echo "VS Code is not installed or not in PATH. Please install VS Code first."
    echo "If you only want to download the VSIX file without installing, use the --download-only flag."
    exit 1
fi

# Check if Amazon Q extension is already installed (only if we're not in download-only mode)
if [ "$DOWNLOAD_ONLY" = false ]; then
    echo "Checking if Amazon Q extension is already installed..."
    EXTENSION_ID="amazonwebservices.amazon-q-vscode"
    if code --list-extensions | grep -q "$EXTENSION_ID"; then
        INSTALLED_VERSION=$(code --list-extensions --show-versions | grep "$EXTENSION_ID" | cut -d'@' -f2)
        echo "Amazon Q extension is already installed (version $INSTALLED_VERSION)."
        read -p "Do you want to continue and update it? (y/n): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            echo "Installation aborted."
            exit 0
        fi
    else
        echo "Amazon Q extension is not installed. Proceeding with installation..."
    fi
else
    echo "Running in download-only mode. The extension will not be installed."
fi

echo "Fetching latest release information from AWS Toolkit for VS Code..."

# Get the latest release information from GitHub API
LATEST_RELEASE=$(curl -s https://api.github.com/repos/aws/aws-toolkit-vscode/releases/latest)

# Extract the version number
VERSION=$(echo $LATEST_RELEASE | grep -o '"tag_name": "[^"]*"' | cut -d'"' -f4)
echo "Latest version: $VERSION"

# Find the Amazon Q VSIX file URL in the assets
VSIX_URL=$(echo $LATEST_RELEASE | grep -o '"browser_download_url": "[^"]*amazonq[^"]*\.vsix"' | cut -d'"' -f4)

if [ -z "$VSIX_URL" ]; then
    echo "Could not find Amazon Q VSIX file in the latest release."
    exit 1
fi

echo "Found Amazon Q VSIX URL: $VSIX_URL"

# Create downloads directory if it doesn't exist
DOWNLOAD_DIR="$(dirname "$0")/../downloads"
mkdir -p "$DOWNLOAD_DIR"

# Download the VSIX file
VSIX_FILENAME=$(basename "$VSIX_URL")
DOWNLOAD_PATH="$DOWNLOAD_DIR/$VSIX_FILENAME"

echo "Downloading to $DOWNLOAD_PATH..."
curl -L "$VSIX_URL" -o "$DOWNLOAD_PATH"

if [ $? -eq 0 ]; then
    echo "Download complete!"
    echo "VSIX file saved to: $DOWNLOAD_PATH"
    
    # Install the extension if not in download-only mode
    if [ "$DOWNLOAD_ONLY" = false ]; then
        echo "Installing Amazon Q extension..."
        code --install-extension "$DOWNLOAD_PATH"
        
        if [ $? -eq 0 ]; then
            echo "Amazon Q extension has been successfully installed!"
            echo "Please restart VS Code to activate the extension."
        else
            echo "Installation failed. You can try to install manually with:"
            echo "code --install-extension $DOWNLOAD_PATH"
            exit 1
        fi
    else
        echo "Skipping installation as requested (--download-only flag was used)."
        echo "To install manually, run: code --install-extension $DOWNLOAD_PATH"
    fi
else
    echo "Download failed."
    exit 1
fi
