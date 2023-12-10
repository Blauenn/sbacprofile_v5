import { useEffect, useState } from "react";
import { ClubInterface, ClubMembershipInterface } from "../../../../interfaces/clubs.interface";
// Contexts providers //
import { MajorContextProvider } from "../../../../contexts/Major.context";
// Contexts //
import { useContext_Clubs } from "../../../../contexts/Clubs/Clubs.context";
// Components //
import Admin_Clubs_modal_update from "../modal/Admin_Clubs_modal_update.component";
// Constants //
import { text_color_from_major } from "../../../../constants/styles/colors/color_from_major.constant";
import { hover_transition } from "../../../../constants/styles/transition.style";

interface CurrentComponentProp {
	club: ClubInterface;
}

const Admin_Clubs_rolodex_card = (props: CurrentComponentProp) => {
	const { club } = props;

	const { clubMemberships } = useContext_Clubs();

	const [currentClubMemberCount, setCurrentClubMemberCount] = useState<number>(0);

	useEffect(() => {
		const currentClubMemberships = [...clubMemberships.result].filter((clubMembership: ClubMembershipInterface) => clubMembership.club_membership_club_ID === club.club_ID).length;

		setCurrentClubMemberCount(currentClubMemberships);
	}, []);

	const [updateModalOpen, setUpdateModalOpen] = useState<boolean>(false);
	const onUpdateModalClose = () => {
		setUpdateModalOpen(false);
	};

	return (
		<>
			<div className={`bg-white rounded-xl hover:bg-slate-200 cursor-pointer ${hover_transition}`}
				onClick={() => { setUpdateModalOpen(true); }}>
				<div className="flex flex-col px-4 py-2">
					<h1 className={`text-xl font-semibold ${text_color_from_major[club.club_major]}`}>{club.club_name}</h1>
					<h1 className="opacity-50 text-md">{currentClubMemberCount ? `${currentClubMemberCount} members` : "No members"}</h1>
				</div>
			</div>
			<MajorContextProvider>
				<Admin_Clubs_modal_update club={club} open={updateModalOpen} onModalClose={onUpdateModalClose} />
			</MajorContextProvider>
		</>
	);
};

export default Admin_Clubs_rolodex_card;