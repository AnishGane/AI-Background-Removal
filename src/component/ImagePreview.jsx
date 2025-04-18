import React from "react";
import Loading from "./Loading";

const ImagePreview = (props) => {
  return (
    <div className="w-full  mt-8 max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Original Image */}
      <div className="flex flex-col gap-4">
        <h2 className="bg-black text-white font-semibold text-center p-2 rounded-xl py-3">
          Original Image
        </h2>

        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
          {props.uploaded ? (
            <img
              src={props.uploaded}
              className="w-full h-full object-cover"
              alt=""
            />
          ) : (
            <div className="flex items-center justify-center h-80 bg-gray-300">
              No Image Uploaded
            </div>
          )}
        </div>
      </div>

      {/* background removed Image */}
      <div className="flex flex-col gap-4">
        <h2 className="bg-gray-400 text-white font-semibold text-center p-2 rounded-xl py-3">
          Final Image
        </h2>

        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
          {props.finalImage && !props.loading && (
            <img
              src={props.finalImage}
              className="w-full object-cover"
              alt=""
            />
          )}

          {props.loading ? (
            <div className="flex items-center justify-center h-80 bg-gray-300">
              <Loading />
            </div>
          ) : (
            !props.finalImage && (
              <div className="flex items-center justify-center text-center h-80 bg-gray-300">
                No FinalImage
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ImagePreview;
