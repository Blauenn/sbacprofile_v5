// Components //
import Settings_content_preferences_language from "./preferences/Settings_content_preferences_language.component";

const Settings_content_preferences = () => {
	return (
		<div className="grid grid-cols-1 gap-4 mt-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{/* Language */}
			<Settings_content_preferences_language />
		</div>
	);
};

export default Settings_content_preferences;
