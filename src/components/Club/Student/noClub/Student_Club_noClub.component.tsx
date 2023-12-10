import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import Button from "../../../Extended/Button";
import { ClubJoinRequestInterface, ClubInterface } from "../../../../interfaces/clubs.interface";
import fade_transition from "../../../../animations/fade_transition.transition";
// Contexts //
import { useContext_Account } from "../../../../contexts/Account.context";
import { useContext_Clubs } from "../../../../contexts/Clubs/Clubs.context";
// Components //
import Student_Club_noClub_requestedClub from "./Student_Club_noClub_requestedClub.component";
import Student_Club_information_requestStatus from "../Student_Club_information_requestStatus.component";
import Student_Club_modal_cancel_clubJoinRequest from "../modal/Student_Club_modal_cancel_clubJoinRequest.component";
// Constants //
import { hover_transition } from "../../../../constants/styles/transition.style";

const Student_Club_noClub = () => {
	const { userInfo } = useContext_Account();
	const { clubs, clubJoinRequests } =
		useContext_Clubs();

	const [selfClubJoinRequest, setSelfClubJoinRequest] = useState<ClubJoinRequestInterface>();
	const [selfClubJoinRequestInformation, setSelfClubJoinRequestInformation] = useState<ClubInterface>();

	useEffect(() => {
		const clubJoinRequestSelf: ClubJoinRequestInterface | undefined = clubJoinRequests.result.find((clubJoinRequest: ClubJoinRequestInterface) => (
			(clubJoinRequest.club_join_request_student_ID === userInfo.result.profile_ID &&
				clubJoinRequest.club_join_request_status === 1) ||
			clubJoinRequest.club_join_request_status === 3
		));
		setSelfClubJoinRequest(clubJoinRequestSelf);

		if (selfClubJoinRequest) {
			const clubJoinRequestInformationSelf: ClubInterface | undefined = clubs.result.find((club: ClubInterface) => club.club_ID === selfClubJoinRequest.club_join_request_club_ID);
			setSelfClubJoinRequestInformation(clubJoinRequestInformationSelf);
		}
	}, []);

	const [cancelModalOpen, setCancelModalOpen] = useState(false);
	const onCancelModalClose = () => {
		setCancelModalOpen(false);
	};

	const information_card_style =
		"col-span-5 bg-white shadow-sm rounded-xl p-4 w-full";

	const { t } = useTranslation("page_student_club");

	return (
		<div className="grid grid-cols-5 gap-4">
			{selfClubJoinRequest && selfClubJoinRequestInformation ? (
				<>
					<div className={`${information_card_style} md:col-span-3`}>
						<Student_Club_noClub_requestedClub
							club_name={selfClubJoinRequestInformation.club_name}
							club_major={selfClubJoinRequestInformation.club_major}
						/>
					</div>
					<div className={`${information_card_style} md:col-span-2`}>
						<div className="flex flex-col gap-2">
							<h1 className="opacity-50">
								{t("requestStatus_title")}
							</h1>
							<Student_Club_information_requestStatus
								status={selfClubJoinRequest.club_join_request_status}
								create_datetime={
									selfClubJoinRequest.club_join_request_create_datetime
								}
							/>
						</div>
						{/* Cancel modal */}
						<Student_Club_modal_cancel_clubJoinRequest
							clubJoinRequest={selfClubJoinRequest}
							open={cancelModalOpen}
							onModalClose={onCancelModalClose}
						/>
						<Button
							label={t("cancelJoinRequest_button_title")}
							icon="fa-solid fa-right-from-bracket rotate-180"
							background_color="hover:bg-error"
							border_color="border-error"
							text_color="text-error"
							onClick={() => {
								setCancelModalOpen(true);
							}}
						/>
						<h1 className="mt-2 opacity-50">
							{t("cancelJoinRequest_message")}
						</h1>
					</div>
				</>
			) : (
				<>
					{/* No club */}
					<div className={`${information_card_style} md:col-span-2`}>
						<div className="flex flex-col gap-4">
							<div className="flex flex-col gap-2">
								<div>
									<h1 className="opacity-50">
										{t("currentClub_title")}
									</h1>
									<h1 className={`text-2xl font-semibold`}>
										{t("noClub_message")}
									</h1>
								</div>
							</div>
							<div>
								<NavLink to="/clubs">
									<button
										type="button"
										className={`border border-primary text-primary hover:bg-primary hover:text-white rounded-full px-4 py-2 w-full ${hover_transition}`}>
										<i className="fa-solid fa-right-from-bracket me-2"></i>
										{t("joinClub_button_title")}
									</button>
								</NavLink>
							</div>
						</div>
					</div>
				</>
			)}

		</div>
	);
};

export default fade_transition(Student_Club_noClub);
