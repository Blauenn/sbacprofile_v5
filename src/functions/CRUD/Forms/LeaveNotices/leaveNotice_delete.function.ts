import axios from "axios";
import { API_ENDPOINT } from "../../../../constants/ENDPOINTS";
import { ExplicitAxiosResponseInterface } from "../../../../interfaces/fetch.interface";

export const leaveNotice_delete = async (leave_notice_ID: number) => {
  const leaveNoticeToDelete = {
    id: leave_notice_ID,
  };
  const leaveNoticeDeleteJSON = JSON.stringify(leaveNoticeToDelete);

  // Delete the leave notice //
  try {
    const response: ExplicitAxiosResponseInterface = await axios.post(`${API_ENDPOINT}/api/v1/forms/leaveNotice/delete`, leaveNoticeDeleteJSON, {headers: { "Content-Type": "application/json" }});

    if (response.data.status) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};