import { useState } from "react";
import { useTranslation } from "react-i18next";
import Modal from "../../../Extended/Modal";
import Button from "../../../Extended/Button";
import { LeaveNoticeInterface } from "../../../../interfaces/forms.interface";
// Functions //
import { teacher_access_only, head_access_only, student_access_only } from "../../../../functions/permission_check.function";
// Contexts //
import { useContext_Account } from "../../../../contexts/Account.context";
// Components //
import LeaveNotices_modal_content from "./LeaveNotices_modal_content.component";
import LeaveNotices_modal_evaluate from "./evaluate/LeaveNotices_modal_evaluate.component";
import LeaveNotices_evaluate_button from "./evaluate/LeaveNotices_evaluate_button.component";
import LeaveNotices_modal_delete from "./LeaveNotices_modal_delete.component";

interface CurrentComponentProp {
	leaveNotice: LeaveNoticeInterface;
	open: boolean;
	onModalClose: () => void;
}

const LeaveNotices_modal = (props: CurrentComponentProp) => {
	const { leaveNotice, open, onModalClose } = props;

	const { userInfo } = useContext_Account();

	const handleModalClose = () => {
		onModalClose();
	};

	const [evaluateModalOpen, setEvaluateModalOpen] = useState(false);
	const onEvaluateModalClose = () => {
		setEvaluateModalOpen(false);
	};
	const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
	const onDeleteModalClose = () => {
		setDeleteModalOpen(false);
	};

	const { t } = useTranslation("forms_leaveNotices");

	return (
		<Modal
			open={open}
			onModalClose={handleModalClose}
			icon="fa-solid fa-flag"
			title={t("teachers_view_modal_header")}
			overflow>
			<div className="flex flex-col w-full gap-4">
				<LeaveNotices_modal_content leaveNotice={leaveNotice} />
				{teacher_access_only(userInfo.result.profile_position) ||
					head_access_only(userInfo.result.profile_position) ? (
					<>
						<LeaveNotices_modal_evaluate
							leaveNotice={leaveNotice}
							open={evaluateModalOpen}
							onModalClose={onEvaluateModalClose}
						/>
						<LeaveNotices_evaluate_button
							leaveNotice={leaveNotice}
							functionToRun={() => {
								setEvaluateModalOpen(true);
							}}
						/>
					</>
				) : null}
				{student_access_only(userInfo.result.profile_position) ? (
					<>
						<LeaveNotices_modal_delete leaveNotice={leaveNotice} open={deleteModalOpen} onModalClose={onDeleteModalClose} />
						<Button
							label={"delete_button_title"}
							icon="fa-solid fa-trash-can"
							onClick={() => { setDeleteModalOpen(true); }}
						/>
					</>
				) : null}
			</div>
		</Modal>
	);
};

export default LeaveNotices_modal;
