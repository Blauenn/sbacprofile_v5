import { useTranslation } from "react-i18next";
import fade_transition from "../../../../animations/fade_transition.transition";
// Constants //
import { club_information_card_style } from "../../../../constants/styles/club/club_information_card.constant";

const Teacher_Club_noClub = () => {
	const { t } = useTranslation("page_teacher_club");

	return (
		<div className={`${club_information_card_style}`}>
			<div className="flex flex-col gap-2">
				<div>
					<h1 className="opacity-50">
						{t("currentClub_title")}
					</h1>
					<h1 className={`text-2xl font-semibold`}>
						{t("noClub_message")}
					</h1>
				</div>
			</div>
		</div>
	);
};

export default fade_transition(Teacher_Club_noClub);