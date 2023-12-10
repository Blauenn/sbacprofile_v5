import axios from "axios";
import { ExplicitAxiosResponseInterface } from "../../../../interfaces/fetch.interface";
// Constants //
import { API_ENDPOINT } from "../../../../constants/ENDPOINTS";

export const clubManager_createDelete = async (
  club_ID: number,
  originalClubTeachers: number[],
  clubTeachers: number[]
) => {
  const clubManagers_toCreate = clubTeachers.filter(
    (teacher: number) => !originalClubTeachers.includes(teacher)
  );
  const clubManagers_toDelete = originalClubTeachers.filter(
    (teacher: number) => !clubTeachers.includes(teacher)
  );

  // Create //
  if (clubManagers_toCreate.length > 0) {
    const clubManagerToCreate = {
      club_ID: club_ID,
      clubManagers: clubManagers_toCreate.map((teacher_ID) => teacher_ID),
    };
    const clubManagerToCreateJSON = JSON.stringify(clubManagerToCreate);

    try {
      const response: ExplicitAxiosResponseInterface = await axios.post(
        `${API_ENDPOINT}/api/v1/clubManager/createMultiple`, clubManagerToCreateJSON, {headers: { "Content-Type": "application/json" }});

      if (response.data.status) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }

  // Delete //
  if (clubManagers_toDelete.length > 0) {
    const clubManagerToDelete = {
      club_ID: club_ID,
      clubManagers: clubManagers_toDelete.map((teacher_ID) => teacher_ID),
    };
    const clubManagerToDeleteJSON = JSON.stringify(clubManagerToDelete);

    // Delete the club manager //
    try {
      const response: ExplicitAxiosResponseInterface = await axios.post(
        `${API_ENDPOINT}/api/v1/clubManager/deleteMultiple`, clubManagerToDeleteJSON, {headers: { "Content-Type": "application/json" }});

      if (response.data.status) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
};