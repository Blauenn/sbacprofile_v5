import axios from "axios";
import { API_ENDPOINT } from "../../constants/ENDPOINTS";

interface ResponseInterface {
  data: {
    status: boolean;
    result: {
      message: string;
    };
  };
}

// Upload file or image //
export const upload_file = async (file: any, fileName: any, url: string) => {
  // Get the file object from the state. //
  const fileToUpload = new FormData();
  fileToUpload.append("file", file);
  fileToUpload.append("filename", `${fileName}`);

  try {
    const response: ResponseInterface = await axios.postForm(
      `${API_ENDPOINT}${url}`,
      fileToUpload
    );

    if (response.data.status) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
