import { hover_transition } from "../../constants/styles/transition.style";

interface CurrentComponentProp {
	display: boolean;
	setDisplay: React.Dispatch<React.SetStateAction<boolean>>;
}

const Button_display_toggle = (props: CurrentComponentProp) => {
	const { display, setDisplay } = props;

	return (
		<div className="flex items-center h-full">
			<button type="button" onClick={() => { setDisplay(!display); }} className={`flex items-center justify-center w-[58px] h-[58px] border rounded-xl ${hover_transition} hover:bg-primary group`}>
				<i className={`text-xl opacity-50 fa-solid ${display ? "fa-eye-slash" : "fa-eye"} group-hover:text-white group-hover:opacity-100 ${hover_transition}`}></i>
			</button>
		</div>
	);
};

export default Button_display_toggle;