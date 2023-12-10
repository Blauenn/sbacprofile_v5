import { useTranslation } from "react-i18next";
import { LeaveNoticeInterface } from "../../../../../interfaces/forms.interface";
// Functions //
import { student_major_from_ID } from "../../../../../functions/information/students.function";
// Contexts //
import { useContext_Students } from "../../../../../contexts/Profiles/Students/Student.context";
// Constants //
import { background_color_from_major, border_color_from_major, text_color_from_major } from "../../../../../constants/styles/colors/color_from_major.constant";
import { hover_transition } from "../../../../../constants/styles/transition.style";

interface CurrentComponentProp {
	leaveNotice: LeaveNoticeInterface;
	functionToRun: () => void;
}

const LeaveNotices_evaluate_button = (props: CurrentComponentProp) => {
	const { leaveNotice, functionToRun } = props;

	const { students } = useContext_Students();

	const studentMajor = student_major_from_ID(
		leaveNotice.leave_notice_student_ID,
		students.result
	);

	const { t } = useTranslation("forms_leaveNotices");

	return (
		<div>
			<button
				className={`border ${border_color_from_major[studentMajor]} ${text_color_from_major[studentMajor]} hover:${background_color_from_major[studentMajor]} hover:text-white shadow-sm px-4 py-2 rounded-xl ${hover_transition}`}
				onClick={() => {
					functionToRun();
				}}>
				{t("evaluate_button_title")}
			</button>
		</div>
	);
};

export default LeaveNotices_evaluate_button;
