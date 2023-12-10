import axios from "axios";
import { ExplicitAxiosResponseInterface } from "../../../../interfaces/fetch.interface";
// Constants //
import { API_ENDPOINT } from "../../../../constants/ENDPOINTS";

export const clubMembership_create = async (
  club_ID: number,
  club_student_ID: number
) => {
  const clubMembershipToCreate = {
    club_membership_club_ID: club_ID,
    club_membership_student_ID: club_student_ID,
  };
  const clubMembershipCreateJSON = JSON.stringify(clubMembershipToCreate);

  // Create the club membership. //
  try {
    const response: ExplicitAxiosResponseInterface = await axios.post(`${API_ENDPOINT}/api/v1/clubMembership/create`, clubMembershipCreateJSON, { headers: { "Content-Type": "application/json" }})

    if (response.data.status) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};