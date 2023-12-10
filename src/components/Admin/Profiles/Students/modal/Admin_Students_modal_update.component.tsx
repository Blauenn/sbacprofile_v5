import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from "../../../../../i18n";
import Button from "../../../../Extended/Button";
import Button_feedback from "../../../../Extended/Button_feedback";
import ImageField from "../../../../Extended/ImageField";
import Modal from "../../../../Extended/Modal";
import SelectField from "../../../../Extended/SelectField";
import TextField from "../../../../Extended/TextField";
import { MajorInterface } from "../../../../../interfaces/common.interface";
import { StudentInterface } from "../../../../../interfaces/profiles.interface";
// Functions //
import { student_update } from "../../../../../functions/CRUD/Students/student_update.function";
import { admin_access_only } from "../../../../../functions/permission_check.function";
// Contexts //
import { useContext_Account } from "../../../../../contexts/Account.context";
import { useContext_Majors } from "../../../../../contexts/Major.context";
import { useContext_Students } from "../../../../../contexts/Profiles/Students/Student.context";
// Components //
import Admin_Students_modal_delete from "./Admin_Students_modal_delete.component";
// Constants //
import { major_name_thai, major_name_german, major_name } from "../../../../../constants/names/major_name";

interface CurrentComponentProp {
	student: StudentInterface;
	open: boolean;
	onModalClose: () => void;
}

