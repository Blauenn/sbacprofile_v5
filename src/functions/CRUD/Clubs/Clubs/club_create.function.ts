import axios from "axios";
import { ExplicitAxiosResponseInterface } from "../../../../interfaces/fetch.interface";
// Functions //
import { upload_file } from "../../file_upload.function";
import { validate_club } from "./validate_clubs.function";
// Constants //
import { API_ENDPOINT } from "../../../../constants/ENDPOINTS";

export const club_create = async (
  clubCreateObject: any,
  clubImageObject: any,
  clubImageName: string,
  setValidationErrors: React.Dispatch<React.SetStateAction<any>>
) => {
  const updatedClubUpdateObject = {
    club_name: clubCreateObject.club_name,
    club_major: parseInt(clubCreateObject.club_major, 10),
    club_status: parseInt(clubCreateObject.club_status, 10),
    club_description: clubCreateObject.club_description,
    club_image: clubCreateObject.club_image,
    club_capacity: parseInt(clubCreateObject.club_capacity, 10),
  };

  const validation = validate_club(
    updatedClubUpdateObject,
    setValidationErrors
  );

  // If the validation passes. //
  if (validation) {
    // Club image //
    if (clubImageObject != null) {
      await upload_file(
        clubImageObject,
        clubImageName,
        "/api/v1/upload/image/club"
      );
    }

    // Club information //
    const clubToCreateObject = {
      club_name: updatedClubUpdateObject.club_name,
      club_major: updatedClubUpdateObject.club_major,
      club_description: updatedClubUpdateObject.club_description,
      club_status: updatedClubUpdateObject.club_status,
      club_capacity: updatedClubUpdateObject.club_capacity,
      club_image:
        clubImageObject != null
          ? `/assets/profilePic/clubs/${clubImageName}`
          : "",
    };
    const clubToCreateObjectJSON = JSON.stringify(clubToCreateObject);

    // Upload the club information. //
    try {
      const response: ExplicitAxiosResponseInterface = await axios.post(
        `${API_ENDPOINT}/api/v1/club/create`,
        clubToCreateObjectJSON,
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
  }
};
