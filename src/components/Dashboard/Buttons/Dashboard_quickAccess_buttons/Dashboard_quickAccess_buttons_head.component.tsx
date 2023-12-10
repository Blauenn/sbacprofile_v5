import { useTranslation } from "react-i18next";
// Contexts //
import { useContext_Account } from "../../../../contexts/Account.context";
// Components //
import Dashboard_button from "../Dashboard_button.component";
// Constants //
import { buttons_list_layout } from "../../../../constants/styles/dashboard/quick_access_buttons_list.constant";
import { major_name } from "../../../../constants/names/major_name";

const Dashboard_quickAccess_buttons_head = () => {
	const { userInfo } = useContext_Account();

	const { t } = useTranslation("page_dashboard");

	return (
		<div className="flex flex-col gap-4">
			<h1 className="text-xl">
				<i className="fa-solid fa-users me-4"></i>
				{major_name[userInfo.result.profile_major]}
			</h1>
			<div className={buttons_list_layout}>
				<Dashboard_button
					url="/majors/students"
					color="text-purple-500"
					icon="fa-solid fa-graduation-cap"
					title={t("button_title_students")}
					description={t("head_button_description_students")}
				/>
				{/* Teachers */}
				<Dashboard_button
					url="/majors/teachers"
					color="text-pink-500"
					icon="fa-solid fa-chalkboard-user"
					title={t("button_title_teachers")}
					description={t("head_button_description_teachers")}
				/>
				{/* Clubs */}
				<Dashboard_button
					url="/majors/clubs"
					color="text-success"
					icon="fa-solid fa-puzzle-piece"
					title={t("button_title_clubs")}
					description={t("head_button_description_clubs")}
				/>
				{/* Leave notices */}
				<Dashboard_button
					url="/majors/leaveNotices"
					color="text-error"
					icon="fa-solid fa-flag"
					title={t("button_title_leaveNotices")}
					description={t(
						"head_button_description_leaveNotices"
					)}
				/>
			</div>
		</div>
	);
};

export default Dashboard_quickAccess_buttons_head;
