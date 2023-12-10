import axios from "axios";
import { ExplicitAxiosResponseInterface } from "../../../../interfaces/fetch.interface";
// Constants //
import { API_ENDPOINT } from "../../../../constants/ENDPOINTS";

export const clubJoinRequest_create = async (
  club_ID: number,
  student_ID: number,
) => {
  const clubJoinRequestToCreate = {
    club_join_request_status: 1,
    club_join_request_club_ID: club_ID,
    club_join_request_student_ID: student_ID,
  };
  const clubJoinRequestCreateJSON = JSON.stringify(clubJoinRequestToCreate);

  // Create the club join request. //
  try {
		const response: ExplicitAxiosResponseInterface = await axios.post(`${API_ENDPOINT}/api/v1/clubJoinRequest/create`, clubJoinRequestCreateJSON, { headers: { "Content-Type": "application/json" }})

    if (response.data.status) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};