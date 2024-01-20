import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ClubInterface, ClubManagerInterface } from "../../interfaces/clubs.interface";
import fade_transition from "../../animations/fade_transition.transition";
// Contexts //
import { useContext_Account } from "../../contexts/Account.context";
import { useContext_Clubs } from "../../contexts/Clubs/Clubs.context";
import { useContext_Students } from "../../contexts/Profiles/Students/Student.context";
import { useContext_Teachers } from "../../contexts/Profiles/Teachers/Teacher.context";
// Components //
import Page_header_return from "../../components/Miscellaneous/common/Page_header_return.component";
import Teacher_Club_information from "../../components/Club/Teacher/Teacher_Club_information.component";
import Skeleton_Teacher_Club_information from "../../components/Club/Teacher/Skeleton_Teacher_Club_information.component";
import Teacher_Club_noClub from "../../components/Club/Teacher/noClub/Teacher_Club_noClub.component";

const Teacher_Club = () => {
	const { userInfo } = useContext_Account();
	const { clubs, fetchClubs, clubManagers, fetchClubManagers, clubMemberships, fetchClubMemberships, clubJoinRequests, fetchClubJoinRequests, clubLeaveRequests, fetchClubLeaveRequests } =
		useContext_Clubs();
	const { students, fetchStudents } = useContext_Students();
	const { teachers, fetchTeachers } = useContext_Teachers();

	const [selfClubs, setSelfClubs] = useState<ClubInterface[]>([]);

	useEffect(() => {
		fetchClubs();
		fetchClubMemberships();
		fetchClubManagers();
		fetchClubJoinRequests();
		fetchClubLeaveRequests();

		fetchStudents();
		fetchTeachers();

		const filteredClubManagers = clubManagers.result.filter(
			(clubManager: ClubManagerInterface) => clubManager.club_manager_teacher_ID === userInfo.result.profile_ID
		);

		if (filteredClubManagers.length > 0) {
			const clubSelfInformation = clubs.result.filter((club: ClubInterface) =>
				filteredClubManagers.some((clubManager: ClubManagerInterface) => club.club_ID === clubManager.club_manager_club_ID)
			);
			setSelfClubs(clubSelfInformation);
		}
	}, [clubs, clubManagers, clubMemberships, clubLeaveRequests, students, teachers]);

	const { t } = useTranslation("page_teacher_club");

	return (
		<>
			<Page_header_return text={t("header")} />

			{clubs.status && clubManagers.status && clubMemberships.status && clubJoinRequests.status && clubLeaveRequests.status ? (
				selfClubs ? (
					<div className="flex flex-col gap-16">
						{
							selfClubs.map((selfClub: ClubInterface) => (
								<Teacher_Club_information key={selfClub.club_ID} selfClub={selfClub} />
							))
						}
					</div>
				) : (
					<Teacher_Club_noClub />
				)
			) : (
				<Skeleton_Teacher_Club_information />
			)}
		</>
	);
};

export default fade_transition(Teacher_Club);