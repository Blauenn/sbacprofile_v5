import { useTranslation } from "react-i18next";
// Functions //
import { head_access_only, teacher_access_only } from "../../../functions/permission_check.function";
// Contexts //
import { useContext_Account } from "../../../contexts/Account.context";
// Components //
import Dashboard_button from "./Dashboard_button.component";
import Dashboard_quickAccess_buttons_admin from "./Dashboard_quickAccess_buttons/Dashboard_quickAccess_buttons_admin.component";
import Dashboard_quickAccess_buttons_head from "./Dashboard_quickAccess_buttons/Dashboard_quickAccess_buttons_head.component";
import Dashboard_quickAccess_buttons_studentsTeachers from "./Dashboard_quickAccess_buttons/Dashboard_quickAccess_buttons_studentsTeachers.component";
// Constants //
import { buttons_list_layout } from "../../../constants/styles/dashboard/quick_access_buttons_list.constant";

interface CurrentComponentProp {
	profile: string;
}

const Dashboard_quickAccess_button_list = (props: CurrentComponentProp) => {
	const { profile } = props;

	const { userInfo } = useContext_Account();

	const { t } = useTranslation("page_dashboard");

	return (
		<div>
			{/* Students or teachers */}
			{profile === "student" || profile === "teacher" ? (
				<div className="flex flex-col gap-8">
					{/* Head of department */}
					{head_access_only(userInfo.result.profile_position) ? (
						<Dashboard_quickAccess_buttons_head />
					) : null}

					<div className="flex flex-col gap-4">
						{teacher_access_only(userInfo.result.profile_position) ? (
							<h1 className="text-xl">
								<i className="fa-solid fa-graduation-cap me-4"></i>
								{t("header_homeroomStudents")}
							</h1>
						) : null}
						<Dashboard_quickAccess_buttons_studentsTeachers />
					</div>
					{/* Miscellaneous */}
					<div className="flex flex-col gap-4">
						<h1 className="text-xl">
							<i className="fa-solid fa-thumbtack me-4"></i>
							{t("header_others")}
						</h1>
						<div className={buttons_list_layout}>
							<Dashboard_button
								url="/club"
								color="text-success"
								icon="fa-solid fa-puzzle-piece"
								title={t("button_title_club")}
								description={t(
									"button_description_club"
								)}
							/>
						</div>
					</div>
				</div>
			) : null}
			{/* Administrator */}
			{profile === "admin" ? <Dashboard_quickAccess_buttons_admin /> : null}
		</div>
	);
};

export default Dashboard_quickAccess_button_list;
