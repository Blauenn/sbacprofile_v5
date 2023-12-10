import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { CDN_ENDPOINT } from "../../../constants/ENDPOINTS";
import { text_color_from_major, border_color_from_major, hover_background_color_from_major } from "../../../constants/styles/colors/color_from_major.constant";
import { useContext_Account } from "../../../contexts/Account.context";
import { useContext_Students } from "../../../contexts/Profiles/Students/Student.context";
import { useContext_Teachers } from "../../../contexts/Profiles/Teachers/Teacher.context";
import { ClubInterface, ClubJoinRequestInterface, ClubManagerInterface, ClubMembershipInterface } from "../../../interfaces/clubs.interface";
import Clubs_rolodex_modal_join from "./Clubs_rolodex_modal_join.component";
import Avatar from "../../Extended/Avatar";
import { student_image_from_ID, student_major_from_ID } from "../../../functions/information/students.function";
import { teacher_image_from_ID, teacher_major_from_ID } from "../../../functions/information/teachers.function";
import { student_access_only } from "../../../functions/permission_check.function";
import Button from "../../Extended/Button";
import Modal from "../../Extended/Modal";
import { useContext_Clubs } from "../../../contexts/Clubs/Clubs.context";

interface CurrentComponentProp {
	club: ClubInterface;
	currentClubTeachers: ClubManagerInterface[];
	currentClubMembers: ClubMembershipInterface[];
	open: boolean;
	onModalClose: () => void;
}

const Clubs_rolodex_modal = (props: CurrentComponentProp) => {
	const { club, currentClubMembers, currentClubTeachers, open, onModalClose } =
		props;

	const { userInfo } = useContext_Account();
	const { students } = useContext_Students();
	const { teachers } = useContext_Teachers();
	const { clubJoinRequests } = useContext_Clubs();

	// This should be one object, but we'll have to see. //
	const [selfClubJoinRequest, setSelfClubJoinRequest] = useState<ClubJoinRequestInterface[]>([]);

	useEffect(() => {
		const clubJoinRequestSelf: ClubJoinRequestInterface[] | undefined = clubJoinRequests.result.filter((clubJoinRequest: ClubJoinRequestInterface) => clubJoinRequest.club_join_request_club_ID === club.club_ID && clubJoinRequest.club_join_request_student_ID === userInfo.result.profile_ID && clubJoinRequest.club_join_request_status === 1);
		setSelfClubJoinRequest(clubJoinRequestSelf);
	}, []);

	const [joinModalOpen, setJoinModalOpen] = useState(false);
	const onJoinModalClose = () => {
		setJoinModalOpen(false);
	};

	const { t } = useTranslation("page_clubs");

	return (
		<Modal
			open={open}
			onModalClose={onModalClose}
			title={club.club_name}>
			<div className="grid w-full grid-cols-1 gap-8">
				{/* Club image */}
				{club.club_image !== "" &&
					club.club_image !== "/assets/profilePic/clubs/" ? (
					<div className="flex justify-center w-fill">
						<img
							className="border border-standardBlack border-opacity-25 rounded-xl w-full sm:w-[500px] h-auto overflow-auto"
							src={`${CDN_ENDPOINT}${club.club_image}`}
						/>
					</div>
				) : null}
				{/* Club title and description */}
				<div className="flex flex-col gap-2">
					<h1
						className={`text-2xl font-semibold ${text_color_from_major[club.club_major]
							}`}>
						{club.club_name}
					</h1>
					{club.club_description !== "" || <h1 className="opacity-50">{club.club_description}</h1>}
				</div>
				{/* Club teachers and students */}
				<div className="flex flex-col gap-4 px-4 py-6 border rounded-xl">
					{/* Teachers */}
					<div className="flex flex-col gap-2">
						<h1 className="font-semibold opacity-50 text-md">
							{t("teachers_title")}
						</h1>
						{currentClubTeachers.length !== 0 ? (
							<div className="-space-x-6 avatar-group rtl:space-x-reverse">
								{currentClubTeachers.map((clubManager: ClubManagerInterface) => (
									<Avatar
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
						) : (
							<h1 className="">{t("noTeachers_message")}</h1>
						)}
					</div>
					{/* Students */}
					<div className="flex flex-col gap-2">
						<h1 className="font-semibold opacity-50 text-md">
							{t("members_title")}
						</h1>
						{currentClubMembers.length !== 0 ? (
							<div className="flex -space-x-4">
								{currentClubMembers.map((clubMembership: ClubMembershipInterface) => (
									<Avatar
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
						) : (
							<h1 className="">{t("noMembers_message")}</h1>
						)}
					</div>
				</div>
				{/* Club join button */}
				{student_access_only(userInfo.result.profile_position) && selfClubJoinRequest.length === 0 ? (
					<>
						<Clubs_rolodex_modal_join
							club={club}
							open={joinModalOpen}
							onModalClose={onJoinModalClose}
						/>
						<Button
							label={t("joinClub_button_title")}
							icon="fa-solid fa-right-from-bracket"
							background_color={hover_background_color_from_major[club.club_major]}
							border_color={border_color_from_major[club.club_major]}
							text_color={text_color_from_major[club.club_major]}
							onClick={() => {
								setJoinModalOpen(true);
							}}
						/>
					</>
				) : null}
			</div>
		</Modal>
	);
};

export default Clubs_rolodex_modal;
