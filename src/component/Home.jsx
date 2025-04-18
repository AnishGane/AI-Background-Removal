import React, { useState } from "react";
import ImageUpload from "./ImageUpload";
import ImagePreview from "./ImagePreview";
import { FinalImageAPI } from "../utils/FinalImageAPI";

const Home = () => {
  const [uploadImage, setUploadImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const uploadImageHandler = async (file) => {
    setUploadImage(URL.createObjectURL(file));
    setSelectedFile(file);
    setError(""); // Clear any previous errors
  };

  const RemoveBG = async () => {
    if (!selectedFile) {
      setError("Please upload an image first");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const finalImageData = await FinalImageAPI(selectedFile);
      setPreviewImage(finalImageData);
    } catch (error) {
      console.error("Error: ", error.message);
      setError(
        error.message || "Failed to remove background. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };
  // console.log(previewImage);

  return (
    <>
      <ImageUpload uploadImageHandler={uploadImageHandler} />
      {error && <div className="text-red-500 mt-2 text-center">{error}</div>}
      <ImagePreview
        uploaded={uploadImage}
        finalImage={previewImage?.image}
        loading={loading}
      />
      <button
        onClick={RemoveBG}
        disabled={!selectedFile || loading}
        className={`mt-9 px-8 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-purple-600 via-blue-500 to-green-400 hover:from-green-400 hover:via-blue-500 hover:to-purple-600 transition-all duration-500 ease-out bg-size-200 bg-pos-0 hover:bg-pos-100 shadow-lg transform hover:scale-105 hover:shadow-xl cursor-pointer ${
          !selectedFile || loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Processing..." : "Remove Background"}
      </button>
    </>
  );
};

export default Home;
