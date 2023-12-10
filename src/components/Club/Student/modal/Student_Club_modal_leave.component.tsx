import { useState } from "react";
import { useTranslation } from "react-i18next";
import Modal from "../../../Extended/Modal";
import Button_feedback from "../../../Extended/Button_feedback";
import { ClubInterface } from "../../../../interfaces/clubs.interface";
// Functions //
import { clubLeaveRequest_create } from "../../../../functions/CRUD/Clubs/ClubLeaveRequests/clubLeaveRequest_create.function";
// Contexts //
import { useContext_Account } from "../../../../contexts/Account.context";
import { useContext_Clubs } from "../../../../contexts/Clubs/Clubs.context";

interface CurrentComponentProp {
	club: ClubInterface;
	open: boolean;
	onModalClose: () => void;
}

const Student_club_modal_leave = (props: CurrentComponentProp) => {
	const { club, open, onModalClose } = props;

	const { userInfo } = useContext_Account();
	const { fetchClubLeaveRequests } = useContext_Clubs();

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);

	const handleModalClose = () => {
		onModalClose();
	};

	const setObjectAndSubmit = async () => {
		setIsSubmitting(true);

		const submissionStatus = await clubLeaveRequest_create(
			club.club_ID,
			userInfo.result.profile_ID
		);

		if (submissionStatus) {
			fetchClubLeaveRequests(true);

			setIsSubmitSuccess(true);
			handleModalClose();
		} else {
			setIsSubmitSuccess(true);
		}
		setIsSubmitting(false);
	};

	const { t } = useTranslation("page_student_club");

	return (
		<Modal
			open={open}
			onModalClose={handleModalClose}
			icon="fa-solid fa-right-from-bracket rotate-180"
			title={t("leaveRequest_modal_header")}>
			<div className="flex flex-col w-full gap-8">
				<div className="flex flex-col gap-4">
					<h1 className="text-xl">
						{t("leaveRequest_modal_message")}
					</h1>
					<h1 className="opacity-50">
						{t("leaveRequest_modal_description")}
					</h1>
				</div>
				{/* Submit button */}
				<Button_feedback
					label={t("leaveRequest_modal_submit_button_title")}
					successLabel={t(
						"leaveRequest_modal_submit_success_message"
					)}
					icon="fa-solid fa-right-from-bracket rotate-180"
					background_color="hover:bg-error"
					border_color="border-error"
					text_color="text-error"
					isPending={isSubmitting}
					isSuccess={isSubmitSuccess}
					onClick={setObjectAndSubmit}
				/>
			</div>
		</Modal>
	);
};

export default Student_club_modal_leave;
