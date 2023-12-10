import { NavLink } from "react-router-dom";
// Constants //
import { hover_transition } from "../../../constants/styles/transition.style";

interface CurrentComponentProp {
	url: string;
	color: string;
	icon: string;
	title: string;
	description: string;
	badgeContent?: string;
}

const Dashboard_button = (props: CurrentComponentProp) => {
	const { url, color, icon, title, description, badgeContent } = props;

	return (
		<div>
			<NavLink to={url}>
				<div
					className={`relative flex flex-row justify-between h-full shadow-sm rounded-xl px-4 py-2 | bg-white hover:bg-slate-200 cursor-pointer ${hover_transition}`}>
					<div className="flex flex-row items-center gap-4 overflow-hidden">
						<i className={`text-xl sm:text-2xl ${icon} ${color}`}></i>
						<div className="flex flex-col">
							<h1 className="text-lg font-semibold sm:text-xl">{title}</h1>
							<h1 className="opacity-50 text-md sm:text-lg line-clamp-1">{description}</h1>
						</div>
					</div>
					{/* Badge */}
					{badgeContent ? (
						<div className="absolute -right-2 -top-2">
							<div className="flex justify-center items-center w-[30px] h-[30px] bg-red-500 rounded-full">
								<h1 className="text-white">{badgeContent}</h1>
							</div>
						</div>
					) : null}
				</div>
			</NavLink>
		</div>
	);
};

export default Dashboard_button;
