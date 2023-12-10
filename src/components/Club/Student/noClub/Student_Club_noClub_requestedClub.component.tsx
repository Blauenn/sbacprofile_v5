import i18n from "i18next";
import { useTranslation } from "react-i18next";
// Constants //
import { text_color_from_major } from "../../../../constants/styles/colors/color_from_major.constant";
import { major_name_thai, major_name_german, major_name } from "../../../../constants/names/major_name";

interface CurrentComponentProp {
	club_name: string;
	club_major: number;
}

const Student_Club_noClub_requestedClub = (props: CurrentComponentProp) => {
	const { club_name, club_major } = props;

	const { t } = useTranslation("page_student_club");

	return (
		<div className="flex flex-col gap-2">
			<h1 className="opacity-50">{t("requestedClub_title")}</h1>
			<h1
				className={`${text_color_from_major[club_major]} text-2xl font-semibold mb-2`}>
				{club_name}
			</h1>
			<h1 className="opacity-50">
				{i18n.language === "th"
					? major_name_thai[club_major]
					: i18n.language === "de"
						? major_name_german[club_major]
						: major_name[club_major]}
			</h1>
		</div>
	);
};

export default Student_Club_noClub_requestedClub;
