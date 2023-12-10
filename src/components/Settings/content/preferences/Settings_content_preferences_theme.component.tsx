import { useTranslation } from "react-i18next";
import SelectField from "../../../Extended/SelectField";

const Settings_content_preferences_theme = () => {
	const { t } = useTranslation("page_settings");

	return (
		<div className="p-4 bg-white shadow-sm rounded-xl">
			<h1 className="mb-4 text-2xl font-semibold">
				<i className="fa-solid fa-brush me-4"></i>
				{t("preferences_theme_title")}
			</h1>
			<h1 className="mb-8 opacity-50">
				{t("preferences_theme_description")}
			</h1>
			<SelectField
				label={t("preferences_theme_title")}
				name="settings_theme">
				<option value="1">{t("preferences_theme_option1")}</option>
				<option value="2">{t("preferences_theme_option2")}</option>
			</SelectField>
		</div>
	);
};

export default Settings_content_preferences_theme;
