import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import i18n from "../../../i18n";
import TextField from "../../Extended/TextField";
import SelectField from "../../Extended/SelectField";
import { MajorInterface } from "../../../interfaces/common.interface";
// Contexts //
import { useContext_Majors } from "../../../contexts/Major.context";
import { useContext_Clubs_filters } from "../../../contexts/Clubs/Club_filters.context";
// Constants //
import { major_name_thai, major_name_german, major_name } from "../../../constants/names/major_name";

interface CurrentComponentProp {
	hide_major?: boolean;
}

const Clubs_filters = (props: CurrentComponentProp) => {
	const { hide_major } = props;

	const { majors, fetchMajors } = useContext_Majors();
	const { filters, setFilters } = useContext_Clubs_filters();

	useEffect(() => {
		fetchMajors();
	}, []);

	const { t } = useTranslation("rolodex_filters");

	return (
		<div className="flex flex-col justify-between gap-4 p-4 bg-white shadow-sm md:flex-row rounded-xl">
			{/* Major */}
			{hide_major ?? (
				<div className="flex md:w-1/3">
					<SelectField
						label={t("label_major")}
						name="selected_major"
						object={filters}
						setObject={setFilters}>
						<option value="0">{t("option_all_title")}</option>
						{majors.result.map((major: MajorInterface) => (
							<option key={major.major_ID} value={major.major_ID}>
								{i18n.language === "th"
									? major_name_thai[major.major_ID]
									: i18n.language === "de"
										? major_name_german[major.major_ID]
										: major_name[major.major_ID]}
							</option>
						))}
					</SelectField>
				</div>
			)}
			{/* Search */}
			<div className="md:w-1/3">
				<TextField
					label={t("placeholder_search_clubs")}
					name="search_field"
					object={filters}
					setObject={setFilters}
				/>
			</div>
		</div>
	);
};

export default Clubs_filters;