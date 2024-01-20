import { useState, useEffect } from "react";
import { ClubInterface, ClubManagerInterface, ClubMembershipInterface } from "../../../interfaces/clubs.interface";
// Functions //
import { teacher_image_from_ID, teacher_major_from_ID } from "../../../functions/information/teachers.function";
import { student_image_from_ID, student_major_from_ID } from "../../../functions/information/students.function";
// Contexts //
import { useContext_Clubs } from "../../../contexts/Clubs/Clubs.context";
import { useContext_Teachers } from "../../../contexts/Profiles/Teachers/Teacher.context";
import { useContext_Students } from "../../../contexts/Profiles/Students/Student.context";
// Components //
import Small_avatar from "../../Extended/Avatar";
import Clubs_rolodex_modal from "../modal/Clubs_rolodex_modal.component";
// Constants //
import { text_color_from_major } from "../../../constants/styles/colors/color_from_major.constant";
import { hover_transition } from "../../../constants/styles/transition.style";
import { CDN_ENDPOINT } from "../../../constants/ENDPOINTS";

interface CurrentComponentProp {
	club: ClubInterface;
}

const Clubs_rolodex_card = (props: CurrentComponentProp) => {
	const { club } = props;

	const { clubManagers, clubMemberships } = useContext_Clubs();
	const { students } = useContext_Students();
	const { teachers } = useContext_Teachers();

	const [currentClubTeachers, setCurrentClubTeachers] = useState<ClubManagerInterface[]>(
		[]
	);
	const [currentClubMembers, setCurrentClubMembers] = useState<
		ClubMembershipInterface[]
	>([]);

	useEffect(() => {
		const currentClubManagers = clubManagers.result.filter(
			(clubManger: ClubManagerInterface) =>
				clubManger.club_manager_club_ID === club.club_ID
		);
		setCurrentClubTeachers(currentClubManagers);

		const currentClubMemberships = clubMemberships.result.filter(
			(clubMembership: ClubMembershipInterface) =>
				clubMembership.club_membership_club_ID === club.club_ID
		);
		setCurrentClubMembers(currentClubMemberships);
	}, [clubMemberships, clubManagers]);

	const [modalOpen, setModalOpen] = useState(false);
	const onModalClose = () => {
		setModalOpen(false);
	};

	return (
		<>
			<div
				className={`bg-white border rounded-xl overflow-hidden ${hover_transition} hover:bg-slate-200 cursor-pointer`}
				onClick={() => setModalOpen(true)}>
				{/* Club image */}
				{club.club_image !== "" &&
					club.club_image !== "/assets/profilePic/clubs/" ? (
					<img
						src={`${CDN_ENDPOINT}${club.club_image}`}
						className="h-[200px] w-full"
					/>
				) : null}
				<div className="flex flex-col gap-4 px-4 py-6">
					{/* Club name */}
					<h1
						className={`text-xl font-semibold ${text_color_from_major[club.club_major]
							}`}>
						{club.club_name}
					</h1>
					<div className="flex flex-row gap-4">
						<div className="flex -space-x-4">
							{currentClubTeachers.map((clubManager: ClubManagerInterface) => (
								<Small_avatar
									key={clubManager.club_manager_ID}
									imageURL={teacher_image_from_ID(
										clubManager.club_manager_teacher_ID,
										teachers.result
									)}
									profileMajor={teacher_major_from_ID(
										clubManager.club_manager_teacher_ID,
										teachers.result
									)}
								/>
							))}
						</div>
						<div className="flex -space-x-4">
							{currentClubMembers.map((clubMembership: ClubMembershipInterface) => (
								<Small_avatar
									key={clubMembership.club_membership_ID}
									imageURL={student_image_from_ID(
										clubMembership.club_membership_student_ID,
										students.result
									)}
									profileMajor={student_major_from_ID(
										clubMembership.club_membership_student_ID,
										students.result
									)}
								/>
							))}
						</div>
					</div>
				</div>
			</div>
			<Clubs_rolodex_modal
				club={club}
				currentClubMembers={currentClubMembers}
				currentClubTeachers={currentClubTeachers}
				open={modalOpen}
				onModalClose={onModalClose}
			/>
		</>
	);
};

export default Clubs_rolodex_card;
