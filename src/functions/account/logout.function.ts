import { UserInfoContextInterface } from "../../contexts/Account.context";

export const logout = (
  setAccessToken: React.Dispatch<React.SetStateAction<string>>,
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfoContextInterface>>,
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>,
  shouldClear: boolean,
  setShouldClear: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (shouldClear) {
    setAccessToken("");
    setUserInfo({
      status: false,
      result: {
        primary_profile_ID: 0,
        profile_position: 0,
        profile_ID: 0,
        profile_first_name: "",
        profile_last_name: "",
        profile_nickname: "",
        profile_first_name_thai: "",
        profile_last_name_thai: "",
        profile_nickname_thai: "",
        profile_gender: 0,
        profile_major: 0,
        profile_level: 0,
        profile_class: 0,
        profile_phone: "",
        profile_email: "0",
        profile_line_ID: "",
        profile_image: "",
      },
    });
    setIsLoggedIn(false);
    localStorage.clear();
    setShouldClear(false); // Set shouldClear to false to prevent further clearing //
  }
};
