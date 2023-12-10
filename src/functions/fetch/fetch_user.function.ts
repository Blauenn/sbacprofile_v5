import axios from "axios";
import { API_ENDPOINT } from "../../constants/ENDPOINTS";
import { UserInfoInterface } from "../../interfaces/account.interface";
import { default_image } from "../../constants/miscellaneous/default_image.constant";

interface UserInfoResponse {
  data: {
    status: boolean;
    result: UserInfoInterface;
  };
}
interface UserImageResponse {
  data: {
    status: boolean;
    result: {
      profile_image: string;
    };
  };
}

export const fetch_user_info = async (
  accessToken: string,
  setUserInfo: any
) => {
  if (accessToken !== "") {
    try {
      const response: UserInfoResponse = await axios.get(
        `${API_ENDPOINT}/api/v1/profile/getProfile`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: accessToken,
          },
        }
      );

      if (response.data.status) {
        setUserInfo({
          status: response.data.status,
          result: response.data.result,
        });
      }
    } catch (error) {}
  }
};

export const fetch_user_image = async (
  accessToken: string,
  setProfileImage: any
) => {
  try {
    const response: UserImageResponse = await axios.get(
      `${API_ENDPOINT}/api/v1/image/getImage`,
      {
        headers: {
          "Content-Type": "application/json",
          authorization: accessToken,
        },
      }
    );

    if (response.data.status) {
      setProfileImage(response.data.result.profile_image);
      localStorage.setItem("profileImage", response.data.result.profile_image);
    }
  } catch (error) {
    setProfileImage(default_image);
    localStorage.setItem("profileImage", default_image);
  }
};
