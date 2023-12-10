import axios from "axios";
import { ExplicitAxiosResponseInterface } from "../../../../interfaces/fetch.interface";
// Constants //
import { API_ENDPOINT } from "../../../../constants/ENDPOINTS";

export const clubJoinRequest_delete = async (
	club_join_request_ID: number
) => {
	const clubJoinRequestToDelete = {
		id: club_join_request_ID,
	};
	const clubJoinRequestDeleteJSON = JSON.stringify(clubJoinRequestToDelete);

	// Delete the club join request //
	try {
		const response: ExplicitAxiosResponseInterface = await axios.post(`${API_ENDPOINT}/api/v1/clubJoinRequest/delete`, clubJoinRequestDeleteJSON, { headers: { "Content-Type": "application/json" } });

		if (response.data.status) {
			return true;
		} else {
			return false;
		}
	} catch (error) {
		return false;
	}
};