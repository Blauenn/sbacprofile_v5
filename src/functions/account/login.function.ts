import axios from "axios";
import { API_ENDPOINT } from "../../constants/ENDPOINTS";
import { fetch_user_info } from "../fetch/fetch_user.function";

interface AuthorizedObject {
  data: {
    status: boolean;
    result: {
      accessToken: string;
    };
  };
}

export const handle_login = async (
  event: any,
  loginObject: any,
  setAccessToken: any,
  setUserInfo: any,
  setIsLoggingIn: any,
  setIsLoggedIn: any,
  setIsLoginFailed: any
) => {
  event.preventDefault();
  setIsLoggingIn(true);

  const loginToCheckObject = {
    email: loginObject.login_email,
    password: loginObject.login_password,
  };
  const loginObjectJSON = JSON.stringify(loginToCheckObject);

  try {
    const response: AuthorizedObject = await axios.post(
      `${API_ENDPOINT}/api/v1/auth/login`,
      loginObjectJSON,
      { headers: { "Content-Type": "application/json" } }
    );

    if (response.data.status) {
      const accessToken = response.data.result.accessToken;
      // Set localStorage item //
      localStorage.setItem("accessToken", accessToken);
      setAccessToken(accessToken);
      setIsLoggedIn(true);

      // Get user information //
      await fetch_user_info(accessToken, setUserInfo);
    } else {
      setIsLoginFailed(true);
      setIsLoggingIn(false);
      setAccessToken("");
      setIsLoggedIn(false);
    }
  } catch (error) {
    setIsLoginFailed(true);
    setIsLoggingIn(false);
    setAccessToken("");
    setIsLoggedIn(false);
  }
};
