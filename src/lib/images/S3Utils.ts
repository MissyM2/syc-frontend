import axios from 'axios';
import type { AxiosResponse } from 'axios';
import { api } from '../../index.tsx';

// interface UploadImageBody {
//   fileName: string;
//   fileType: string;
// }
export const getPresignedUrl = async (
  userId: string,
  selectedFile: string,
  fileType: string
) => {
  if (!selectedFile) {
    console.log('selected file is missing');
    return;
  }
  try {
    const apiEndpoint =
      'https://bku01dtzd0.execute-api.us-east-1.amazonaws.com/dev/images';

    const getUrlResponse = await axios.get(
      `${apiEndpoint}?${new URLSearchParams({
        userId: userId,
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
    return response;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

export const getPresignedUrlForDownload = async (
  userId: string,
  filename: string
) => {
  if (!userId || !filename) {
    console.log('selected file is missing');
    return;
  }
  try {
    console.log('getPresignedUrlForDownload, inside Try');
    const apiEndpoint =
      'https://9bk5hiz6jb.execute-api.us-east-1.amazonaws.com/dev/images';

    const getUrlResponse = await axios.get<{ downloadUrl: string }>(
      `${apiEndpoint}?${new URLSearchParams({
        userId: userId,
        filename: filename,
      })}`
    );

    const { downloadUrl } = getUrlResponse.data;

    console.log('getPresignedUrlForDownload, downloadURl' + downloadUrl);

    return downloadUrl;
  } catch (error) {
    console.error('Error getting presigned URL:', error);
    throw error;
  }
};
