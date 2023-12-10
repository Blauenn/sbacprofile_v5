import axios from "axios";
import { ExplicitAxiosResponseInterface } from "../../../../interfaces/fetch.interface";
// Functions //
import { upload_file } from "../../file_upload.function";
import { validate_club } from "./validate_clubs.function";
// Constants //
import { API_ENDPOINT } from "../../../../constants/ENDPOINTS";

export const club_update = async (
  clubUpdateObject: any,
  clubImageObject: any,
  clubImageName: string,
  setValidationErrors: React.Dispatch<React.SetStateAction<any>>
) => {
  const validation = validate_club(clubUpdateObject, setValidationErrors);

  // If validation passes. //
  if (validation) {
    // Club image //
    if (clubImageObject != null) {
      await upload_file(
        clubImageObject,
        clubImageName,
        "/api/v1/upload/image/club"
      );
    }

    // Update the club. //
    const clubToUpdateObject = {
      id: clubUpdateObject.club_ID,
      clubInfo: {
        club_name: clubUpdateObject.club_name,
        club_major: clubUpdateObject.club_major,
        club_description: clubUpdateObject.club_description,
        club_status: clubUpdateObject.club_status,
        club_capacity: clubUpdateObject.club_capacity,
        club_image:
          clubImageObject != null
            ? `/assets/profilePic/clubs/${clubImageName}`
            : "",
      },
    };
    const clubToUpdateJSON = JSON.stringify(clubToUpdateObject);

    // Update the club information. //
    try {
      const response: ExplicitAxiosResponseInterface = await axios.post(
        `${API_ENDPOINT}/api/v1/club/update`,
        clubToUpdateJSON,
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
