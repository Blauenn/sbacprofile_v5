import axios from "axios";
import { ExplicitAxiosResponseInterface } from "../../../../interfaces/fetch.interface";
// Constants //
import { API_ENDPOINT } from "../../../../constants/ENDPOINTS";

export const clubLeaveRequest_update = async (
  club_leave_request_ID: number,
  club_leave_request_status: number
) => {
  const clubLeaveRequestToUpdate = {
    id: club_leave_request_ID,
    clubLeaveRequestInfo: {
      club_leave_request_status: club_leave_request_status,
    },
  };
  const clubLeaveRequestUpdateJSON = JSON.stringify(clubLeaveRequestToUpdate);

  try {
    const response: ExplicitAxiosResponseInterface = await axios.post(`${API_ENDPOINT}/api/v1/clubLeaveRequest/update`, clubLeaveRequestUpdateJSON, { headers: { "Content-Type": "application/json" }});

    if (response.data.status) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};