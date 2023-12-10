// Functions //
import { student_image_from_ID, student_major_from_ID, student_classroom_from_ID, student_name_from_ID } from "../../functions/information/students.function";
// Contexts //
import { useContext_Students } from "../../contexts/Profiles/Students/Student.context";
import { background_color_from_major } from "../../constants/styles/colors/color_from_major.constant";
// Constants //
import { CDN_ENDPOINT } from "../../constants/ENDPOINTS";

interface CurrentComponentProp {
	form_ID: number | undefined;
	form_student_ID: number;
}

const Forms_student_information = (props: CurrentComponentProp) => {
	const { form_ID, form_student_ID } = props;

	const { students } = useContext_Students();

	return (
		<div className="flex flex-row gap-8">
			<img
				src={`${CDN_ENDPOINT}${student_image_from_ID(
					form_student_ID,
					students.result
				)}`}
				className={`${background_color_from_major[
					student_major_from_ID(form_student_ID, students.result)
				] ?? "bg-primary"
					} hidden sm:block w-[100px] rounded-full`}
			/>
			<div>
				<h1 className="text-lg opacity-50 sm:text-xl">
					{student_classroom_from_ID(form_student_ID, students.result)}
				</h1>
				<h1 className="mb-2 text-xl font-semibold sm:text-2xl line-clamp-1">
					{student_name_from_ID(form_student_ID, students.result)}
				</h1>
				<h1 className="opacity-50 text-md sm:text-lg">Document #{form_ID}</h1>
			</div>
		</div>
	);
};

export default Forms_student_information;
