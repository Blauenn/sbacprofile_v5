import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { LeaveNoticeInterface } from "../../../interfaces/forms.interface";
import fade_transition from "../../../animations/fade_transition.transition";
// Contexts //
import { useContext_Students } from "../../../contexts/Profiles/Students/Student.context";
// Components //
import LeaveNotices_rolodex_card from "./card/LeaveNotices_rolodex_card.component";

interface CurrentComponentProp {
	leaveNotices: LeaveNoticeInterface[];
	evaluateAs: number;
}

const LeaveNotices_rolodex = (props: CurrentComponentProp) => {
	const { leaveNotices, evaluateAs } = props;

	const { fetchStudents } = useContext_Students();

	useEffect(() => {
		fetchStudents();
	}, []);

	const { t } = useTranslation("forms_common");

	return (
		<div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{leaveNotices.length ? (
				leaveNotices.map((leaveNotice: LeaveNoticeInterface) => (
					<LeaveNotices_rolodex_card key={leaveNotice.leave_notice_ID} leaveNotice={leaveNotice} evaluateAs={evaluateAs} />
				))
			) : (
				<h1 className="text-xl opacity-50">{t("noLeaveNotices_message")}</h1>
			)}
		</div>
	);
};

export default fade_transition(LeaveNotices_rolodex);