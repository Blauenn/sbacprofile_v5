import { useTranslation } from "react-i18next";
import { hover_transition } from "../../../../constants/styles/transition.style";

interface CurrentComponentProp {
	functionToRun: () => void;
}

const LeaveNotices_delete_button = (props: CurrentComponentProp) => {
	const { functionToRun } = props;

	const { t } = useTranslation("forms_leaveNotices");

	return (
		<div>
			<button
				className={`border border-error text-error hover:bg-error hover:text-white shadow-sm px-4 py-2 rounded-xl ${hover_transition}`}
				onClick={() => {
					functionToRun();
				}}>
				{t("delete_button_title")}
			</button>
		</div>
	);
};

export default LeaveNotices_delete_button;