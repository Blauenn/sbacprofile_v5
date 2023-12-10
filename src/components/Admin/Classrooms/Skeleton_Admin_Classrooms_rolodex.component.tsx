import fade_transition from "../../../animations/fade_transition.transition";
// Components //
import Skeleton_Admin_Classrooms_rolodex_card from "./card/Skeleton_Admin_Classrooms_rolodex_card.component";

const Skeleton_Admin_Classrooms_rolodex = () => {
	return (
		<div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{[...Array(20)].map((_, index) => (
				<Skeleton_Admin_Classrooms_rolodex_card key={index} />
			))}
		</div>
	);
};

export default fade_transition(Skeleton_Admin_Classrooms_rolodex);