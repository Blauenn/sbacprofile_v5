import { useEffect } from 'react';
import { useTranslation } from "react-i18next";
import fade_transition from "../../animations/fade_transition.transition";
// Contexts //
import { useContext_Classrooms } from "../../contexts/Classroom.context";
// Components //
import Page_header_return from "../../components/Miscellaneous/common/Page_header_return.component";
import Admin_Classrooms_rolodex from "../../components/Admin/Classrooms/Admin_Classrooms_rolodex.component";
import Skeleton_Admin_Classrooms_rolodex from "../../components/Admin/Classrooms/Skeleton_Admin_Classrooms_rolodex.component";

const Admin_Classrooms = () => {
	const { classrooms, fetchClassrooms } = useContext_Classrooms();

	useEffect(() => {
		fetchClassrooms();
	}, [classrooms]);

	const { t } = useTranslation("page_admin_classrooms");

	return (
		<>
			<Page_header_return text={t("header")} />

			{classrooms.status ? (
				<Admin_Classrooms_rolodex classrooms={classrooms.result} />
			) : (
				<Skeleton_Admin_Classrooms_rolodex />
			)}
		</>
	);
};

export default fade_transition(Admin_Classrooms);