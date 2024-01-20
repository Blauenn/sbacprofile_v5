import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { LeaveNoticeInterface } from "../../interfaces/forms.interface";
import { ClassroomInterface } from "../../interfaces/common.interface";
import fade_transition from "../../animations/fade_transition.transition";
// Functions //
import { student_class_from_ID, student_level_from_ID } from "../../functions/information/students.function";
// Contexts //
import { useContext_LeaveNotices } from "../../contexts/forms/LeaveNotice.context";
import { useContext_Classrooms } from "../../contexts/Classroom.context";
import { useContext_Students } from "../../contexts/Profiles/Students/Student.context";
import { useContext_Account } from "../../contexts/Account.context";
// Components //
import LeaveNotices_rolodex from '../../components/Forms/LeaveNotices/LeaveNotices_rolodex.component';
import Skeleton_Forms_rolodex from "../../components/Forms/Skeleton_Forms_rolodex.component";
import Page_header_return from "../../components/Miscellaneous/common/Page_header_return.component";

const Teacher_LeaveNotices = () => {
	const { userInfo } = useContext_Account();
	const { leaveNotices, fetchLeaveNotices } = useContext_LeaveNotices();
	const { students, fetchStudents } = useContext_Students();
	const { classrooms, fetchClassrooms } = useContext_Classrooms();

	const [studentLeaveNotices, setStudentLeaveNotices] = useState<LeaveNoticeInterface[]>([]);

	useEffect(() => {
		fetchLeaveNotices();
		fetchStudents();
		fetchClassrooms();

		const filteredClassrooms = classrooms.result.filter((classroom: ClassroomInterface) => (
			classroom.classroom_homeroom_teacher === userInfo.result.profile_ID
		));
		const leaveNoticesFromHomeroomStudents = [...leaveNotices.result].filter((leaveNotice: LeaveNoticeInterface) => (
			filteredClassrooms.some((classroom: ClassroomInterface) => (
				classroom.classroom_level === student_level_from_ID(leaveNotice.leave_notice_student_ID, students.result) &&
				classroom.classroom_class === student_class_from_ID(leaveNotice.leave_notice_student_ID, students.result)
			))
		));

		setStudentLeaveNotices(leaveNoticesFromHomeroomStudents);
	}, [leaveNotices, classrooms, students]);

	const { t } = useTranslation("page_teacher_leaveNotices");

	return (
		<>
			<Page_header_return text={t("header")} />

			<div className="flex flex-col gap-4">
				{leaveNotices.status ? (
					<LeaveNotices_rolodex leaveNotices={studentLeaveNotices} evaluateAs={3} />
				) : (
					<Skeleton_Forms_rolodex />
				)}
			</div>
		</>
	);
};

export default fade_transition(Teacher_LeaveNotices);