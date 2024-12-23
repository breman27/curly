# Curly

Curly is a simple Electron-based application for making HTTP requests and managing collections of API tests.

## Features

- Send HTTP requests (GET, POST, PUT, DELETE)
- View and save response data
- Manage collections of API requests

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/curly.git
   ```
2. Navigate to the project directory:
   ```sh
   cd curly
   ```
3. Install dependencies:
   ```sh
   npm install
   ```

## Usage

1. We are now using React to structure the project in a more maintainable component based architecture. To fascilitate running this locally we can use Vite
2.
3. Use the interface to send HTTP requests and manage collections.

## Dependencies

- [Electron](https://www.electronjs.org/)
- [Axios](https://axios-http.com/)

## Development

To start the development server and run the Electron application:

1. Start the Vite development server:
   ```sh
   npm run dev
   ```
2. In a separate terminal, start the Electron application:
   ```sh
   npm run start:electron
   ```

## Building for Production

To build the application for production:

1. Build the Vite project:
   ```sh
   npm run build
   ```
2. Package the Electron application (you may need additional configuration for packaging):
   ```sh
   npm run start:electron
   ```

## License

This project is licensed under the ISC License.
