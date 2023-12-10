import { useTranslation } from "react-i18next";
import { LeaveNoticeInterface } from "../../../../interfaces/forms.interface";
// Functions //
import { change_to_locale_date, day_amount_between_dates, day_from_date } from "../../../../functions/dates.function";
// Components //
import Forms_student_information from "../../Forms_student_information.component";
import Forms_approval_messages from "../../Forms_approval_timeline/Forms_approval_messages.component";
import Forms_approval_timeline from "../../Forms_approval_timeline/Forms_approval_timeline.component";
// Constants //
import { day_colors } from "../../../../constants/styles/colors/color_from_day.constant";
import { leaveNotice_choice } from "../../../../constants/names/leaveNotice_name";
import { hover_transition } from "../../../../constants/styles/transition.style";
import { CDN_ENDPOINT } from "../../../../constants/ENDPOINTS";

interface CurrentComponentProp {
	leaveNotice: LeaveNoticeInterface;
}

const LeaveNotices_modal_content = (props: CurrentComponentProp) => {
	const { leaveNotice } = props;

	const { t } = useTranslation("forms_leaveNotices");

	return (
		<div className="flex flex-col w-full gap-8 p-2">
			{/* Student information */}
			<Forms_student_information
				form_ID={leaveNotice.leave_notice_ID}
				form_student_ID={leaveNotice.leave_notice_student_ID}
			/>
			<div className="flex flex-col gap-4">
				{/* Leave notice approval status */}
				<div className="flex flex-col border sm:gap-8 rounded-xl sm:p-6">
					<Forms_approval_timeline
						teacher_status={leaveNotice.leave_notice_teacher_status}
						head_status={leaveNotice.leave_notice_head_status}
					/>
					<Forms_approval_messages
						teacher_description={leaveNotice.leave_notice_teacher_description}
						head_description={leaveNotice.leave_notice_head_description}
					/>
				</div>
				{/* Leave notice description */}
				<div className="grid grid-cols-2 gap-4 px-6 py-4 border rounded-xl">
					<div className="flex flex-col gap-1">
						<h1 className="font-semibold opacity-50 text-md">
							{t("modal_content_reasonOfLeave_label")}
						</h1>
						<h1 className="text-xl">
							{leaveNotice_choice[leaveNotice.leave_notice_choice]}
						</h1>
					</div>
					{/* Leave notice description */}
					<div className="flex flex-col gap-1">
						<h1 className="font-semibold opacity-50 text-md">
							{t("modal_content_description_label")}
						</h1>
						<h1 className="text-xl">{leaveNotice.leave_notice_description}</h1>
					</div>
				</div>
				{/* Leave notice attached file */}
				<div className="flex flex-col gap-1 px-6 py-4 border rounded-xl">
					<div className="flex flex-col gap-1">
						<h1 className="font-semibold opacity-50 text-md">
							{t("modal_content_attachedFile_label")}
						</h1>
						{leaveNotice.leave_notice_attached_file != "" ? (
							<a
								download
								href={`${CDN_ENDPOINT}${leaveNotice.leave_notice_attached_file}`}
								target="_blank"
								className={`text-xl break-all hover:text-primary ${hover_transition}`}>
								<i className="fa-solid fa-folder me-4"></i>
								{t("modal_content_attachedFile_fileText")}
							</a>
						) : (
							<h1 className="text-xl">
								{t("modal_content_attachedFile_noFileText")}
							</h1>
						)}
					</div>
				</div>
				{/* Leave notice date of leave */}
				<div className="grid gap-4 p-6 border sm:grid-cols-2 rounded-xl">
					{day_amount_between_dates(
						leaveNotice.leave_notice_start_datetime,
						leaveNotice.leave_notice_end_datetime
					) -
						1 ==
						0 ? (
						/* Start date */
						<div className="flex flex-col gap-1">
							<h1 className="font-semibold opacity-50 text-md">
								{t("modal_content_dateOfLeave_label")}
							</h1>
							<h1
								className={`text-xl ${day_colors[
									day_from_date(leaveNotice.leave_notice_start_datetime)
								]
									}`}>
								{change_to_locale_date(leaveNotice.leave_notice_start_datetime)}{" "}
								-{" "}
								{
									change_to_locale_date(
										leaveNotice.leave_notice_end_datetime
									).split(",")[1]
								}
							</h1>
						</div>
					) : (
						<>
							{/* Start date */}
							<div className="flex flex-col gap-1">
								<h1 className="font-semibold opacity-50 text-md">
									{t("modal_content_startDate_label")}
								</h1>
								<h1
									className={`text-xl ${day_colors[
										day_from_date(leaveNotice.leave_notice_start_datetime)
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
									{t("modal_content_endDate_label")}
								</h1>
								<h1
									className={`text-xl ${day_colors[
										day_from_date(leaveNotice.leave_notice_end_datetime)
									]
										}`}>
									{
										change_to_locale_date(
											leaveNotice.leave_notice_end_datetime
										).split(",")[0]
									}
								</h1>
							</div>
						</>
					)}
				</div>
				{/* Leave notice time of submission */}
				<div className="flex flex-col gap-8 p-6 border rounded-xl">
					<div className="flex flex-col gap-1">
						<h1 className="font-semibold opacity-50 text-md">
							{t("modal_content_timeOfSubmission_label")}
						</h1>
						<h1
							className={`text-xl ${day_colors[
								day_from_date(leaveNotice.leave_notice_create_datetime)
							]
								}`}>
							{change_to_locale_date(leaveNotice.leave_notice_create_datetime)}
						</h1>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LeaveNotices_modal_content;
