import fade_transition from "../../../animations/fade_transition.transition";
// Components //
import Skeleton_Club_clubName from "../Skeleton_Club_clubName.component";
import Skeleton_Club_information_members from "../Skeleton_Club_information_members.component";
import Skeleton_Club_information_teachers from "../Skeleton_Club_information_teachers.component";
// Constants //
import { club_information_card_style } from "../../../constants/styles/club/club_information_card.constant";

const Skeleton_Student_Club_information = () => {
	return (
		<div className="grid grid-cols-5 gap-4">
			{/* Club name */}
			<div className={`${club_information_card_style} md:col-span-3`}>
				<Skeleton_Club_clubName />
			</div>
			{/* Club teachers */}
			<div className={`${club_information_card_style} md:col-span-2`}>
				<Skeleton_Club_information_teachers />
			</div>
			{/* Club members */}
			<div className={club_information_card_style}>
				<Skeleton_Club_information_members />
			</div>
		</div>
	);
};

export default fade_transition(Skeleton_Student_Club_information);