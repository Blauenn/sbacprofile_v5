import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import fade_transition from '../../../animations/fade_transition.transition';
import { LeaveNoticeInterface } from "../../../interfaces/forms.interface";
// Functions //
import { student_major_from_ID } from "../../../functions/information/students.function";
// Contexts providers //
import { useContext_Students } from '../../../contexts/Profiles/Students/Student.context';
// Contexts //
import { useContext_Account } from "../../../contexts/Account.context";
import { useContext_LeaveNotices } from '../../../contexts/forms/LeaveNotice.context';
// Components //
import Page_header_return from "../../../components/Miscellaneous/common/Page_header_return.component";
import LeaveNotices_rolodex from '../../../components/Forms/LeaveNotices/LeaveNotices_rolodex.component';
import Skeleton_Forms_rolodex from '../../../components/Forms/Skeleton_Forms_rolodex.component';

const Head_LeaveNotices = () => {
	const { userInfo } = useContext_Account();
	const { leaveNotices, fetchLeaveNotices } = useContext_LeaveNotices();
	const { students, fetchStudents } = useContext_Students();

	const [majorLeaveNotices, setMajorLeaveNotices] = useState<LeaveNoticeInterface[]>([]);

	useEffect(() => {
		fetchLeaveNotices();
		fetchStudents();

		const leaveNoticesInMajor = leaveNotices.result.filter((leaveNotice: LeaveNoticeInterface) => student_major_from_ID(leaveNotice.leave_notice_student_ID, students.result) === userInfo.result.profile_major && leaveNotice.leave_notice_teacher_status === 2);
		setMajorLeaveNotices(leaveNoticesInMajor);
	}, [leaveNotices, students]);

	const { t } = useTranslation("page_head_leaveNotices");

	return (
		<>
			<Page_header_return text={t("header")} />

			{leaveNotices.status ? (
				<LeaveNotices_rolodex leaveNotices={majorLeaveNotices} />
			) : (
				<Skeleton_Forms_rolodex />
			)
			}
		</>
	);
};

export default fade_transition(Head_LeaveNotices);