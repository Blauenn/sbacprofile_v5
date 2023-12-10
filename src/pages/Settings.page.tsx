import { useState } from "react";
import { useTranslation } from "react-i18next";
import fade_transition from "../animations/fade_transition.transition";
// Components //
import Page_header from "../components/Miscellaneous/common/Page_header.component";
import Settings_tabs from "../components/Settings/tabs/Settings_tabs.component";
import Settings_content_preferences from "../components/Settings/content/Settings_content_preferences.component";
import Settings_content_account from "../components/Settings/content/Settings_content_account.component";

const Settings = () => {
	const [activeTab, setActiveTab] = useState(1);

	const { t } = useTranslation("page_settings");

	return (
		<>
			<Page_header icon="fa-solid fa-gear" text={t("header")} />

			<div className="flex flex-col">
				{/* Tabs */}
				<Settings_tabs activeTab={activeTab} setActiveTab={setActiveTab} />

				{/* Content */}
				<div hidden={activeTab !== 1}>
					<Settings_content_preferences />
				</div>

				<div hidden={activeTab !== 2}>
					<Settings_content_account />
				</div>
			</div>
		</>
	);
};

export default fade_transition(Settings);