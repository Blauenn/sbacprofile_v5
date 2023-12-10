import { useTranslation } from "react-i18next";
// Components //
import Dashboard_button from "../Dashboard_button.component";
// Constants //
import { buttons_list_layout } from "../../../../constants/styles/dashboard/quick_access_buttons_list.constant";

const Dashboard_quickAccess_buttons_admin = () => {
	const { t } = useTranslation("page_dashboard");

	return (
		<div className={buttons_list_layout}>
			{/* Classrooms */}
			<Dashboard_button
				url="/admin/classrooms"
				color="text-teal-500"
				icon="fa-solid fa-school"
				title={t("button_title_classrooms")}
				description={t("admin_button_description_classrooms")}
			/>
			{/* Students */}
			<Dashboard_button
				url="/admin/students"
				color="text-purple-500"
				icon="fa-solid fa-graduation-cap"
				title={t("button_title_students")}
				description={t("admin_button_description_students")}
			/>
			{/* Teachers */}
			<Dashboard_button
				url="/admin/teachers"
				color="text-pink-500"
				icon="fa-solid fa-chalkboard-user"
				title={t("button_title_teachers")}
				description={t("admin_button_description_teachers")}
			/>
			{/* Clubs */}
			<Dashboard_button
				url="/admin/clubs"
				color="text-success"
				icon="fa-solid fa-puzzle-piece"
				title={t("button_title_clubs")}
				description={t("admin_button_description_clubs")}
			/>
			{/* Leave notices */}
			<Dashboard_button
				url="/admin/leaveNotices"
				color="text-error"
				icon="fa-solid fa-flag"
				title={t("button_title_leaveNotices")}
				description={t("admin_button_description_leaveNotices")}
			/>
		</div>
	);
};

export default Dashboard_quickAccess_buttons_admin;
