import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { TeacherInterface } from "../interfaces/profiles.interface";
import fade_transition from "../animations/fade_transition.transition";
// Functions //
import { has_number } from "../functions/string.function";
// Contexts providers //
import { MajorContextProvider } from "../contexts/Major.context";
import { ClassroomContextProvider } from "../contexts/Classroom.context";
// Contexts //
import { useContext_Teachers } from "../contexts/Profiles/Teachers/Teacher.context";
import { useContext_Teachers_filters } from "../contexts/Profiles/Teachers/Teacher_filters.context";
// Components //
import Page_header from "../components/Miscellaneous/common/Page_header.component";
import Teachers_filters from "../components/Profiles/Teachers/filters/Teachers_filters.component";
import Teachers_rolodex from "../components/Profiles/Teachers/Teachers_rolodex.component";
import Skeleton_Rolodex from "../components/Profiles/rolodex/Skeleton_Profiles_Rolodex.component";

const Teachers = () => {
	const { teachers, teacherCount, fetchTeachers } = useContext_Teachers();
	const { filters } = useContext_Teachers_filters();

	const filteredTeachers = teachers.result.filter((teacher: TeacherInterface) => {
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

	useEffect(() => {
		fetchTeachers();
	}, [teachers]);

	const { t } = useTranslation("page_teachers");

	return (
		<>
			<Page_header
				icon="fa-solid fa-chalkboard-user"
				text={t("header")}
				subtext={teacherCount}
			/>

			<div className="flex flex-col gap-8">
				<MajorContextProvider>
					<Teachers_filters />
				</MajorContextProvider>

				{teachers.status ? (
					<ClassroomContextProvider>
						<Teachers_rolodex teachers={filteredTeachers} />
					</ClassroomContextProvider>
				) : (
					<Skeleton_Rolodex />
				)}
			</div>
		</>
	);
};

export default fade_transition(Teachers);
