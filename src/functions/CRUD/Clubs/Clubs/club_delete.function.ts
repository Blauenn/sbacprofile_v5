import axios from "axios";
import { ExplicitAxiosResponseInterface } from "../../../../interfaces/fetch.interface";
// Constants //
import { API_ENDPOINT } from "../../../../constants/ENDPOINTS";

export const club_delete = async (club_ID: number) => {
  const clubDelete = {
    id: club_ID,
  };
  const clubDeleteJSON = JSON.stringify(clubDelete);

  try {
    const response: ExplicitAxiosResponseInterface = await axios.post(
      `${API_ENDPOINT}/api/v1/club/delete`,
      clubDeleteJSON,
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
