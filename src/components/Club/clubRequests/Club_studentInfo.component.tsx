import i18n from "../../../i18n";
// Contexts //
import { useContext_Students } from "../../../contexts/Profiles/Students/Student.context";
// Constants //
import { background_color_from_major } from "../../../constants/styles/colors/color_from_major.constant";
import { student_image_from_ID, student_major_from_ID, student_name_thai_from_ID, student_name_from_ID } from "../../../functions/information/students.function";
import { CDN_ENDPOINT } from "../../../constants/ENDPOINTS";

interface CurrentComponentProp {
	student_ID: number;
}

const Club_studentInfo = (props: CurrentComponentProp) => {
	const { student_ID } = props;

	const { students } = useContext_Students();

	return (
		<div className="flex flex-row items-center gap-4">
			<img
				src={`${CDN_ENDPOINT}${student_image_from_ID(
					student_ID,
					students.result
				)}`}
				className={`${background_color_from_major[
					student_major_from_ID(student_ID, students.result)
				]
					} w-[32px] h-[32px] rounded-full`}
			/>
			<h1 className="line-clamp-1">
				{i18n.language === "th"
					? student_name_thai_from_ID(student_ID, students.result)
					: student_name_from_ID(student_ID, students.result)}
			</h1>
		</div>
	);
};

export default Club_studentInfo;
