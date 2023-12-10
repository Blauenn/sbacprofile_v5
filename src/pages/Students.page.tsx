import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { StudentInterface } from "../interfaces/profiles.interface";
import fade_transition from "../animations/fade_transition.transition";
// Functions //
import { has_number } from "../functions/string.function";
// Contexts providers //
import { MajorContextProvider } from "../contexts/Major.context";
import { ClassroomContextProvider } from "../contexts/Classroom.context";
import { useContext_Students_filters } from "../contexts/Profiles/Students/Student_filters.context";
// Contexts //
import { useContext_Students } from "../contexts/Profiles/Students/Student.context";
// Components //
import Page_header from "../components/Miscellaneous/common/Page_header.component";
import Students_rolodex from "../components/Profiles/Students/Students_rolodex.component";
import Students_filters from "../components/Profiles/Students/filters/Students_filters.component";
import Skeleton_Profiles_Rolodex from "../components/Profiles/rolodex/Skeleton_Profiles_Rolodex.component";

const Students = () => {
	const { students, studentCount, fetchStudents } = useContext_Students();
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

	const { t } = useTranslation("page_students");

	return (
		<>
			<Page_header
				icon="fa-solid fa-graduation-cap"
				text={t("header")}
				subtext={studentCount}
			/>

			<ClassroomContextProvider>
				<div className="flex flex-col gap-8">
					<MajorContextProvider>
						<Students_filters />
					</MajorContextProvider>

					{students.status ? (
						<Students_rolodex students={filteredStudents} />
					) : (
						<Skeleton_Profiles_Rolodex />
					)}
				</div>
			</ClassroomContextProvider>
		</>
	);
};

export default fade_transition(Students);
