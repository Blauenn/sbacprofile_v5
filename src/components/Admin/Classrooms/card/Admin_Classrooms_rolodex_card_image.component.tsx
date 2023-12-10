import { ClassroomInterface } from "../../../../interfaces/common.interface";
// Functions //
import { teacher_image_from_ID, teacher_major_from_ID } from "../../../../functions/information/teachers.function";
// Contexts //
import { useContext_Teachers } from "../../../../contexts/Profiles/Teachers/Teacher.context";
// Constants //
import { background_color_from_major } from "../../../../constants/styles/colors/color_from_major.constant";
import { CDN_ENDPOINT } from "../../../../constants/ENDPOINTS";
import fade_transition from "../../../../animations/fade_transition.transition";

interface CurrentComponentProp {
	classroom: ClassroomInterface;
}

const Admin_Classrooms_rolodex_card_image = (props: CurrentComponentProp) => {
	const { classroom } = props;

	const { teachers } = useContext_Teachers();

	return (
		<>
			<img src={`${CDN_ENDPOINT}${teacher_image_from_ID(classroom.classroom_homeroom_teacher, teachers.result)}`} className={`w-[50px] h-[50px] rounded-full ${background_color_from_major[teacher_major_from_ID(classroom.classroom_homeroom_teacher, teachers.result)]}`} />
		</>
	);
};

export default fade_transition(Admin_Classrooms_rolodex_card_image);