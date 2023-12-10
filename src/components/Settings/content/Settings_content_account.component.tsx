// Components //
import Settings_content_account_password from "./account/Settings_content_account_password.component";

const Settings_content_account = () => {
	return (
		<div className="grid grid-cols-1 gap-4 mt-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{/* Password */}
			<Settings_content_account_password />
		</div>
	);
};

export default Settings_content_account;
