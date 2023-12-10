import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ClubInterface } from "../interfaces/clubs.interface";
import fade_transition from "../animations/fade_transition.transition";
// Context providers //
import { MajorContextProvider } from "../contexts/Major.context";
// Contexts //
import { useContext_Clubs } from "../contexts/Clubs/Clubs.context";
import { useContext_Students } from "../contexts/Profiles/Students/Student.context";
import { useContext_Teachers } from "../contexts/Profiles/Teachers/Teacher.context";
import { useContext_Clubs_filters } from "../contexts/Clubs/Club_filters.context";
// Components //
import Page_header from "../components/Miscellaneous/common/Page_header.component";
import Clubs_rolodex from "../components/Clubs/Clubs_rolodex.component";
import Skeleton_Clubs_rolodex from "../components/Clubs/Skeleton_Clubs_rolodex.component";
import Clubs_filters from "../components/Clubs/filters/Clubs_filters.component";

const Clubs = () => {
	const { clubs, fetchClubs, clubManagers, fetchClubManagers, clubMemberships, fetchClubMemberships, } = useContext_Clubs();
	const { students, fetchStudents } = useContext_Students();
	const { teachers, fetchTeachers } = useContext_Teachers();
	const { filters } = useContext_Clubs_filters();

	const filteredClubs = clubs.result.filter((club: ClubInterface) => {
		const majorCondition = +filters.selected_major == 0 || club.club_major == +filters.selected_major;

		const searchWords = filters.search_field.toLowerCase().split(" ");
		const searchCondition = searchWords.every(word =>
			(club.club_name.toLowerCase().includes(word))
		);

		return majorCondition && searchCondition;
	});

	useEffect(() => {
		fetchClubs();
		fetchClubManagers();
		fetchClubMemberships();

		fetchStudents();
		fetchTeachers();
	}, [clubs, clubManagers, clubMemberships, students, teachers]);

	const { t } = useTranslation("page_clubs");

	return (
		<>
			<Page_header
				icon="fa-solid fa-puzzle-piece"
				text={t("header")}
			/>

			<div className="flex flex-col gap-8">
				<MajorContextProvider>
					<Clubs_filters />
				</MajorContextProvider>

				{clubs.status && clubManagers.status && clubMemberships.status ? (
					<Clubs_rolodex clubs={filteredClubs} />
				) : (
					<Skeleton_Clubs_rolodex />
				)}
			</div>
		</>
	);
};

export default fade_transition(Clubs);