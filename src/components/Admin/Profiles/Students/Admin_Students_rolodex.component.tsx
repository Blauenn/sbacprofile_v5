import { StudentInterface } from "../../../../interfaces/profiles.interface";
import fade_transition from "../../../../animations/fade_transition.transition";
// Components //
import Admin_Students_rolodex_card from "./card/Admin_Students_rolodex_card.component";
import No_results from "../../../Miscellaneous/No_results.component";

interface CurrentComponentProp {
	students: StudentInterface[];
}

const Admin_Students_rolodex = (props: CurrentComponentProp) => {
	const { students } = props;

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

	return (
		<div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{sortedStudents.length > 0 ? (
				sortedStudents.map((student: StudentInterface) => (
					<Admin_Students_rolodex_card key={student.primary_student_ID} student={student} />
				))
			) : (
				<No_results />
			)}
		</div>
	);
};

export default fade_transition(Admin_Students_rolodex);