import axios from "axios";

if (!import.meta.env.VITE_MY_API_KEY) {
  throw new Error("VITE_MY_API_KEY is not set in environment variables");
}
if (!import.meta.env.VITE_BASE_URL) {
  throw new Error("VITE_BASE_URL is not set in environment variables");
}

const API_KEY = import.meta.env.VITE_MY_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;
const MAXIMUM_RETRIES = 20;
const POLLING_INTERVAL = 2000; //2 second

export const FinalImageAPI = async (file) => {
  if (!file) {
    throw new Error("No file provided");
  }

  if (!(file instanceof File)) {
    throw new Error("Invalid file type. Please provide a File object");
  }

  try {
    const taskId = await uploadImage(file);
    // console.log(taskId);

    const finalImageData = await PollForFinalImage(taskId);
    // console.log(finalImageData);

    return finalImageData;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error(
        "API endpoint not found. Please check the BASE_URL configuration."
      );
    } else if (error.response?.status === 401) {
      throw new Error(
        "Invalid API key. Please check your API key configuration."
      );
    } else if (error.response?.status === 413) {
      throw new Error("File size too large. Please upload a smaller image.");
    } else {
      throw new Error(
        error.message || "Failed to process image. Please try again."
      );
    }
  }
};

const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("image_file", file);

  try {
    const { data } = await axios.post(
      `${BASE_URL}api/tasks/visual/segmentation`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "X-API-KEY": API_KEY,
        },
      }
    );

    if (!data?.data?.task_id) {
      throw new Error("Failed to upload image: No task ID received");
    }
    //   console.log(data);
    return data.data.task_id;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error("API not found:");
    }
    throw error;
  }
};

const fetchFinalImage = async (taskId) => {
  if (!taskId) {
    throw new Error("No task ID provided");
  }
  try {
    const { data } = await axios.get(
      `${BASE_URL}api/tasks/visual/segmentation/${taskId}`,
      {
        headers: {
          "X-API-KEY": API_KEY,
        },
      }
    );

    // console.log("Response from fetchFinalImage:", data);
    if (!data?.data) {
      throw new Error("Invalid response format: image data not found");
    }
    return data.data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error("API  not found:");
    }
    throw error;
  }
};

const PollForFinalImage = async (taskId, retries = 0) => {
  const result = await fetchFinalImage(taskId);

  if (result.state === 4) {
    console.log(`Processing... ${retries} / ${MAXIMUM_RETRIES}`);

    if (retries >= MAXIMUM_RETRIES) {
      throw new Error("Maximum retires reached");
    }

    // For Polling
    await new Promise((resolve) => setTimeout(resolve, POLLING_INTERVAL));

    return PollForFinalImage(taskId, retries + 1);
  }

  return result;
};
