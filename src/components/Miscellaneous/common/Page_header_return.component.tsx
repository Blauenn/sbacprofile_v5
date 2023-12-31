import { NavLink } from "react-router-dom";
import { hover_transition } from "../../../constants/styles/transition.style";

interface CurrentComponentProp {
	text: string;
	subtext?: string;
}

const Page_header_return = (props: CurrentComponentProp) => {
	const { text, subtext } = props;

	return (
		<div className="flex flex-row items-center justify-between mb-8">
			<h1 className={`text-2xl sm:text-3xl hover:text-primary | font-semibold ${hover_transition}`}>
				<NavLink to={"/dashboard"}>
					<i className="fa-solid fa-chevron-left me-4"></i>
					{text}
				</NavLink>
			</h1>
			{subtext != "" ? (
				<h1 className="text-2xl opacity-75">{subtext}</h1>
			) : null}
		</div>
	);
};

export default Page_header_return;
