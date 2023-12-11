import { useState } from "react";
import { useTranslation } from "react-i18next";
import fade_transition from "../animations/fade_transition.transition";
// Functions //
import { handle_login } from "../functions/account/login.function";
// Constants //
import TextField from "../components/Extended/TextField";
import Button from "../components/Extended/Button";
import Button_display_toggle from "../components/Extended/Button_display_toggle";

interface CurrentComponentProp {
	setAccessToken: React.Dispatch<React.SetStateAction<string>>;
	setUserInfo: any;
	setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login = (props: CurrentComponentProp) => {
	const { setAccessToken, setUserInfo, setIsLoggedIn } = props;

	const [isLoggingIn, setIsLoggingIn] = useState(false);
	const [isLoginFailed, setIsLoginFailed] = useState(false);

	const [passwordDisplay, setPasswordDisplay] = useState(false);

	const [loginObject, setLoginObject] = useState({
		login_email: "",
		login_password: "",
	});

	const { t } = useTranslation("page_login");

	return (
		<div className="bg-white p-8 sm:w-[420px] rounded-xl shadow-sm">
			<div className="flex flex-col items-center gap-8">
				<h1 className="text-4xl font-semibold">SBAC Profile</h1>
				<form
					onSubmit={(event) => {
						handle_login(
							event,
							loginObject,
							setAccessToken,
							setUserInfo,
							setIsLoggingIn,
							setIsLoggedIn,
							setIsLoginFailed,
						);
					}}>
					<div className="flex flex-col gap-4">
						{/* Email address */}
						<TextField
							label={t("label_email")}
							name="login_email"
							object={loginObject}
							setObject={setLoginObject}
						/>
						{/* Password*/}
						<div className="flex flex-row gap-2">
							<TextField
								label={t("label_password")}
								name="login_password"
								object={loginObject}
								setObject={setLoginObject}
								type={passwordDisplay ? "text" : "password"}
							/>
							<Button_display_toggle display={passwordDisplay} setDisplay={setPasswordDisplay} />
						</div>
						{isLoginFailed ? (
							<div className="flex justify-start w-full mb-4">
								<h1 className="text-lg font-semibold">
									<i className="text-error fa-solid fa-circle-exclamation me-2"></i>
									{t("invalid_credentials_message")}
								</h1>
							</div>
						) : null}
						<Button
							label={t("submit_button_title")}
							type="submit"
							disabled={
								isLoggingIn ||
								loginObject.login_email == "" ||
								loginObject.login_password == ""
							}
						/>
					</div>
				</form>
			</div>
		</div>
	);
};

export default fade_transition(Login);
