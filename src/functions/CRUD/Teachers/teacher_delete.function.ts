import axios from "axios";
import { ExplicitAxiosResponseInterface } from "../../../interfaces/fetch.interface";
// Constants //
import { API_ENDPOINT } from "../../../constants/ENDPOINTS";

export const teacher_delete = async (teacher_ID: number) => {
  const teacherDelete = {
    id: teacher_ID,
  };
  const teacherDeleteJSON = JSON.stringify(teacherDelete);

  try {
    const response: ExplicitAxiosResponseInterface = await axios.post(
      `${API_ENDPOINT}/api/v1/teacher/delete`,
      teacherDeleteJSON,
      { headers: { "Content-Type": "application/json" } }
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
