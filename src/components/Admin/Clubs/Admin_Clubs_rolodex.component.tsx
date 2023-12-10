import fade_transition from "../../../animations/fade_transition.transition";
import { ClubInterface } from "../../../interfaces/clubs.interface";
// Components //
import Admin_Clubs_rolodex_card from "./card/Admin_Clubs_rolodex_card.component";
import No_results from "../../Miscellaneous/No_results.component";

interface CurrentComponentProp {
	clubs: ClubInterface[];
}

const Admin_Clubs_rolodex = (props: CurrentComponentProp) => {
	const { clubs } = props;

	return (
		<div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{clubs.length > 0 ? (
				clubs.map((club: ClubInterface) => (
					<Admin_Clubs_rolodex_card key={club.club_ID} club={club} />
				))
			) : (
				<No_results />
			)}
		</div>
	);
};

export default fade_transition(Admin_Clubs_rolodex);