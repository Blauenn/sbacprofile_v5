import { useState } from "react";
import { useTranslation } from "react-i18next";
import TextField from "../../../Extended/TextField";
import Button_feedback from "../../../Extended/Button_feedback";
// Functions //
import { account_password_update } from "../../../../functions/account/change_password.function";
// Contexts //
import { useContext_Account } from "../../../../contexts/Account.context";

const Settings_content_account_password = () => {
	const { userInfo } = useContext_Account();

	const [isError, setIsError] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);

	const [settingsPassword, setSettingsPassword] = useState({
		current_password: "",
		new_password: "",
		confirm_password: "",
	});

	const { t } = useTranslation("page_settings");

	return (
		<div className="p-4 bg-white shadow-sm rounded-xl">
			<h1 className="mb-4 text-2xl font-semibold">
				<i className="fa-solid fa-lock me-4"></i>
				{t("account_password_title")}
			</h1>
			<h1 className="mb-8 opacity-50">
				{t("account_password_description")}
			</h1>
			{/* Current password */}
			<div className="mb-2">
				<TextField
					label={t("account_password_label_currentPassword")}
					name="current_password"
					object={settingsPassword}
					setObject={setSettingsPassword}
					value={settingsPassword.current_password}
					type="password"
				/>
			</div>
			{/* New password */}
			<div className="mt-8 mb-4">
				<TextField
					label={t("account_password_label_newPassword")}
					name="new_password"
					value={settingsPassword.new_password}
					object={settingsPassword}
					setObject={setSettingsPassword}
					type="password"
				/>
			</div>
			{/* Confirm password */}
			<div className="mb-4">
				<TextField
					label={t("account_password_label_confirmPassword")}
					name="confirm_password"
					object={settingsPassword}
					setObject={setSettingsPassword}
					value={settingsPassword.confirm_password}
					type="password"
				/>
			</div>
			{isError != "" ? (
				<div className="mt-4 mb-8">
					<h1 className="text-md">
						<i className="text-error fa-solid fa-circle-exclamation me-2"></i>
						{isError}
					</h1>
				</div>
			) : null}
			<div className="grid justify-end grid-cols-1">
				<Button_feedback
					label={t("account_password_button")}
					successLabel={"account_password_updateSuccess"}
					disabled={Object.values(settingsPassword).some(
						(value) => value === ""
					) || isSubmitting || isUpdateSuccess}
					icon={"fa-solid fa-lock hidden sm:inline-block"}
					isPending={isSubmitting}
					isSuccess={isUpdateSuccess}
					onClick={() => {
						account_password_update(
							userInfo.result.profile_email,
							settingsPassword,
							setIsSubmitting,
							setIsUpdateSuccess,
							setIsError,
							t
						);
					}}
				/>
			</div>
		</div>
	);
};

export default Settings_content_account_password;
