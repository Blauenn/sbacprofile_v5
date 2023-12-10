import { useTranslation } from "react-i18next";
import Dashboard_button from "../Dashboard_button.component";
import { buttons_list_layout } from "../../../../constants/styles/dashboard/quick_access_buttons_list.constant";

const Dashboard_quickAccess_buttons_studentsTeachers = () => {
	const { t } = useTranslation("page_dashboard");

	return (
		<div className={buttons_list_layout}>
			{/* Leave notices */}
			<Dashboard_button
				url="/leaveNotices"
				color="text-error"
				icon="fa-solid fa-flag"
				title={t("button_title_leaveNotices")}
				description={t("button_description_leaveNotices")}
			/>
		</div>
	);
};

export default Dashboard_quickAccess_buttons_studentsTeachers;
