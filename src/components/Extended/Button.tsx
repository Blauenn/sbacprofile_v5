import { ButtonHTMLAttributes } from "react";
// Constants //
import { hover_transition } from "../../constants/styles/transition.style";

interface CurrentComponentProp extends ButtonHTMLAttributes<HTMLButtonElement> {
	label: string;
	icon?: string;
	background_color?: string,
	border_color?: string;
	text_color?: string;
}

const disabled = "disabled:bg-gray-500 disabled:text-white disabled:text-opacity-50 disabled:border disabled:border-opacity-0";

const Button = (props: CurrentComponentProp) => {
	const { label, icon, background_color, border_color, text_color, ...buttonProps } = props;

	return (
		<button {...buttonProps} className={`border ${background_color ?? "hover:bg-primary"} ${border_color ?? "border-primary"} ${text_color ?? "text-primary"} font-semibold px-4 py-2 rounded-xl hover:text-white ${hover_transition} ${disabled}`}>
			{icon ? (
				<i className={`${icon} me-4`}></i>
			) : null}
			{label}
		</button>
	);
};

export default Button;