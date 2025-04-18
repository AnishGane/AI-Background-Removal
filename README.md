# AI Background Removal Tool

A modern web application that uses AI to remove backgrounds from images with just a few clicks.

## Features

- **Simple Upload Interface**: Drag and drop or click to upload images
- **Real-time Processing**: See the original and processed images side by side
- **AI-Powered**: Leverages advanced AI segmentation for accurate background removal
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **Frontend**: React.js with Tailwind CSS
- **API Integration**: Axios for API requests
- **State Management**: React Hooks
- **Environment Variables**: Vite for environment configuration

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

4. Install axios:
   ```
   npm i axios -- save
   ```

5. Create a `.env` file in the frontend directory with the following variables:
   ```
   VITE_MY_API_KEY = "your_api_key_here"
   VITE_BASE_URL = "https://techhk.aoscdn.com/"
   ```

6. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

## Project Structure

```
frontend/
├── src/
│   ├── component/
│   │   ├── Home.jsx           # Main application component
│   │   ├── ImageUpload.jsx    # Image upload interface component
│   │   ├── ImagePreview.jsx   # Image preview and comparison component
│   │   └── Loading.jsx        # Loading state component
│   ├── utils/                 # Utility functions and helpers
│   ├── App.jsx                # Root application component
│   ├── main.jsx               # Application entry point
│   └── index.css              # Global styles
├── .env                       # Environment variables
└── package.json               # Project dependencies and scripts
```

## How It Works

1. Users upload an image through the interface
2. The application sends the image to an AI enhancement API
3. The application polls the API for the enhanced image
4. Once processing is complete, the Background Removed image is displayed alongside the original

## API Integration

The application uses an external AI service for image enhancement. The API communication is handled in `enhancedImageAPI.js`, which:
- Uploads the image to the API
- Retrieves a task ID
- Polls the API until the final image is ready
- Returns the final image URL

## Environment Variables

- `VITE_MY_API_KEY`: Your API key for the enhancement service
- `VITE_BASE_URL`: The base URL for the API endpoints

## Notes

- The API has a maximum retry limit of 20 attempts when polling for results
- Large images may take longer to process

## Links

- [Demo Site](https://ai-image-enhancer-1oli.onrender.com/)
- [API Documentation](https://picwish.com/background-removal-api-doc)

## Author

- AnishGane @ 2025
