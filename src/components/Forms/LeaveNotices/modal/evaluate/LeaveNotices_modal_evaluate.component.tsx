import { useState } from "react";
import { useTranslation } from "react-i18next";
import Button_feedback from "../../../../Extended/Button_feedback";
import Modal from "../../../../Extended/Modal";
import TextArea from "../../../../Extended/TextArea";
import { LeaveNoticeInterface } from "../../../../../interfaces/forms.interface";
// Functions //
import { leaveNotice_update } from "../../../../../functions/CRUD/Forms/LeaveNotices/leaveNotice_update.function";
// Contexts //
import { useContext_Account } from "../../../../../contexts/Account.context";
import { useContext_LeaveNotices } from "../../../../../contexts/forms/LeaveNotice.context";
// Components //
import LeaveNotices_evaluate_buttons from "./LeaveNotices_evaluate_buttons.component";

interface CurrentComponentProp {
	leaveNotice: LeaveNoticeInterface;
	open: boolean;
	onModalClose: () => void;
}

const LeaveNotices_modal_evaluate = (props: CurrentComponentProp) => {
	const { leaveNotice, open, onModalClose } = props;

	const { userInfo } = useContext_Account();
	const { fetchLeaveNotices } = useContext_LeaveNotices();

	const [leaveNoticeUpdateObject, setLeaveNoticeUpdateObject] = useState({
		teacher: userInfo.result.profile_ID,
		status: 0,
		description: "",
	});

	const [validationErrors, setValidationErrors] = useState({
		status: "",
		description: "",
	});

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);

	const handleModalClose = () => {
		setLeaveNoticeUpdateObject({
			teacher: userInfo.result.profile_ID,
			status: 0,
			description: "",
		});
		setValidationErrors({
			status: "",
			description: "",
		});

		setIsSubmitting(false);
		setIsUpdateSuccess(false);

		onModalClose();
	};

	let updateAs: number;
	switch (userInfo.result.profile_position) {
		case 3:
			updateAs = 2;
			break;
		case 4:
			updateAs = 3;
			break;
		default:
			updateAs = 1;
			break;
	}

	const setObjectAndSubmit = async () => {
		setIsSubmitting(true);

		const updatedLeaveNoticeObject = {
			teacher: leaveNoticeUpdateObject.teacher,
			// +1 because "pending" is at the status #1. //
			status: leaveNoticeUpdateObject.status + 1,
			description: leaveNoticeUpdateObject.description,
		};

		const submissionStatus = await leaveNotice_update(
			leaveNotice,
			updatedLeaveNoticeObject,
			updateAs
		);

		if (submissionStatus) {
			fetchLeaveNotices(true);

			setIsSubmitting(false);
			setIsUpdateSuccess(true);
		} else {
			setIsSubmitting(false);
			setIsUpdateSuccess(false);
		}
	};

	const { t } = useTranslation("forms_leaveNotices");

	// Set the button title based on the value of the status. //
	let info_submit_button_text: string = "";
	let info_submit_button_icon: string = "";
	let info_submit_button_color: { background: string, border: string, text: string; } = { background: "", border: "", text: "" };
	switch (leaveNoticeUpdateObject.status) {
		case 1:
			info_submit_button_text = t("evaluate_button_approve_title");
			info_submit_button_icon = "fa-solid fa-circle-check";
			info_submit_button_color = {
				background: "hover:bg-success",
				border: "border-success",
				text: "text-success"
			};
			break;
		case 2:
			info_submit_button_text = t("evaluate_button_edit_title");
			info_submit_button_icon = "fa-solid fa-pencil";
			info_submit_button_color = {
				background: "hover:bg-yellow-500",
				border: "border-yellow-500",
				text: "text-yellow-500"
			};
			break;
		case 3:
			info_submit_button_text = t("evaluate_button_reject_title");
			info_submit_button_icon = "fa-solid fa-circle-xmark";
			info_submit_button_color = {
				background: "hover:bg-error",
				border: "border-error",
				text: "text-error"
			};
			break;
			default:
				info_submit_button_text = t("evaluate_button_title");
				info_submit_button_icon = "fa-solid fa-flag";
				info_submit_button_color = {
					background: "bg-gray-500",
					border: "border-gray-500",
					text: "text-white"
				};
			break;
	}

	return (
		<Modal
			open={open}
			onModalClose={handleModalClose}
			icon="fa-solid fa-flag"
			title={t("teachers_evaluate_modal_header")}>
			<div className="flex flex-col w-full gap-8">
				<LeaveNotices_evaluate_buttons
					leaveNoticeUpdateObject={leaveNoticeUpdateObject}
					setLeaveNoticeUpdateObject={setLeaveNoticeUpdateObject}
				/>
				<TextArea
					label="Message"
					className="w-full"
					maxRows={4}
					name="description"
					object={leaveNoticeUpdateObject}
					setObject={setLeaveNoticeUpdateObject}
					validation={validationErrors.description}
				/>
				<Button_feedback
					label={info_submit_button_text}
					successLabel={t("evaluate_modal_submit_success_message")}
					icon={info_submit_button_icon}
					background_color={info_submit_button_color.background}
					border_color={info_submit_button_color.border}
					text_color={info_submit_button_color.text}
					isPending={isSubmitting}
					isSuccess={isUpdateSuccess}
					disabled
					onClick={() => {
						setObjectAndSubmit();
					}}
				/>
			</div>
		</Modal>
	);
};

export default LeaveNotices_modal_evaluate;
