import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import { ClubInterface } from "../../interfaces/clubs.interface";
// Constants //
import { major_name_thai, major_name_german, major_name } from "../../constants/names/major_name";
import { text_color_from_major } from "../../constants/styles/colors/color_from_major.constant";

interface CurrentComponentProp {
	selfClub: ClubInterface;
}

const Club_clubName = (props: CurrentComponentProp) => {
	const { selfClub } = props;

	const { t } = useTranslation("page_student_club");

	return (
		<div className="flex flex-col">
			<h1 className="opacity-50">{t("currentClub_title")}</h1>
			<h1
				className={`${text_color_from_major[selfClub.club_major]
					} text-2xl font-semibold mb-2`}>
				{selfClub.club_name}
			</h1>
			<h1 className="opacity-50">
				{i18n.language === "th"
					? major_name_thai[selfClub.club_major]
					: i18n.language === "de"
						? major_name_german[selfClub.club_major]
						: major_name[selfClub.club_major]}
			</h1>
		</div>
	);
};

export default Club_clubName;
