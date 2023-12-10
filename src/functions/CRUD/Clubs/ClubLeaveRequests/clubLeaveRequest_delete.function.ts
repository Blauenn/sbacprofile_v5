import axios from "axios";
import { ExplicitAxiosResponseInterface } from "../../../../interfaces/fetch.interface";
// Constants //
import { API_ENDPOINT } from "../../../../constants/ENDPOINTS";

export const clubLeaveRequest_delete = async (
  club_leave_request_ID: number
) => {
  const clubLeaveRequestToDelete = {
    id: club_leave_request_ID,
  };
  const clubLeaveRequestDeleteJSON = JSON.stringify(clubLeaveRequestToDelete);

  // Delete the club leave request. //
  try {
    const response: ExplicitAxiosResponseInterface = await axios.post(`${API_ENDPOINT}/api/v1/clubLeaveRequest/delete`, clubLeaveRequestDeleteJSON, { headers: { "Content-Type": "application/json" }});

    if (response.data.status) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};