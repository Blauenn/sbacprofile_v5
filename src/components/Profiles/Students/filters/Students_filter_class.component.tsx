import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import SelectField from "../../../Extended/SelectField";
import { ClassroomInterface } from "../../../../interfaces/common.interface";
// Contexts //
import { useContext_Students_filters } from "../../../../contexts/Profiles/Students/Student_filters.context";

interface ClassFilterProps {
	classes: ClassroomInterface[];
}

const Student_filter_class = (props: ClassFilterProps) => {
	const { classes } = props;

	useEffect(() => { }, [classes]);

	const { filters, setFilters } = useContext_Students_filters();

	const { t } = useTranslation("rolodex_filters");

	const sortedClasses = classes.sort(
		(a: ClassroomInterface, b: ClassroomInterface) =>
			a.classroom_class - b.classroom_class
	);

	if (sortedClasses.length > 0) {
		return (
			<SelectField
				customID="3"
				label={t("label_class")}
				name="selected_class"
				object={filters}
				setObject={setFilters}>
				<option value="0">{t("option_all_title")}</option>
				{sortedClasses.map((classroom: ClassroomInterface) => (
					<option
						key={classroom.classroom_ID}
						value={classroom.classroom_class}>
						{classroom.classroom_class}
					</option>
				))}
			</SelectField>
		);
	} else {
		return (
			<SelectField
				customID="3"
				label={t("label_class")}
				disabled
				object={filters}
				setObject={setFilters}>
				<option value="0">{t("option_all_title")}</option>
			</SelectField>
		);
	}
};

export default Student_filter_class;
