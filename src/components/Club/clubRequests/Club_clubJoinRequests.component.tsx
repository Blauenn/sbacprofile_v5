import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ClubInterface, ClubJoinRequestInterface } from "../../../interfaces/clubs.interface";
// Functions //
import { clubJoinRequest_create } from "../../../functions/CRUD/Clubs/ClubJoinRequests/clubJoinRequest_create.function";
import { clubJoinRequest_update } from "../../../functions/CRUD/Clubs/ClubJoinRequests/clubJoinRequest_update.function";
import { clubMembership_create } from "../../../functions/CRUD/Clubs/ClubMemberships/clubMembership_create.function";
// Contexts //
import { useContext_Clubs } from "../../../contexts/Clubs/Clubs.context";
// Components //
import Club_studentInfo from "./Club_studentInfo.component";
import Club_student_interact_button from "./Club_student_interact_button.component";

interface CurrentComponentProp {
	selfClub: ClubInterface;
}

const Club_clubJoinRequests = (props: CurrentComponentProp) => {
	const { selfClub } = props;

	const {
		fetchClubMemberships,
		clubJoinRequests,
		fetchClubJoinRequests,
	} = useContext_Clubs();

	const [selfClubJoinRequests, setSelfClubJoinRequests] = useState<ClubJoinRequestInterface[]>([]);

	useEffect(() => {
		const clubJoinRequestsSelf = clubJoinRequests.result.filter(
			(clubJoinRequest: ClubJoinRequestInterface) =>
				clubJoinRequest.club_join_request_club_ID ===
				selfClub.club_ID &&
				clubJoinRequest.club_join_request_status === 1
		);

		setSelfClubJoinRequests(clubJoinRequestsSelf);
	}, [clubJoinRequests]);

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);

	const setObjectAndSubmit = async (
		clubJoinRequest: ClubJoinRequestInterface,
		status: number
	) => {
		setIsSubmitting(true);

		let clubJoinRequestSubmissionStatus: boolean | undefined = false;

		// If the student join request is approved. //
		if (status === 2) {
			// Update the club join request. //
			clubJoinRequestSubmissionStatus = await clubJoinRequest_update(
				clubJoinRequest.club_join_request_ID,
				2
			);

			if (clubJoinRequestSubmissionStatus) {
				// Create the club membership. //
				await clubMembership_create(
					clubJoinRequest.club_join_request_club_ID,
					clubJoinRequest.club_join_request_student_ID
				);
			}
		}
		// If the student join request is rejected. //
		else {
			clubJoinRequestSubmissionStatus = await clubJoinRequest_create(
				clubJoinRequest.club_join_request_ID,
				3
			);
		}

		if (clubJoinRequestSubmissionStatus) {
			fetchClubMemberships(true);
			fetchClubJoinRequests(true);

			setIsUpdateSuccess(true);
		} else {
			setIsUpdateSuccess(false);
		}
		setIsSubmitting(false);
	};

	const { t } = useTranslation("page_teacher_club");

	return (
		<>
			{selfClubJoinRequests.length !== 0 ? (
				<div className="flex flex-col gap-4">
					<div className="flex flex-row justify-between">
						<h1 className="opacity-50">
							<i className="fa-solid fa-right-from-bracket me-2"></i>
							{t("joinRequests_title")}
						</h1>
						{isUpdateSuccess ? (
							<h1>
								{t("joinRequests_updated_message")}
								<i className="text-success fa-solid fa-circle-check ms-2"></i>
							</h1>
						) : null}
					</div>
					<div className="flex flex-col gap-2">
						{selfClubJoinRequests.map((clubJoinRequest: ClubJoinRequestInterface) => (
							<div
								key={clubJoinRequest.club_join_request_ID}
								className="flex flex-row items-center justify-between">
								<Club_studentInfo
									student_ID={clubJoinRequest.club_join_request_student_ID}
								/>
								<div className="flex flex-row gap-4">
									<div className="flex flex-row gap-2">
										{/* Approve button */}
										<Club_student_interact_button
											functionToRun={() => {
												setObjectAndSubmit(clubJoinRequest, 2);
											}}
											isSubmitting={isSubmitting}
											title={t("requests_approve_button_title")}
											icon="fa-solid fa-check"
											color="border border-success hover:bg-success"
											textColor="text-success"
										/>
										{/* Reject button */}
										<Club_student_interact_button
											functionToRun={() => {
												setObjectAndSubmit(clubJoinRequest, 3);
											}}
											isSubmitting={isSubmitting}
											title={t("requests_reject_button_title")}
											icon="fa-solid fa-xmark"
											color="border border-error hover:bg-error"
											textColor="text-error"
										/>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			) : (
				<div className="flex flex-col">
					<h1 className="opacity-50">{t("joinRequests_title")}</h1>
					<h1 className="text-2xl font-semibold">
						{t("noJoinRequest_message")}
					</h1>
				</div>
			)}
		</>
	);
};

export default Club_clubJoinRequests;
