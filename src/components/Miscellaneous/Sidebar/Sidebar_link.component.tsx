import { NavLink, useLocation } from "react-router-dom";
import { Tooltip } from "@mui/material";
// Constants //
import { hover_transition } from "../../../constants/styles/transition.style";

const sidebar_li = "flex justify-center sidebar-links";
const sidebar_i = "text-2xl text-white opacity-50 hover:opacity-100";

interface CurrentComponentProp {
	title: string;
	to: string; // URL //
	icon: string;
	margin?: string;
}

const Sidebar_link = (props: CurrentComponentProp) => {
	const { title, to, icon, margin } = props;

	const location = useLocation();

	return (
		<li className={`${sidebar_li} ${margin || ""}`}>
			<Tooltip
				title={title}
				placement="right"
				arrow
			>
				<NavLink to={to}>
					<i
						className={`${icon} ${sidebar_i} ${hover_transition} ${location.pathname === to ? "opacity-100" : null
							}`}
					></i>
				</NavLink>
			</Tooltip>
		</li>
	);
};

export default Sidebar_link;
