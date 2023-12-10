import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Modal from "../../../Extended/Modal";
import Button_feedback from "../../../Extended/Button_feedback";
import { LeaveNoticeInterface } from "../../../../interfaces/forms.interface";
// Functions //
import { change_to_locale_date, day_amount_between_dates, day_from_date } from "../../../../functions/dates.function";
import { leaveNotice_delete } from "../../../../functions/CRUD/Forms/LeaveNotices/leaveNotice_delete.function";
// Contexts //
import { useContext_LeaveNotices } from "../../../../contexts/forms/LeaveNotice.context";
// Constants //
import { day_colors } from "../../../../constants/styles/colors/color_from_day.constant";

interface CurrentComponentProp {
	leaveNotice: LeaveNoticeInterface;
	open: boolean;
	onModalClose: () => void;
}

const LeaveNotices_modal_delete = (props: CurrentComponentProp) => {
	const { leaveNotice, open, onModalClose } = props;

	const { fetchLeaveNotices } = useContext_LeaveNotices();

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

		const submissionStatus = await leaveNotice_delete(
			leaveNotice.leave_notice_ID
		);

		if (submissionStatus) {
			fetchLeaveNotices(true);

			setIsSubmitting(false);
			setIsDeleteSuccess(true);

			handleModalClose();
		} else {
			setIsSubmitting(false);
			setIsDeleteSuccess(false);
		}
	};

	const { t } = useTranslation("crud_modal_leaveNotices");

	return (
		<Modal
			open={open}
			onModalClose={handleModalClose}
			icon="fa-solid fa-trash-can"
			title={t("delete_modal_header")}>
			<div className="flex flex-col w-full">
				<div className="flex flex-col gap-4">
					<h1 className="opacity-50">
						{t("delete_modal_message")}
					</h1>
					<div className="flex flex-col gap-4 mb-2">
						{/* Dates */}
						<div className="p-6 border rounded-xl">
							{day_amount_between_dates(
								leaveNotice.leave_notice_start_datetime,
								leaveNotice.leave_notice_end_datetime
							) -
								1 ==
								0 ? (
								/* Start date */
								<div className="flex flex-col gap-1">
									<h1 className="font-semibold opacity-50">
										{t("delete_modal_dateOfLeave_label")}
									</h1>
									<h1
										className={`text-xl font-semibold ${day_colors[
											day_from_date(
												leaveNotice.leave_notice_start_datetime
											)
										]
											}`}>
										{change_to_locale_date(
											leaveNotice.leave_notice_start_datetime
										)}{" "}
										-{" "}
										{
											change_to_locale_date(
												leaveNotice.leave_notice_end_datetime
											).split(",")[1]
										}
									</h1>
								</div>
							) : (
								<div className="grid gap-4 sm:grid-cols-2">
									{/* Start date */}
									<div className="flex flex-col gap-1">
										<h1 className="font-semibold opacity-50 text-md">
											{t("delete_modal_startDate_label")}
										</h1>
										<h1
											className={`text-xl font-semibold ${day_colors[
												day_from_date(
													leaveNotice.leave_notice_start_datetime
												)
											]
												}`}>
											{
												change_to_locale_date(
													leaveNotice.leave_notice_start_datetime
												).split(",")[0]
											}
										</h1>
									</div>
									{/* End date */}
									<div className="flex flex-col gap-1">
										<h1 className="font-semibold opacity-50 text-md">
											{t("delete_modal_endDate_label")}
										</h1>
										<h1
											className={`text-xl font-semibold ${day_colors[
												day_from_date(
													leaveNotice.leave_notice_end_datetime
												)
											]
												}`}>
											{
												change_to_locale_date(
													leaveNotice.leave_notice_end_datetime
												).split(",")[0]
											}
										</h1>
									</div>
								</div>
							)}
						</div>
						{/* Description */}
						<div className="flex flex-col gap-1 p-6 border rounded-xl">
							<h1 className="font-semibold opacity-50 text-md">
								{t("delete_modal_description_label")}
							</h1>
							<h1 className="text-xl">
								{leaveNotice.leave_notice_description}
							</h1>
						</div>
					</div>
					{/* Submit button */}
					<Button_feedback
						label={t("delete_modal_submit_button_title")}
						successLabel={t(
							"delete_modal_submit_success_message"
						)}
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
			</div>
		</Modal>
	);
};

export default LeaveNotices_modal_delete;
