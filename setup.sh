#!/bin/bash

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check Node version
NODE_VERSION=$(node -v | cut -d 'v' -f 2 | cut -d '.' -f 1)
if [ "$NODE_VERSION" -lt 14 ]; then
    echo "Node.js version is too old. Please install Node.js v14 or later."
    exit 1
fi

echo "Cleaning node_modules and package-lock.json..."
rm -rf node_modules
rm -f package-lock.json

echo "Installing required packages one by one..."
npm install --save react@18.2.0
npm install --save react-dom@18.2.0
npm install --save-dev react-scripts@5.0.1
npm install --save-dev tailwindcss@3.3.3
npm install --save-dev postcss@8.4.31
npm install --save-dev autoprefixer@10.4.16

echo "Installing remaining dependencies..."
npm install --save-dev @testing-library/jest-dom@5.17.0
npm install --save-dev @testing-library/react@13.4.0
npm install --save-dev @testing-library/user-event@13.5.0
npm install --save-dev web-vitals@2.1.4

echo "Setup complete. You can now run 'npm start' to start the development server."
