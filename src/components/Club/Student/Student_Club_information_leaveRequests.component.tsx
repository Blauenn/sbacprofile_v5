import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ClubInterface, ClubLeaveRequestInterface } from "../../../interfaces/clubs.interface";
import Button from "../../Extended/Button";
// Contexts //
import { useContext_Account } from "../../../contexts/Account.context";
import { useContext_Clubs } from "../../../contexts/Clubs/Clubs.context";
// Components //
import Student_Club_information_requestStatus from "./Student_Club_information_requestStatus.component";
import Student_Club_modal_cancel_clubLeaveRequest from "./modal/Student_Club_modal_cancel_clubLeaveRequest.component";
import Student_club_modal_leave from "./modal/Student_Club_modal_leave.component";

interface CurrentComponentProp {
	selfClub: ClubInterface;
}

const Student_Club_information_leaveRequests = (
	props: CurrentComponentProp
) => {
	const { selfClub } = props;

	const { userInfo } = useContext_Account();
	const { clubLeaveRequests } = useContext_Clubs();

	const [selfLeaveRequest, setSelfLeaveRequest] = useState<ClubLeaveRequestInterface>();

	useEffect(() => {
		const leaveRequestSelf: ClubLeaveRequestInterface | undefined = clubLeaveRequests.result.find(
			(clubLeaveRequest: ClubLeaveRequestInterface) =>
				clubLeaveRequest.club_leave_request_student_ID === userInfo.result.profile_ID &&
				clubLeaveRequest.club_leave_request_status === 1
		);
		setSelfLeaveRequest(leaveRequestSelf);
	}, []);

	const [leaveModalOpen, setLeaveModalOpen] = useState(false);
	const onLeaveModalClose = () => {
		setLeaveModalOpen(false);
	};

	const { t } = useTranslation("page_student_club");

	return selfLeaveRequest ? (
		<div className="flex flex-col gap-2">
			{/* If there's a leave request */}
			<div>
				<h1 className="opacity-50">
					{t("leaveRequestStatus_title")}
				</h1>
				<Student_Club_information_requestStatus
					status={selfLeaveRequest.club_leave_request_status}
					create_datetime={selfLeaveRequest.club_leave_request_create_datetime}
				/>
				{/* Cancel modal */}
				<Student_Club_modal_cancel_clubLeaveRequest
					clubLeaveRequest={selfLeaveRequest}
					open={leaveModalOpen}
					onModalClose={onLeaveModalClose}
				/>
				<Button
					label={t("cancelLeaveRequest_button_title")}
					icon="fa-solid fa-right-from-bracket rotate-180"
					background_color="hover:bg-error"
					border_color="border-error"
					text_color="text-error"
					onClick={() => {
						setLeaveModalOpen(true);
					}}
				/>
			</div>
		</div>
	) : (
		<>
			{/* If there's no leave request */}
			<Student_club_modal_leave
				club={selfClub}
				open={leaveModalOpen}
				onModalClose={onLeaveModalClose}
			/>
			<Button
				label={t("leaveRequest_button_title")}
				icon="fa-solid fa-right-from-bracket rotate-180"
				background_color="hover:bg-error"
				border_color="border-error"
				text_color="text-error"
				onClick={() => {
					setLeaveModalOpen(true);
				}}
			/>
		</>
	);
};

export default Student_Club_information_leaveRequests;