const Admin_Students_modal_update = (props: CurrentComponentProp) => {
	const { student, open, onModalClose } = props;

	const { userInfo } = useContext_Account();
	const { fetchStudents } = useContext_Students();
	const { majors, fetchMajors } = useContext_Majors();

	useEffect(() => {
		fetchMajors();
	}, []);

	const [studentUpdateObject, setStudentUpdateObject] = useState({
		primary_student_ID: student.primary_student_ID,
		student_ID: student.student_ID,
		student_position: student.student_position,
		student_first_name: student.student_first_name,
		student_last_name: student.student_last_name,
		student_nickname: student.student_nickname,
		student_first_name_thai: student.student_first_name_thai,
		student_last_name_thai: student.student_last_name_thai,
		student_nickname_thai: student.student_nickname_thai,
		student_gender: student.student_gender,
		student_major: student.student_major,
		student_level: student.student_level,
		student_class: student.student_class,
		student_phone: student.student_phone,
		student_line_ID: student.student_line_ID,
		student_image: student.student_image,
		student_email: student.student_email,
	});
	const [validationErrors, setValidationErrors] = useState({
		student_ID: "",
		student_position: "",
		student_first_name: "",
		student_last_name: "",
		student_nickname: "",
		student_first_name_thai: "",
		student_last_name_thai: "",
		student_nickname_thai: "",
		student_gender: "",
		student_major: "",
		student_level: "",
		student_class: "",
		student_phone: "",
		student_line_ID: "",
		student_email: "",
	});
	const [studentUpdateImage, setStudentUpdateImage] = useState(null);

	const [imagePreview, setImagePreview] = useState(null);
	const [fileSizeNotice, setFileSizeNotice] = useState(false);

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);

	const handleModalClose = () => {
		setStudentUpdateObject({
			primary_student_ID: student.primary_student_ID,
			student_ID: student.student_ID,
			student_position: student.student_position,
			student_first_name: student.student_first_name,
			student_last_name: student.student_last_name,
			student_nickname: student.student_nickname,
			student_first_name_thai: student.student_first_name_thai,
			student_last_name_thai: student.student_last_name_thai,
			student_nickname_thai: student.student_nickname_thai,
			student_major: student.student_major,
			student_gender: student.student_gender,
			student_level: student.student_level,
			student_class: student.student_class,
			student_phone: student.student_phone,
			student_line_ID: student.student_line_ID,
			student_image: student.student_image,
			student_email: student.student_email,
		});
		setValidationErrors({
			student_ID: "",
			student_position: "",
			student_first_name: "",
			student_last_name: "",
			student_nickname: "",
			student_first_name_thai: "",
			student_last_name_thai: "",
			student_nickname_thai: "",
			student_gender: "",
			student_major: "",
			student_level: "",
			student_class: "",
			student_phone: "",
			student_line_ID: "",
			student_email: "",
		});
		setStudentUpdateImage(null);

		setImagePreview(null);
		setFileSizeNotice(false);

		setIsSubmitting(false);
		setIsUpdateSuccess(false);

		onModalClose();
	};

	const setObjectAndSubmit = async () => {
		setIsSubmitting(true);

		const submissionStatus = await student_update(
			studentUpdateObject,
			studentUpdateImage,
			setValidationErrors
		);

		if (submissionStatus) {
			fetchStudents(true);

			setIsSubmitting(false);
			setIsUpdateSuccess(true);
		} else {
			setIsSubmitting(false);
			setIsUpdateSuccess(false);
		}
	};

	const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
	const onDeleteModalClose = () => {
		setDeleteModalOpen(false);
	};

	const { t } = useTranslation("crud_modal_students");

	return (
		<Modal
			open={open}
			onModalClose={handleModalClose}
			icon="fa-solid fa-pencil"
			title={t("update_modal_header")}
			overflow>
			<div className="grid grid-cols-1 gap-4">
				<div className="col-span-1 mb-4">
					<div className="flex flex-col w-full gap-4 sm:flex-row sm:justify-between sm:gap-2">
						<div className="flex justify-center mx-12">
							<label htmlFor="student_update_image">
								<div className="flex flex-col items-center gap-2">
									<ImageField
										imageObject={studentUpdateImage}
										fieldName="student_update_image"
										profile_image={student.student_image}
										profile_major={student.student_major}
										imagePreview={imagePreview ?? ""}
										setImagePreview={setImagePreview}
										setImage={setStudentUpdateImage}
										setFileSizeNotice={setFileSizeNotice}
									/>
									{fileSizeNotice && (
										<h1 className="mb-2 text-sm text-error">
											{t("fileSizeNotice_20MB")}
										</h1>
									)}
								</div>
							</label>
						</div>
						<div className="flex flex-col justify-center gap-4">
							{/* Student position */}
							<SelectField
								label={t("crud_modal_position_label")}
								name="student_position"
								className="col-span-1"
								object={studentUpdateObject}
								setObject={setStudentUpdateObject}
								value={studentUpdateObject.student_position}
								validation={validationErrors.student_position}>
								<option value="0">
									{t("crud_modal_position_option1")}
								</option>
								<option value="1">
									{t("crud_modal_position_option2")}
								</option>
								<option value="2">
									{t("crud_modal_position_option3")}
								</option>
							</SelectField>
							{/* Student ID */}
							<TextField
								label={t("crud_modal_ID_label")}
								name="student_ID"
								className="col-span-1"
								object={studentUpdateObject}
								setObject={setStudentUpdateObject}
								value={studentUpdateObject.student_ID}
								validation={validationErrors.student_ID}
							/>
						</div>
					</div>
				</div>
				{/* Student major */}
				<SelectField
					label={t("crud_modal_major_label")}
					name="student_major"
					className="col-span-1"
					object={studentUpdateObject}
					setObject={setStudentUpdateObject}
					value={studentUpdateObject.student_major}
					validation={validationErrors.student_major}
					disabled={!admin_access_only(userInfo.result.profile_position)}>
					<option value="0">
						{t("crud_modal_major_label")}
					</option>
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
				<div className="grid grid-cols-2 col-span-1 gap-4 mb-4">
					{/* Student level */}
					<SelectField
						label={t("crud_modal_level_label")}
						name="student_level"
						className="col-span-1"
						object={studentUpdateObject}
						setObject={setStudentUpdateObject}
						value={studentUpdateObject.student_level}
						validation={validationErrors.student_level}>
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
					{/* Student class */}
					<TextField
						label={t("crud_modal_class_label")}
						name="student_class"
						className="col-span-1"
						object={studentUpdateObject}
						setObject={setStudentUpdateObject}
						value={studentUpdateObject.student_class}
						validation={validationErrors.student_class}
					/>
				</div>
				{/* Gender */}
				<SelectField
					label={t("crud_modal_gender_label")}
					name="student_gender"
					className="col-span-1"
					object={studentUpdateObject}
					setObject={setStudentUpdateObject}
					value={studentUpdateObject.student_gender}
					validation={validationErrors.student_gender}>
					<option value="0">
						{t("crud_modal_gender_option1")}
					</option>
					<option value="2">
						{t("crud_modal_gender_option2")}
					</option>
					<option value="3">
						{t("crud_modal_gender_option3")}
					</option>
					<option value="1">
						{t("crud_modal_gender_option4")}
					</option>
				</SelectField>
				<div className="grid grid-cols-2 col-span-1 gap-4">
					{/* Student English first name */}
					<TextField
						label={t("crud_modal_firstName_label")}
						name="student_first_name"
						className="col-span-1"
						object={studentUpdateObject}
						setObject={setStudentUpdateObject}
						value={studentUpdateObject.student_first_name}
						validation={validationErrors.student_first_name}
					/>
					{/* Student English last name */}
					<TextField
						label={t("crud_modal_lastName_label")}
						name="student_last_name"
						className="col-span-1"
						object={studentUpdateObject}
						setObject={setStudentUpdateObject}
						value={studentUpdateObject.student_last_name}
						validation={validationErrors.student_last_name}
					/>
				</div>
				<div className="grid grid-cols-2 col-span-1 gap-4">
					{/* Student Thai first name */}
					<TextField
						label={t("crud_modal_firstNameThai_label")}
						name="student_first_name_thai"
						className="col-span-1"
						object={studentUpdateObject}
						setObject={setStudentUpdateObject}
						value={studentUpdateObject.student_first_name_thai}
						validation={validationErrors.student_first_name_thai}
					/>
					{/* Student Thai last name */}
					<TextField
						label={t("crud_modal_lastNameThai_label")}
						name="student_last_name_thai"
						className="col-span-1"
						object={studentUpdateObject}
						setObject={setStudentUpdateObject}
						value={studentUpdateObject.student_last_name_thai}
						validation={validationErrors.student_last_name_thai}
					/>
				</div>
				<div className="grid grid-cols-2 col-span-1 gap-4 mb-4">
					{/* Student English nickname */}
					<TextField
						label={t("crud_modal_nickname_label")}
						name="student_nickname"
						className="col-span-1"
						object={studentUpdateObject}
						setObject={setStudentUpdateObject}
						value={studentUpdateObject.student_nickname}
						validation={validationErrors.student_nickname}
					/>
					{/* Student Thai nickname */}
					<TextField
						label={t("crud_modal_nicknameThai_label")}
						name="student_nickname_thai"
						className="col-span-1"
						object={studentUpdateObject}
						setObject={setStudentUpdateObject}
						value={studentUpdateObject.student_nickname_thai}
						validation={validationErrors.student_nickname_thai}
					/>
				</div>
				{/* Student email */}
				<TextField
					label={t("crud_modal_email_label")}
					name="student_email"
					className="col-span-1"
					object={studentUpdateObject}
					setObject={setStudentUpdateObject}
					value={studentUpdateObject.student_email}
					validation={validationErrors.student_email}
				/>
				<div className="grid grid-cols-2 col-span-1 gap-4 mb-4">
					{/* Student phone */}
					<TextField
						label={t("crud_modal_phone_label")}
						name="student_phone"
						className="col-span-1"
						object={studentUpdateObject}
						setObject={setStudentUpdateObject}
						value={studentUpdateObject.student_phone}
						validation={validationErrors.student_phone}
					/>
					{/* Student Line ID */}
					<TextField
						label={t("crud_modal_lineID_label")}
						name="student_line_ID"
						className="col-span-1"
						object={studentUpdateObject}
						setObject={setStudentUpdateObject}
						value={studentUpdateObject.student_line_ID}
						validation={validationErrors.student_line_ID}
					/>
				</div>
				<div className="flex flex-col gap-4">
					{/* Submit button */}
					<Button_feedback
						label={t("update_modal_submit_button_title")}
						successLabel={t("update_modal_submit_success_message")}
						icon="fa-solid fa-pencil"
						isPending={isSubmitting}
						isSuccess={isUpdateSuccess}
						onClick={() => {
							setObjectAndSubmit();
						}}
					/>
					{/* Delete button */}
					<Button
						label={t("update_modal_delete_button_title")}
						background_color="hover:bg-error"
						border_color="border-error"
						text_color="text-error"
						icon="fa-solid fa-trash-can"
						onClick={() => { setDeleteModalOpen(true); }} />
					<Admin_Students_modal_delete student={student} open={deleteModalOpen} onModalClose={onDeleteModalClose} />
				</div>
			</div>
		</Modal>
	);
};

export default Admin_Students_modal_update;
