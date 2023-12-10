import { useTranslation } from "react-i18next";
// Components //
import Settings_tab from "./Settings_tab.component";

interface CurrentComponentProp {
	activeTab: number;
	setActiveTab: any;
}

const Settings_tabs = (props: CurrentComponentProp) => {
	const { activeTab, setActiveTab } = props;

	const { t } = useTranslation("page_settings");

	return (
		<div className="flex flex-row w-full">
			{/* General */}
			<Settings_tab
				tabIndex={1}
				icon="fa-solid fa-wrench"
				text={t("tab_preferences")}
				activeTab={activeTab}
				setActiveTab={setActiveTab}
			/>
			{/* Account */}
			<Settings_tab
				tabIndex={2}
				icon="fa-solid fa-lock"
				text={t("tab_account")}
				activeTab={activeTab}
				setActiveTab={setActiveTab}
			/>
		</div>
	);
};

export default Settings_tabs;
