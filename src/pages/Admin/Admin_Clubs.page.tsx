import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "../../components/Extended/Button";
import { ClubInterface } from "../../interfaces/clubs.interface";
import fade_transition from "../../animations/fade_transition.transition";
// Context providers //
import { MajorContextProvider } from "../../contexts/Major.context";
// Contexts //
import { useContext_Clubs } from "../../contexts/Clubs/Clubs.context";
import { useContext_Teachers } from "../../contexts/Profiles/Teachers/Teacher.context";
import { useContext_Clubs_filters } from "../../contexts/Clubs/Club_filters.context";
// Components //
import Page_header_return from "../../components/Miscellaneous/common/Page_header_return.component";
import Admin_Clubs_rolodex from "../../components/Admin/Clubs/Admin_Clubs_rolodex.component";
import Skeleton_Admin_Clubs_rolodex from "../../components/Admin/Clubs/Skeleton_Admin_Clubs_rolodex.component";
import Admin_Clubs_modal_create from "../../components/Admin/Clubs/modal/Admin_Clubs_modal_create.component";
import Clubs_filters from "../../components/Clubs/filters/Clubs_filters.component";

const Admin_Clubs = () => {
	const { clubs, fetchClubs, fetchClubMemberships, fetchClubManagers } = useContext_Clubs();
	const { fetchTeachers } = useContext_Teachers();
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
		fetchClubMemberships();
		fetchClubManagers();

		fetchTeachers();
	}, [clubs]);

	const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
	const onCreateModalClose = () => {
		setCreateModalOpen(false);
	};

	const { t } = useTranslation("page_admin_clubs");

	return (
		<>
			<Page_header_return text={t("header")} />

			<div className="flex flex-col gap-8">
				<div>
					<Button label={t("create_button_title")} icon="fa-solid fa-puzzle-piece" onClick={() => { setCreateModalOpen(true); }} />
				</div>

				<MajorContextProvider>
					<Admin_Clubs_modal_create open={createModalOpen} onModalClose={onCreateModalClose} />
					<Clubs_filters />
				</MajorContextProvider>

				{clubs.status ? (
					<Admin_Clubs_rolodex clubs={filteredClubs} />
				) : (
					<Skeleton_Admin_Clubs_rolodex />
				)}
			</div>

		</>
	);
};

export default fade_transition(Admin_Clubs);