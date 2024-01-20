import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ClubInterface, ClubManagerInterface, ClubMembershipInterface } from "../../../interfaces/clubs.interface";
import fade_transition from "../../../animations/fade_transition.transition";
// Contexts //
import { useContext_Clubs } from "../../../contexts/Clubs/Clubs.context";
// Components //
import Club_clubName from "../Club_clubName.component";
import Club_information_teachers from "../Club_information_teachers.component";
import Club_information_members from "../Club_information_members.component";
import Student_Club_information_leaveRequests from "./Student_Club_information_leaveRequests.component";
// Constants //
import { club_information_card_style } from "../../../constants/styles/club/club_information_card.constant";

interface CurrentComponentProp {
	selfClub: ClubInterface;
}

const Student_Club_information = (props: CurrentComponentProp) => {
	const { selfClub } = props;

	const { clubMemberships, clubManagers } = useContext_Clubs();

	const [selfClubManagers, setSelfClubManagers] = useState<ClubManagerInterface[]>([]);
	const [selfClubMembers, setSelfClubMembers] = useState<ClubMembershipInterface[]>([]);

	useEffect(() => {
		const clubManagersSelf: ClubManagerInterface[] = clubManagers.result.filter((clubManager: ClubManagerInterface) => clubManager.club_manager_club_ID === selfClub.club_ID);
		setSelfClubManagers(clubManagersSelf);

		const clubMembersSelf: ClubMembershipInterface[] = clubMemberships.result.filter((clubMembership: ClubMembershipInterface) => clubMembership.club_membership_club_ID === selfClub.club_ID);
		setSelfClubMembers(clubMembersSelf);
	}, []);

	const { t } = useTranslation("page_student_club");

	return (
		<div className="grid grid-cols-5 gap-4">
			{/* Club name */}
			<div className={`${club_information_card_style} md:col-span-3`}>
				<Club_clubName selfClub={selfClub} />
			</div>
			{/* Club teachers */}
			<div className={`${club_information_card_style} md:col-span-2`}>
				<Club_information_teachers
					clubTeachers={selfClubManagers}
					title={t("teachers_title")}
				/>
			</div>
			{/* Club members */}
			<div className={club_information_card_style}>
				<Club_information_members
					clubMembers={selfClubMembers}
					title={t("members_title")}
				/>
			</div>
			{/* Club leave request */}
			<div className={`${club_information_card_style} md:col-span-2`}>
				<Student_Club_information_leaveRequests
					selfClub={selfClub}
				/>
			</div>
		</div>
	);
};

export default fade_transition(Student_Club_information);
