import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ClubInterface, ClubLeaveRequestInterface } from "../../../interfaces/clubs.interface";
// Functions //
import { clubLeaveRequest_update } from "../../../functions/CRUD/Clubs/ClubLeaveRequests/clubLeaveRequest_update.function";
import { clubMembership_delete } from "../../../functions/CRUD/Clubs/ClubMemberships/clubMembership_delete.function";
// Contexts //
import { useContext_Clubs } from "../../../contexts/Clubs/Clubs.context";
// Components //
import Club_studentInfo from "./Club_studentInfo.component";
import Club_student_interact_button from "./Club_student_interact_button.component";

interface CurrentComponentProp {
	selfClub: ClubInterface;
}

const Club_clubLeaveRequests = (props: CurrentComponentProp) => {
	const { selfClub } = props;

	const { fetchClubMemberships, clubLeaveRequests, fetchClubLeaveRequests } =
		useContext_Clubs();

	const [selfClubLeaveRequests, setSelfClubLeaveRequests] = useState<ClubLeaveRequestInterface[]>([]);

	useEffect(() => {
		const clubLeaveRequestsSelf = clubLeaveRequests.result.filter(
			(clubLeaveRequest: ClubLeaveRequestInterface) =>
				clubLeaveRequest.club_leave_request_club_ID ===
				selfClub.club_ID &&
				clubLeaveRequest.club_leave_request_status === 1
		);

		setSelfClubLeaveRequests(clubLeaveRequestsSelf);
	}, [clubLeaveRequests]);


	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);

	const setObjectAndSubmit = async (
		clubLeaveRequest: ClubLeaveRequestInterface,
		status: number
	) => {
		setIsSubmitting(true);

		let clubLeaveRequestSubmissionStatus: boolean | undefined = false;

		// If the student leave request is approved. //
		if (status === 2) {
			// Update the club leave request. //
			clubLeaveRequestSubmissionStatus = await clubLeaveRequest_update(
				clubLeaveRequest.club_leave_request_ID,
				2
			);

			if (clubLeaveRequestSubmissionStatus) {
				// Remove the club membership. //
				await clubMembership_delete(
					clubLeaveRequest.club_leave_request_club_ID,
					clubLeaveRequest.club_leave_request_student_ID
				);
			}
		}
		// If the student leave request is rejected. //
		else {
			clubLeaveRequestSubmissionStatus = await clubLeaveRequest_update(
				clubLeaveRequest.club_leave_request_ID,
				3
			);
		}

		if (clubLeaveRequestSubmissionStatus) {
			fetchClubMemberships(true);
			fetchClubLeaveRequests(true);

			setIsUpdateSuccess(true);
		} else {
			setIsUpdateSuccess(false);
		}
		setIsSubmitting(false);
	};

	const { t } = useTranslation("page_teacher_club");

	return (
		<>
			{selfClubLeaveRequests.length > 0 ? (
				<div className="flex flex-col gap-4">
					<div className="flex flex-row justify-between">
						<h1 className="opacity-50">
							<i className="fa-solid fa-right-from-bracket me-2"></i>
							{t("leaveRequests_title")}
						</h1>
						{isUpdateSuccess ? (
							<h1>
								{t("leaveRequests_updated_message")}
								<i className="text-success fa-solid fa-circle-check ms-2"></i>
							</h1>
						) : null}
					</div>
					<div className="flex flex-col gap-2">
						{selfClubLeaveRequests.map((clubLeaveRequest: ClubLeaveRequestInterface) => (
							<div
								key={clubLeaveRequest.club_leave_request_ID}
								className="flex flex-row items-center justify-between">
								<Club_studentInfo
									student_ID={clubLeaveRequest.club_leave_request_student_ID}
								/>
								<div className="flex flex-row gap-4">
									<div className="flex flex-row gap-2">
										{/* Delete button */}
										<Club_student_interact_button
											functionToRun={() => {
												setObjectAndSubmit(clubLeaveRequest, 2);
											}}
											isSubmitting={isSubmitting}
											title={t("requests_remove_button_title")}
											icon="fa-solid fa-minus"
											color="border border-error hover:bg-error"
											textColor="text-error"
										/>
										{/* Reject button */}
										<Club_student_interact_button
											functionToRun={() => {
												setObjectAndSubmit(clubLeaveRequest, 3);
											}}
											isSubmitting={isSubmitting}
											title={t("requests_reject_button_title")}
											icon="fa-solid fa-xmark"
											color="border border-primary hover:bg-primary"
											textColor="text-primary"
										/>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			) : (
				<div className="flex flex-col">
					<h1 className="opacity-50">
						{t("leaveRequests_title")}
					</h1>
					<h1 className="text-2xl font-semibold">
						{t("noLeaveRequest_message")}
					</h1>
				</div>
			)}
		</>
	);
};

export default Club_clubLeaveRequests;
