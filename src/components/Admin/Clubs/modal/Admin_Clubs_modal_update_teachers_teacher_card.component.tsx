import Avatar from "../../../Extended/Avatar";
// Contexts //
import { useContext_Teachers } from '../../../../contexts/Profiles/Teachers/Teacher.context';
// Functions //
import { teacher_image_from_ID, teacher_major_from_ID, teacher_name_from_ID } from '../../../../functions/information/teachers.function';

interface CurrentComponentProp {
	teacher_ID: number;
}

const Admin_Clubs_modal_update_teachers_teacher_card = (props: CurrentComponentProp) => {
	const { teacher_ID } = props;

	const { teachers } = useContext_Teachers();

	return (
		<div className="flex flex-row items-center gap-4">
			<Avatar
				imageURL={`${teacher_image_from_ID(
					teacher_ID,
					teachers.result
				)}`}
				profileMajor={teacher_major_from_ID(
					teacher_ID,
					teachers.result
				)}
			/>
			<h1 className="font-semibold">
				{teacher_name_from_ID(teacher_ID, teachers.result)}
			</h1>
		</div>
	);
};

export default Admin_Clubs_modal_update_teachers_teacher_card;