import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Modal from "../../../Extended/Modal";
import Button_feedback from "../../../Extended/Button_feedback";
import { ClubInterface } from "../../../../interfaces/clubs.interface";
// Functions //
import { club_delete } from "../../../../functions/CRUD/Clubs/Clubs/club_delete.function";
// Contexts //
import { useContext_Clubs } from "../../../../contexts/Clubs/Clubs.context";
import { text_color_from_major } from "../../../../constants/styles/colors/color_from_major.constant";

interface CurrentComponentProp {
	club: ClubInterface;
	open: boolean;
	onModalClose: () => void;
}

const Admin_Clubs_modal_delete = (props: CurrentComponentProp) => {
	const { club, open, onModalClose } = props;

	const { fetchClubs } = useContext_Clubs();

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isDeleteSuccess, setIsDeleteSuccess] = useState(false);

	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 3000);

		return () => clearTimeout(timer);
	}, []);

	const handleModalClose = () => {
		onModalClose();
	};

	const setObjectAndSubmit = async () => {
		setIsSubmitting(true);

		const submissionStatus = await club_delete(club.club_ID);

		if (submissionStatus) {
			fetchClubs(true);

			setIsSubmitting(false);
			setIsDeleteSuccess(true);

			handleModalClose();
		} else {
			setIsSubmitting(false);
			setIsDeleteSuccess(false);
		}
	};

	const { t } = useTranslation("crud_modal_clubs");

	return (
		<Modal
			open={open}
			onModalClose={handleModalClose}
			icon="fa-solid fa-trash-can"
			title={t("delete_modal_header")}>
			<div className="flex flex-col gap-4">
				<h1 className="opacity-50">{t("delete_modal_message")}</h1>
				<div className="flex flex-col mb-2">
					<h1 className={`text-2xl font-semibold ${text_color_from_major[club.club_major]}`}>{club.club_name}</h1>
				</div>
				{/* Submit button */}
				<Button_feedback
					label={t("delete_modal_submit_button_title")}
					successLabel={t("delete_modal_submit_success_message")}
					icon="fa-solid fa-trash-can"
					background_color="hover:bg-error"
					border_color="border-error"
					text_color="text-error"
					disabled={isLoading}
					isPending={isSubmitting}
					isSuccess={isDeleteSuccess}
					onClick={setObjectAndSubmit}
				/>
			</div>
		</Modal>
	);
};

export default Admin_Clubs_modal_delete;
