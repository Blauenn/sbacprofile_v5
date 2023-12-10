import { ClubInterface } from "../../interfaces/clubs.interface";
import fade_transition from "../../animations/fade_transition.transition";
// Components //
import Clubs_rolodex_card from "./card/Clubs_rolodex_card.component";
import { useState, useEffect } from "react";
import Loading from "../Miscellaneous/Loading.component";
import No_results from "../Miscellaneous/No_results.component";

interface CurrentComponentProp {
	clubs: ClubInterface[];
}

const Clubs_rolodex = (props: CurrentComponentProp) => {
	const { clubs } = props;

	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 3000);

		return () => clearTimeout(timer);
	}, []);

	if (clubs.length > 0) {
		return (
			<div className="grid-cols-1 min-[420px]:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 xl:mx-16 | grid gap-4">
				{clubs.map((club: ClubInterface) => (
					<Clubs_rolodex_card key={club.club_ID} club={club} />
				))}
			</div>
		);
	} else {
		return <>{isLoading ? <Loading /> : <No_results />}</>;
	}
};

export default fade_transition(Clubs_rolodex);