import React from "react";

const ImageUpload = (props) => {
  const showImageHandler = (e) => {
    const file = e.target.files[0];
    // console.log(file);
    if (file) {
      props.uploadImageHandler(file);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl max-w-2xl w-full p-6">
      <label
        htmlFor="fileInput"
        className="block w-full cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-all"
      >
        <input
          type="file"
          className="hidden"
          id="fileInput"
          onChange={showImageHandler}
        />
        <span className="text-gray-600 font-medium text-lg">
          Click and drag to upload the image
        </span>
      </label>
    </div>
  );
};

export default ImageUpload;
