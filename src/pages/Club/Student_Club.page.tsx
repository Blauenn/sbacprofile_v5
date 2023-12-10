import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ClubInterface, ClubMembershipInterface } from "../../interfaces/clubs.interface";
import fade_transition from "../../animations/fade_transition.transition";
// Contexts //
import { useContext_Account } from "../../contexts/Account.context";
import { useContext_Clubs } from "../../contexts/Clubs/Clubs.context";
import { useContext_Teachers } from "../../contexts/Profiles/Teachers/Teacher.context";
import { useContext_Students } from "../../contexts/Profiles/Students/Student.context";
// Components //
import Page_header_return from "../../components/Miscellaneous/common/Page_header_return.component";
import Student_Club_information from "../../components/Club/Student/Student_Club_information.component";
import Student_Club_noClub from "../../components/Club/Student/noClub/Student_Club_noClub.component";
import Skeleton_Student_Club_information from "../../components/Club/Student/Skeleton_Student_Club_information.component";

const Student_club = () => {
	const { userInfo } = useContext_Account();
	const { clubs, fetchClubs, clubManagers, fetchClubManagers, clubMemberships, fetchClubMemberships, clubJoinRequests, fetchClubJoinRequests, clubLeaveRequests, fetchClubLeaveRequests } =
		useContext_Clubs();
	const { students, fetchStudents } = useContext_Students();
	const { teachers, fetchTeachers } = useContext_Teachers();

	const [selfClub, setSelfClub] = useState<ClubInterface>();

	useEffect(() => {
		fetchClubs();
		fetchClubMemberships();
		fetchClubManagers();
		fetchClubJoinRequests();
		fetchClubLeaveRequests();

		fetchStudents();
		fetchTeachers();

		const clubMembershipSelf = clubMemberships.result.find((clubMembership: ClubMembershipInterface) => (
			clubMembership.club_membership_student_ID === userInfo.result.profile_ID
		));

		if (clubMembershipSelf) {
			const clubSelfInformation = clubs.result.find((club: ClubInterface) => club.club_ID === clubMembershipSelf.club_membership_club_ID);
			setSelfClub(clubSelfInformation);
		}
	}, [clubs, clubManagers, clubMemberships, clubLeaveRequests, students, teachers]);

	const { t } = useTranslation("page_student_club");

	return (
		<>
			<Page_header_return text={t("header")} />

			{clubs.status && clubManagers.status && clubMemberships.status && clubJoinRequests.status && clubLeaveRequests.status ? (
				selfClub ? (
					<Student_Club_information selfClub={selfClub} />
				) : (
					<Student_Club_noClub />
				)
			) : (
				<Skeleton_Student_Club_information />
			)}
		</>
	);
};

export default fade_transition(Student_club);
