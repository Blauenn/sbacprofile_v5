import { useEffect, useState } from "react";
import i18n from "../../../i18n";
import { StudentInterface } from "../../../interfaces/profiles.interface";
import fade_transition from "../../../animations/fade_transition.transition";
// Contexts //
import { useContext_Classrooms } from "../../../contexts/Classroom.context";
// Components //
import Loading from "../../Miscellaneous/Loading.component";
import Rolodex_card from "../rolodex/card/Rolodex_card.component";
import NoResults from "../../Miscellaneous/No_results.component";
// Constants //
import {
	major_name_thai,
	major_name_german,
	major_name,
} from "../../../constants/names/major_name";

interface CurrentComponentProp {
	students: StudentInterface[];
}

const Student_rolodex = (props: CurrentComponentProp) => {
	const { students } = props;

	const { fetchClassrooms } = useContext_Classrooms();

	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		fetchClassrooms();

		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 3000);

		return () => clearTimeout(timer);
	}, []);

	const sortedStudents = students.sort(
		(a: StudentInterface, b: StudentInterface) => {
			if (a.student_major !== b.student_major) {
				return a.student_major - b.student_major; // Sort by major //
			} else if (a.student_level !== b.student_level) {
				return a.student_level - b.student_level; // Sort by level //
			} else if (a.student_class !== b.student_class) {
				return a.student_class - b.student_class; // Sort by class //
			} else {
				return a.student_ID - b.student_ID; // Sort by ID //
			}
		}
	);

	if (sortedStudents?.length > 0) {
		const sortedStudentsByMajor: { [major: string]: StudentInterface[]; } = {};

		// Group by major //
		sortedStudents.forEach((student: StudentInterface) => {
			const { student_major } = student;
			if (!sortedStudentsByMajor[student_major]) {
				sortedStudentsByMajor[student_major] = [];
			}
			sortedStudentsByMajor[student_major].push(student);
		});

		return (
			<div className="flex flex-col gap-14">
				{Object.entries(sortedStudentsByMajor).map(([major, students]) => (
					<div key={major} className="flex flex-col gap-6">
						<h1 className="text-xl lg:text-2xl | font-semibold xl:mx-16">
							{i18n.language === "th"
								? major_name_thai[parseInt(major)]
								: i18n.language === "de"
									? major_name_german[parseInt(major)]
									: major_name[parseInt(major)]}
						</h1>
						<div className="grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 lg:grid-cols-4 xl:mx-16 2xl:grid-cols-6">
							{students.map((student: StudentInterface) => (
								<Rolodex_card
									key={student.primary_student_ID}
									profile="student"
									object={student}
								/>
							))}
						</div>
					</div>
				))}
			</div>
		);
	} else {
		return <>{isLoading ? <Loading /> : <NoResults />}</>;
	}
};

export default fade_transition(Student_rolodex);
