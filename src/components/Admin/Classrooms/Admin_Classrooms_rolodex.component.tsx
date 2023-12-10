import fade_transition from "../../../animations/fade_transition.transition";
import { ClassroomInterface } from "../../../interfaces/common.interface";
// Components //
import Admin_Classrooms_rolodex_card from "./card/Admin_Classrooms_rolodex_card.component";

interface CurrentComponentProp {
	classrooms: ClassroomInterface[];
}

const Admin_Classrooms_rolodex = (props: CurrentComponentProp) => {
	const { classrooms } = props;

	return (
		<div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{classrooms.map((classroom: ClassroomInterface) => (
				<Admin_Classrooms_rolodex_card key={classroom.classroom_ID} classroom={classroom} />
			))}
		</div>
	);
};

export default fade_transition(Admin_Classrooms_rolodex);