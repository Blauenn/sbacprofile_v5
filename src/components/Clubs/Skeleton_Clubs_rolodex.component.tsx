import fade_transition from "../../animations/fade_transition.transition";
// Components //
import Skeleton_Clubs_rolodex_card from "./card/Skeleton_Clubs_rolodex_card.component";

const Skeleton_Clubs_rolodex = () => {
	return (
		<div className="grid-cols-1 min-[420px]:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 xl:mx-16 | grid gap-4">
			{[...Array(6)].map((_, index) => (
				<Skeleton_Clubs_rolodex_card key={index} />
			))}
		</div>
	);
};

export default fade_transition(Skeleton_Clubs_rolodex);