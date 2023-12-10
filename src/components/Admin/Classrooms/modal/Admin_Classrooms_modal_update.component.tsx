import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from "../../../../i18n";
import Modal from "../../../Extended/Modal";
import Button_feedback from "../../../Extended/Button_feedback";
import { TeacherInterface } from "../../../../interfaces/profiles.interface";
import { ClassroomInterface, MajorInterface } from "../../../../interfaces/common.interface";
// Functions //
import { classroom_update } from "../../../../functions/CRUD/Classrooms/classroom_update.function";
// Contexts //
import { useContext_Classrooms } from "../../../../contexts/Classroom.context";
import { useContext_Majors } from "../../../../contexts/Major.context";
import { useContext_Teachers } from "../../../../contexts/Profiles/Teachers/Teacher.context";
// Constants //
import { major_name_thai, major_name_german, major_name } from "../../../../constants/names/major_name";
import SelectField from "../../../Extended/SelectField";
import TextField from "../../../Extended/TextField";
import { border_color_from_major, hover_background_color_from_major, text_color_from_major } from "../../../../constants/styles/colors/color_from_major.constant";

interface CurrentComponentProp {
	classroom: ClassroomInterface;
	open: boolean;
	onModalClose: () => void;
}

const Admin_Classrooms_modal_update = (props: CurrentComponentProp) => {
	const { classroom, open, onModalClose } = props;

	const { fetchClassrooms } = useContext_Classrooms();
	const { teachers, fetchTeachers } = useContext_Teachers();
	const { majors, fetchMajors } = useContext_Majors();

	useEffect(() => {
		fetchMajors();
		fetchTeachers();
	}, []);

	const [classroomUpdateObject, setClassroomUpdateObject] = useState({
		classroom_ID: classroom.classroom_ID,
		classroom_level: classroom.classroom_level,
		classroom_class: classroom.classroom_class,
		classroom_major: classroom.classroom_major,
		classroom_homeroom_teacher: classroom.classroom_homeroom_teacher,
	});

	const [validationErrors, setValidationErrors] = useState({
		classroom_level: "",
		classroom_class: "",
		classroom_major: "",
		classroom_homeroom_teacher: "",
	});

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);

	const handleModalClose = () => {
		setClassroomUpdateObject({
			classroom_ID: classroom.classroom_ID,
			classroom_level: classroom.classroom_level,
			classroom_class: classroom.classroom_class,
			classroom_major: classroom.classroom_major,
			classroom_homeroom_teacher: classroom.classroom_homeroom_teacher,
		});
		setValidationErrors({
			classroom_level: "",
			classroom_class: "",
			classroom_major: "",
			classroom_homeroom_teacher: "",
		});

		setIsSubmitting(false);
		setIsUpdateSuccess(false);

		onModalClose();
	};

	const setObjectAndSubmit = async () => {
		setIsSubmitting(true);

		const submissionStatus = await classroom_update(
			classroomUpdateObject,
			setValidationErrors
		);

		if (submissionStatus) {
			fetchClassrooms(true);

			setIsSubmitting(false);
			setIsUpdateSuccess(true);
		} else {
			setIsSubmitting(false);
			setIsUpdateSuccess(false);
		}
	};

	const { t } = useTranslation("crud_modal_classrooms");

	return (
		<Modal
			open={open}
			onModalClose={handleModalClose}
			icon="fa-solid fa-pencil"
			title={t("update_modal_header")}>
			<div className="grid grid-cols-1 gap-4">
				<div className="grid grid-cols-2 col-span-1 gap-4">
					{/* Classroom level */}
					<SelectField
						label={t("crud_modal_level_label")}
						name="classroom_level"
						className="col-span-1"
						object={classroomUpdateObject}
						setObject={setClassroomUpdateObject}
						value={classroomUpdateObject.classroom_level}
						validation={validationErrors.classroom_level}>
						<option value="0">
							{t("crud_modal_level_option1")}
						</option>
						<option value="1">
							{t("crud_modal_level_option_lower1")}
						</option>
						<option value="2">
							{t("crud_modal_level_option_lower2")}
						</option>
						<option value="3">
							{t("crud_modal_level_option_lower3")}
						</option>
						<option value="4">
							{t("crud_modal_level_option_higher1")}
						</option>
						<option value="5">
							{t("crud_modal_level_option_higher2")}
						</option>
					</SelectField>
					{/* Classroom class */}
					<TextField
						label={t("crud_modal_class_label")}
						name="classroom_class"
						className="col-span-1"
						object={classroomUpdateObject}
						setObject={setClassroomUpdateObject}
						value={classroomUpdateObject.classroom_class}
						validation={validationErrors.classroom_class}
					/>
				</div>
				{/* Classroom major */}
				<SelectField
					label={t("crud_modal_major_label")}
					name="classroom_major"
					className="col-span-1"
					object={classroomUpdateObject}
					setObject={setClassroomUpdateObject}
					value={classroomUpdateObject.classroom_major}
					validation={validationErrors.classroom_major}>
					<option value="0">{t("crud_modal_major_label")}</option>
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
				{/* Classroom homeroom teacher */}
				<SelectField
					label={t("crud_modal_teachers_label")}
					name="classroom_homeroom_teacher"
					className="col-span-1"
					object={classroomUpdateObject}
					setObject={setClassroomUpdateObject}
					value={classroomUpdateObject.classroom_homeroom_teacher}
					validation={validationErrors.classroom_homeroom_teacher}>
					<option value="0">No teacher</option>
					{teachers.result.map((teacher: TeacherInterface) => (
						<option key={teacher.teacher_ID} value={teacher.teacher_ID}>
							{teacher.teacher_ID} - {teacher.teacher_first_name}{" "}
							{teacher.teacher_last_name}
						</option>
					))}
				</SelectField>
				{/* Submit button */}
				<Button_feedback
					label={t("update_modal_submit_button_title")}
					successLabel={t("update_modal_submit_success_message")}
					icon="fa-solid fa-pencil"
					background_color={hover_background_color_from_major[classroom.classroom_major]}
					border_color={border_color_from_major[classroom.classroom_major]}
					text_color={text_color_from_major[classroom.classroom_major]}
					isPending={isSubmitting}
					isSuccess={isUpdateSuccess}
					onClick={() => {
						setObjectAndSubmit();
					}}
				/>
			</div>
		</Modal>
	);
};

export default Admin_Classrooms_modal_update;
