import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from "../../components/Extended/Button";
import { TeacherInterface } from '../../interfaces/profiles.interface';
import fade_transition from '../../animations/fade_transition.transition';
// Functions //
import { has_number } from "../../functions/string.function";
// Context providers //
import { MajorContextProvider } from "../../contexts/Major.context";
// Contexts //
import { useContext_Account } from "../../contexts/Account.context";
import { useContext_Teachers } from '../../contexts/Profiles/Teachers/Teacher.context';
import { useContext_Teachers_filters } from "../../contexts/Profiles/Teachers/Teacher_filters.context";
// Components //
import Page_header_return from "../../components/Miscellaneous/common/Page_header_return.component";
import Admin_Teachers_rolodex from "../../components/Admin/Profiles/Teachers/Admin_Teachers_rolodex.component";
import Skeleton_Admin_Profiles_rolodex from "../../components/Admin/Profiles/Skeleton_Admin_Profiles_rolodex.component";
import Admin_Teachers_modal_create from "../../components/Admin/Profiles/Teachers/modal/Admin_Teachers_modal_create.component";
import Teachers_filters from "../../components/Profiles/Teachers/filters/Teachers_filters.component";

const Head_Teachers = () => {
	const { userInfo } = useContext_Account();
	const { teachers, fetchTeachers } = useContext_Teachers();
	const { filters } = useContext_Teachers_filters();

	const [majorTeachers, setMajorTeachers] = useState<TeacherInterface[]>([]);

	useEffect(() => {
		fetchTeachers();

		const teachersInMajor = teachers.result.filter((teacher: TeacherInterface) => teacher.teacher_major === userInfo.result.profile_major);
		setMajorTeachers(teachersInMajor);
	}, [teachers]);

	const filteredTeachers = majorTeachers.filter((teacher: TeacherInterface) => {
		const majorCondition = +filters.selected_major == 0 || teacher.teacher_major == +filters.selected_major;

		const searchWords = filters.search_field.toLowerCase().split(" ");
		const searchCondition = has_number(filters.search_field)
			? teacher.teacher_ID.toString().includes(filters.search_field)
			: searchWords.every(word =>
			(teacher.teacher_first_name.toLowerCase().includes(word) ||
				teacher.teacher_last_name.toLowerCase().includes(word))
			);

		return majorCondition && searchCondition;
	});

	const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
	const onCreateModalClose = () => {
		setCreateModalOpen(false);
	};

	const { t } = useTranslation("page_head_teachers");

	return (
		<>
			<Page_header_return text={t("header")} />

			<div className="flex flex-col gap-8">
				<div>
					<Button label={t("create_button_title")} icon="fa-solid fa-chalkboard-user" onClick={() => { setCreateModalOpen(true); }} />
				</div>

				<MajorContextProvider>
					<Admin_Teachers_modal_create open={createModalOpen} onModalClose={onCreateModalClose} />
					<Teachers_filters hide_major />
				</MajorContextProvider>

				{teachers.status ? (
					<Admin_Teachers_rolodex teachers={filteredTeachers} />
				) : (
					<Skeleton_Admin_Profiles_rolodex />
				)}
			</div>
		</>
	);
};

export default fade_transition(Head_Teachers);