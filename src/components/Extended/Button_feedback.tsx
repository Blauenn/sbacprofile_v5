import { ButtonHTMLAttributes } from "react";
// Constants //
import { hover_transition } from "../../constants/styles/transition.style";
import { useTranslation } from "react-i18next";

interface CurrentComponentProp extends ButtonHTMLAttributes<HTMLButtonElement> {
	label: string;
	successLabel?: string;
	icon?: string;
	background_color?: string,
	border_color?: string;
	text_color?: string;
	isSuccess: boolean;
	isPending: boolean;
}

const Button_feedback = (props: CurrentComponentProp) => {
	const { label, successLabel, icon, background_color, border_color, text_color = "text-primary", isSuccess, isPending, disabled, ...buttonProps } = props;

	const { t } = useTranslation("common");

	let button_background_color: string = "";
	let button_border_color: string = "";
	let button_text_color: string = "";
	let button_content: React.ReactNode;

	switch (true) {
		case isPending:
			button_background_color = "bg-gray-500";
			button_text_color = "text-white";
			button_content = (
				<><i className="fa-solid fa-spinner me-2 animate-spin"></i>{t("button_submitting_message")}</>
			);
			break;
		case isSuccess:
			button_border_color = "border-success";
			button_text_color = "text-success hover:text-success";
			button_content = (
				<><i className="fa-solid fa-circle-check me-4" />{successLabel}</>
			);
			break;
		case disabled:
			button_background_color = "bg-gray-500"
			button_border_color = "border-gray-500";
			button_text_color = "text-white";
			button_content = (
				<><i className={`${icon} me-4`} />{label}</>
			);
			break;
		default:
			button_background_color = background_color || "hover:bg-primary";
			button_border_color = border_color || "border-primary";
			button_text_color = `${text_color} hover:text-white` || "text-primary";
			button_content = (
				<><i className={`${icon} me-4`} />{label}</>
			);
			break;
	}

	return (
		<button {...buttonProps} className={`border ${button_background_color} ${button_border_color} ${button_text_color} font-semibold px-4 py-2 rounded-xl ${hover_transition}`} disabled={disabled || isPending || isSuccess}>
			{button_content}
		</button>
	);
};

export default Button_feedback;