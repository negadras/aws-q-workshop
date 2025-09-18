# QWords TypeScript Application

This is a TypeScript implementation of the QWords game application.

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

## Building the Application

1. Navigate to the TypeScript application directory:
   ```bash
   cd code/typescript
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the TypeScript code:
   ```bash
   npm run build
   ```

## Running the Application

1. After building, start the server:
   ```bash
   npm start
   ```

2. Access the application in your web browser at:
   ```
   http://localhost:3000
   ```

## Running Tests

To run the test suite:
```bash
npm test
```

## Features

- Word guessing game implementation
- User session management
- Bootstrap-based responsive UI
- Interactive gameplay with visual feedback

## Project Structure

- `/controllers` - Game and Home controller logic
- `/models` - Data models and interfaces
- `/services` - Business logic and game services
- `/views` - EJS templates for the UI
- `/public` - Static assets (CSS, JavaScript, images)
- `/tests` - Test files