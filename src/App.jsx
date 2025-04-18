import React from "react";
import Home from "./component/Home";
function App() {
  return (
    <>
      <div className="bg-gray-200 min-h-screen flex flex-col items-center justify-center px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-6xl font-bold bg-gradient-to-r from-yellow-500 via-green-500 to-purple-500 text-transparent bg-clip-text p-4">
            AI Empowered Background Removal
          </h2>
          <p className="text-center text-gray-400 font-semibold text-lg leading-7 mt-2">
            Easily remove backgrounds from your images with our powerful AI
            technology. <br />
            Upload your photos and get professional-quality results in seconds.
          </p>
        </div>
        <Home />
        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 font-semibold">
          <p>Upload Image & Preview it</p>
        </div>
      </div>
    </>
  );
}

export default App;
