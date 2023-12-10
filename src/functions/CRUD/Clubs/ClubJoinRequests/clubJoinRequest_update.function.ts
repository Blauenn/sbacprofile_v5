import axios from "axios";
import { ExplicitAxiosResponseInterface } from "../../../../interfaces/fetch.interface";
// Constants //
import { API_ENDPOINT } from "../../../../constants/ENDPOINTS";

export const clubJoinRequest_update = async (
  club_join_request_ID: number,
  club_join_request_status: number
) => {
  const clubJoinRequestToUpdate = {
    id: club_join_request_ID,
    clubJoinRequestInfo: {
      club_join_request_status: club_join_request_status,
    },
  };
  const clubJoinRequestUpdateJSON = JSON.stringify(clubJoinRequestToUpdate);

  try {
    const response: ExplicitAxiosResponseInterface = await axios.post(`${API_ENDPOINT}/api/v1/clubJoinRequest/update`, clubJoinRequestUpdateJSON, { headers: { "Content-Type": "application/json" }})

    if (response.data.status) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};