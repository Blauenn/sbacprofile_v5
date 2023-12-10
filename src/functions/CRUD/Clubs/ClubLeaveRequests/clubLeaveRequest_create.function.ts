import axios from "axios";
import { ExplicitAxiosResponseInterface } from "../../../../interfaces/fetch.interface";
// Constants //
import { API_ENDPOINT } from "../../../../constants/ENDPOINTS";

export const clubLeaveRequest_create = async (
  club_ID: number,
  student_ID: number,
) => {
  const clubLeaveRequestToCreate = {
    club_leave_request_status: 1,
    club_leave_request_club_ID: club_ID,
    club_leave_request_student_ID: student_ID,
  };
  const clubLeaveRequestCreateJSON = JSON.stringify(clubLeaveRequestToCreate);

  // Create the club leave request //
  try {
		const response: ExplicitAxiosResponseInterface = await axios.post(`${API_ENDPOINT}/api/v1/clubLeaveRequest/create`, clubLeaveRequestCreateJSON, { headers: { "Content-Type": "application/json" }});

    if (response.data.status) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};