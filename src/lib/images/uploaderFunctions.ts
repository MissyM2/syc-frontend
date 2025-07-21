import axios from 'axios';
import type { AxiosResponse } from 'axios';
import { api } from '../../index.tsx';

// interface UploadImageBody {
//   fileName: string;
//   fileType: string;
// }
export const getPresignedUrl = async (
  selectedFile: string,
  fileType: string
) => {
  if (!selectedFile) {
    console.log('selected file is missing');
    return;
  }
  try {
    const apiEndpoint =
      'https://bku01dtzd0.execute-api.us-east-1.amazonaws.com/Dev/upload_image'; // e.g., /get-presigned-url

    const getUrlResponse = await axios.get(
      `${apiEndpoint}?${new URLSearchParams({
        filename: selectedFile,
        contentType: fileType,
      })}`
    );

    const { uploadUrl } = getUrlResponse.data;

    return uploadUrl;
  } catch (error) {
    console.error('Error getting presigned URL:', error);
    throw error;
  }
};

export const uploadImageToS3 = async (
  presignedUrl: string,
  selectedFile: File
) => {
  try {
    // if (selectedFile! instanceof File) {
    //   console.log('file is not valid');
    //   return;
    // }
    const response = await axios.put(presignedUrl, selectedFile, {
      headers: {
        'Content-Type': selectedFile.type, // Important: Set the Content-Type header
      },
    });
    console.log('response ' + response);

    console.log('Image uploaded successfully!');
    return response;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};
