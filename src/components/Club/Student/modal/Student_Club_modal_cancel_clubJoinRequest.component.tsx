import { useState } from "react";
import { useTranslation } from "react-i18next";
import Modal from "../../../Extended/Modal";
import Button_feedback from "../../../Extended/Button_feedback";
import { ClubJoinRequestInterface } from "../../../../interfaces/clubs.interface";
// Functions //
import { clubJoinRequest_delete } from "../../../../functions/CRUD/Clubs/ClubJoinRequests/clubJoinRequest_delete.function";
// Contexts //
import { useContext_Clubs } from "../../../../contexts/Clubs/Clubs.context";

interface CurrentComponentProp {
	clubJoinRequest: ClubJoinRequestInterface;
	open: boolean;
	onModalClose: () => void;
}

const Student_Club_modal_cancel_clubJoinRequest = (props: CurrentComponentProp) => {
	const { clubJoinRequest, open, onModalClose } = props;

	const { fetchClubJoinRequests } = useContext_Clubs();

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isCancelSuccess, setIsCancelSuccess] = useState(false);

	const handleModalClose = () => {
		onModalClose();
	};

	const setObjectAndSubmit = async () => {
		setIsSubmitting(true);

		const submissionStatus = await clubJoinRequest_delete(
			clubJoinRequest.club_join_request_ID
		);

		if (submissionStatus) {
			fetchClubJoinRequests(true);

			setIsCancelSuccess(true);
			handleModalClose();
		} else {
			setIsCancelSuccess(false);
		}
		setIsSubmitting(false);
	};

	const { t } = useTranslation("crud_modal_clubJoinRequests");

	return (
		<Modal
			open={open}
			onModalClose={handleModalClose}
			icon="fa-solid fa-right-from-bracket rotate-180"
			title={t("cancelJoinRequest_modal_header")}>
			<div className="flex flex-col w-full gap-8">
				<h1 className="opacity-50">
					{t("cancelJoinRequest_modal_message")}
				</h1>
				{/* Submit button */}
				<Button_feedback
					label={t("cancelJoinRequest_modal_submit_button_title")}
					successLabel={t(
						"cancelJoinRequest_modal_submit_success_message"
					)}
					icon="fa-solid fa-right-from-bracket rotate-180"
					background_color="hover:bg-error"
					border_color="border-error"
					text_color="text-error"
					color="border-error hover:bg-error text-error"
					isPending={isSubmitting}
					isSuccess={isCancelSuccess}
					onClick={setObjectAndSubmit}
				/>
			</div>
		</Modal>
	);
};

export default Student_Club_modal_cancel_clubJoinRequest;
