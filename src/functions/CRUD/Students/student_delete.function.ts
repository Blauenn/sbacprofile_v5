import axios from "axios";
import { ExplicitAxiosResponseInterface } from "../../../interfaces/fetch.interface";
// Constants //
import { API_ENDPOINT } from "../../../constants/ENDPOINTS";

export const student_delete = async (student_ID: number) => {
  const studentDelete = {
    id: student_ID,
  };
  const studentDeleteJSON = JSON.stringify(studentDelete);

  try {
    const response: ExplicitAxiosResponseInterface = await axios.post(
      `${API_ENDPOINT}/api/v1/student/delete`,
      studentDeleteJSON,
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
