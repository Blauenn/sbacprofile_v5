import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { enUS, th } from "date-fns/locale";
import { LeaveNoticeInterface } from "../../../../interfaces/forms.interface";
// Functions //
import { change_to_date } from "../../../../functions/dates.function";
import { student_image_from_ID, student_major_from_ID } from "../../../../functions/information/students.function";
import { student_access_only } from "../../../../functions/permission_check.function";
// Contexts //
import { useContext_Account } from "../../../../contexts/Account.context";
import { useContext_Students } from "../../../../contexts/Profiles/Students/Student.context";
// Components //
import LeaveNotices_modal from "../modal/LeaveNotices_modal.component";
import Forms_rolodex_card_approvalIcon from "../../card/Forms_rolodex_card_approvalIcon.component";
// Constants //
import { hover_transition } from "../../../../constants/styles/transition.style";
import { CDN_ENDPOINT } from "../../../../constants/ENDPOINTS";
import { background_color_from_major } from "../../../../constants/styles/colors/color_from_major.constant";
import i18n from "../../../../i18n";

interface CurrentComponentProp {
	leaveNotice: LeaveNoticeInterface;
}

const LeaveNotices_rolodex_card = (props: CurrentComponentProp) => {
	const { leaveNotice } = props;

	const { userInfo } = useContext_Account();
	const { students } = useContext_Students();

	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const onModalClose = () => {
		setModalOpen(false);
	};

	return (
		<>
			<div className={`flex flex-row gap-4 px-4 py-2 bg-white rounded-xl hover:bg-slate-200 cursor-pointer ${hover_transition}`} onClick={() => { setModalOpen(true); }}>
				{student_access_only(userInfo.result.profile_position) ? (
					<Forms_rolodex_card_approvalIcon teacher_status={leaveNotice.leave_notice_teacher_status} head_status={leaveNotice.leave_notice_head_status} />
				) : (
					<div className="hidden sm:block">
						{students.status ? (
							<img src={`${CDN_ENDPOINT}${student_image_from_ID(leaveNotice.leave_notice_student_ID, students.result)}`} className={`${background_color_from_major[student_major_from_ID(leaveNotice.leave_notice_student_ID, students.result)] ?? "bg-primary"} rounded-full w-[50px] h-[50px]`} />
						) : (
							<div className="rounded-full w-[50px] h-[50px] bg-gray-500 opacity-25"></div>
						)}
					</div>
				)}
				<div className="flex flex-col">
					<h1 className="text-lg line-clamp-2">{leaveNotice.leave_notice_description}</h1>
					<h1 className="opacity-50 text-md">
						{formatDistanceToNow(
							change_to_date(leaveNotice.leave_notice_create_datetime),
							{ addSuffix: true, locale: i18n.language === "th" ? th : enUS },
						)}</h1>
				</div>
			</div>
			<LeaveNotices_modal leaveNotice={leaveNotice} open={modalOpen} onModalClose={onModalClose} />
		</>
	);
};

export default LeaveNotices_rolodex_card;