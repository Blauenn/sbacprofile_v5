import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "../../components/Extended/Button";
import { StudentInterface } from "../../interfaces/profiles.interface";
import fade_transition from "../../animations/fade_transition.transition";
// Functions //
import { has_number } from "../../functions/string.function";
// Context providers //
import { MajorContextProvider } from "../../contexts/Major.context";
import { ClassroomContextProvider } from "../../contexts/Classroom.context";
// Contexts //
import { useContext_Students } from "../../contexts/Profiles/Students/Student.context";
import { useContext_Students_filters } from "../../contexts/Profiles/Students/Student_filters.context";
// Components //
import Page_header_return from "../../components/Miscellaneous/common/Page_header_return.component";
import Admin_Students_rolodex from "../../components/Admin/Profiles/Students/Admin_Students_rolodex.component";
import Skeleton_Admin_Profiles_rolodex from "../../components/Admin/Profiles/Skeleton_Admin_Profiles_rolodex.component";
import Students_filters from "../../components/Profiles/Students/filters/Students_filters.component";
import Admin_Students_modal_create from "../../components/Admin/Profiles/Students/modal/Admin_Students_modal_create.component";

const Admin_Students = () => {
	const { students, fetchStudents } = useContext_Students();
	const { filters } = useContext_Students_filters();

	const filteredStudents = students.result.filter((student: StudentInterface) => {
		const majorCondition = +filters.selected_major == 0 || student.student_major == +filters.selected_major;
		const levelCondition = +filters.selected_level == 0 || student.student_level == +filters.selected_level;
		const classCondition = +filters.selected_class == 0 || student.student_class == +filters.selected_class;

		const searchWords = filters.search_field.toLowerCase().split(" ");
		const searchCondition = has_number(filters.search_field)
			? student.student_ID.toString().includes(filters.search_field)
			: searchWords.every(word =>
			(student.student_first_name.toLowerCase().includes(word) ||
				student.student_last_name.toLowerCase().includes(word))
			);

		return majorCondition && levelCondition && classCondition && searchCondition;
	});

	useEffect(() => {
		fetchStudents();
	}, [students]);

	const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
	const onCreateModalClose = () => {
		setCreateModalOpen(false);
	};

	const { t } = useTranslation("page_admin_students");

	return (
		<>
			<Page_header_return text={t("header")} />

			<div className="flex flex-col gap-8">
				<div>
					<Button label={t("create_button_title")} icon="fa-solid fa-graduation-cap" onClick={() => { setCreateModalOpen(true); }} />
				</div>
				
				<MajorContextProvider>
					<Admin_Students_modal_create open={createModalOpen} onModalClose={onCreateModalClose} />
					<ClassroomContextProvider>
						<Students_filters />
					</ClassroomContextProvider>
				</MajorContextProvider>

				{students.status ? (
					<Admin_Students_rolodex students={filteredStudents} />
				) : (
					<Skeleton_Admin_Profiles_rolodex />
				)}
			</div>
		</>
	);
};

export default fade_transition(Admin_Students);