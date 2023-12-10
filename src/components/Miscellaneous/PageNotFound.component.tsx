import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import transition from "../../animations/fade_transition.transition";

const PageNotFound = () => {
	const { t } = useTranslation("pageNotFound");

	return (
		<div className="w-full">
			<div className="flex flex-col justify-center items-center gap-4">
				<h1 className="text-6xl font-semibold">404</h1>
				<h1 className="text-2xl">{t("message")}</h1>
				<NavLink to="/home">
					<h1 className="text-lg text-center text-blue-500 hover:text-blue-400 mb-2 cursor-pointer">
						<i className="fa-solid fa-home me-4"></i>
						{t("button_title")}
					</h1>
				</NavLink>
			</div>
		</div>
	);
};

export default transition(PageNotFound);
