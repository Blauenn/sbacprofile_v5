import { z } from "zod";
import { API_ENDPOINT } from "../../constants/ENDPOINTS";
import axios from "axios";

interface SettingsPassword {
  current_password: string;
  new_password: string;
  confirm_password: string;
}

interface AccessTokenResponse {
  data: {
    status: boolean;
    result: {
      accessToken: string;
    };
  };
}
interface ChangePasswordResponse {
  data: {
    status: boolean;
    result: any;
  };
}

const settingsPassword_schema = z.object({
  current_password: z.string().min(1),
  new_password: z.string().min(8),
  confirm_password: z.string().min(8),
});

export const account_password_update = async (
  userEmail: string,
  settingsPasswordObject: SettingsPassword,
  setIsUpdating: React.Dispatch<React.SetStateAction<boolean>>,
  setIsUpdateSuccess: React.Dispatch<React.SetStateAction<boolean>>,
  setIsError: React.Dispatch<React.SetStateAction<string>>,
  t: any
) => {
  setIsUpdating(true);
  if (settingsPassword_schema.safeParse(settingsPasswordObject).success) {
    // If the password doesn't match, don't proceed. //
    if (
      settingsPasswordObject.new_password !=
      settingsPasswordObject.confirm_password
    ) {
      setIsError(t("account_password_notMatch"));
      setIsUpdating(false);
      setIsUpdateSuccess(false);
      return;
    }

    // Check current password's validity. //
    const currentPasswordCheckObject = {
      email: userEmail,
      password: settingsPasswordObject.current_password,
    };
    const currentPasswordCheckJSON = JSON.stringify(currentPasswordCheckObject);

    // Current password check //
    try {
      const accessTokenResponse: AccessTokenResponse = await axios.post(
        `${API_ENDPOINT}/api/v1/auth/login`,
        currentPasswordCheckJSON,
        { headers: { "Content-Type": "application/json" } }
      );

      // Update the password, if the current password is correct. //
      if (accessTokenResponse.data.status) {
        const updatePasswordJSON = JSON.stringify({
          password: settingsPasswordObject.new_password,
        });

        try {
          const changePasswordResponse: ChangePasswordResponse =
            await axios.post(
              `${API_ENDPOINT}/api/v1/auth/changePassword`,
              updatePasswordJSON,
              {
                headers: {
                  "Content-Type": "application/json",
                  authorization: accessTokenResponse.data.result.accessToken,
                },
              }
            );

          if (changePasswordResponse.data.status) {
            setIsError("");
            setIsUpdating(false);
            setIsUpdateSuccess(true);
          }
        } catch (error) {}
      } else {
        setIsError("Invalid password.");
        setIsUpdating(false);
        setIsUpdateSuccess(false);
      }
    } catch (error) {
      setIsError(t("account_password_updateError"));
      setIsUpdating(false);
      setIsUpdateSuccess(false);
    }
  } else {
    setIsError(t("account_password_shortPassword"));
    setIsUpdating(false);
    setIsUpdateSuccess(false);
  }
};
