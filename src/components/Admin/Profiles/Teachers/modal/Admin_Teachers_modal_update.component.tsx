import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from "../../../../../i18n";
import Button from "../../../../Extended/Button";
import Button_feedback from "../../../../Extended/Button_feedback";
import TextField from "../../../../Extended/TextField";
import SelectField from "../../../../Extended/SelectField";
import ImageField from "../../../../Extended/ImageField";
import Modal from "../../../../Extended/Modal";
import { TeacherInterface } from "../../../../../interfaces/profiles.interface";
import { MajorInterface } from "../../../../../interfaces/common.interface";
// Functions //
import { teacher_update } from "../../../../../functions/CRUD/Teachers/teacher_update.function";
import { admin_access_only } from "../../../../../functions/permission_check.function";
// Contexts //
import { useContext_Account } from "../../../../../contexts/Account.context";
import { useContext_Majors } from "../../../../../contexts/Major.context";
import { useContext_Teachers } from "../../../../../contexts/Profiles/Teachers/Teacher.context";
// Components //
import Admin_Teachers_modal_delete from "./Admin_Teachers_modal_delete.component";
// Constants //
import { major_name_thai, major_name_german, major_name } from "../../../../../constants/names/major_name";

interface CurrentComponentProp {
	teacher: TeacherInterface;
	open: boolean;
	onModalClose: () => void;
}

const Admin_teachers_modal_update = (props: CurrentComponentProp) => {
	const { teacher, open, onModalClose } = props;

	const { userInfo } = useContext_Account();
	const { fetchTeachers } = useContext_Teachers();
	const { majors, fetchMajors } = useContext_Majors();

	useEffect(() => {
		fetchMajors();
	}, []);

	const [teacherUpdateObject, setTeacherUpdateObject] = useState({
		primary_teacher_ID: teacher.primary_teacher_ID,
		teacher_ID: teacher.teacher_ID,
		teacher_position: teacher.teacher_position,
		teacher_first_name: teacher.teacher_first_name,
		teacher_last_name: teacher.teacher_last_name,
		teacher_nickname: teacher.teacher_nickname,
		teacher_first_name_thai: teacher.teacher_first_name_thai,
		teacher_last_name_thai: teacher.teacher_last_name_thai,
		teacher_nickname_thai: teacher.teacher_nickname_thai,
		teacher_gender: teacher.teacher_gender,
		teacher_major: teacher.teacher_major,
		teacher_phone: teacher.teacher_phone,
		teacher_line_ID: teacher.teacher_line_ID,
		teacher_image: teacher.teacher_image,
		teacher_email: teacher.teacher_email,
	});
	const [validationErrors, setValidationErrors] = useState({
		teacher_ID: "",
		teacher_position: "",
		teacher_first_name: "",
		teacher_last_name: "",
		teacher_nickname: "",
		teacher_first_name_thai: "",
		teacher_last_name_thai: "",
		teacher_nickname_thai: "",
		teacher_gender: "",
		teacher_major: "",
		teacher_phone: "",
		teacher_line_ID: "",
		teacher_email: "",
	});
	const [teacherUpdateImage, setTeacherUpdateImage] = useState(null);

	const [imagePreview, setImagePreview] = useState(null);
	const [fileSizeNotice, setFileSizeNotice] = useState(false);

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);

	const handleModalClose = () => {
		setTeacherUpdateObject({
			primary_teacher_ID: teacher.primary_teacher_ID,
			teacher_ID: teacher.teacher_ID,
			teacher_position: teacher.teacher_position,
			teacher_first_name: teacher.teacher_first_name,
			teacher_last_name: teacher.teacher_last_name,
			teacher_nickname: teacher.teacher_nickname,
			teacher_first_name_thai: teacher.teacher_first_name_thai,
			teacher_last_name_thai: teacher.teacher_last_name_thai,
			teacher_nickname_thai: teacher.teacher_nickname_thai,
			teacher_major: teacher.teacher_major,
			teacher_gender: teacher.teacher_gender,
			teacher_phone: teacher.teacher_phone,
			teacher_line_ID: teacher.teacher_line_ID,
			teacher_image: teacher.teacher_image,
			teacher_email: teacher.teacher_email,
		});
		setValidationErrors({
			teacher_ID: "",
			teacher_position: "",
			teacher_first_name: "",
			teacher_last_name: "",
			teacher_nickname: "",
			teacher_first_name_thai: "",
			teacher_last_name_thai: "",
			teacher_nickname_thai: "",
			teacher_gender: "",
			teacher_major: "",
			teacher_phone: "",
			teacher_line_ID: "",
			teacher_email: "",
		});
		setTeacherUpdateImage(null);

		setImagePreview(null);
		setFileSizeNotice(false);

		setIsUpdateSuccess(false);
		setIsSubmitting(false);

		onModalClose();
	};

	const setObjectAndSubmit = async () => {
		setIsSubmitting(true);

		const submissionStatus = await teacher_update(
			teacherUpdateObject,
			teacherUpdateImage,
			setValidationErrors
		);

		if (submissionStatus) {
			fetchTeachers(true);

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

	const { t } = useTranslation("crud_modal_teachers");

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
							<label htmlFor="teacher_update_image">
								<div className="flex flex-col items-center gap-2">
									<ImageField
										imageObject={teacherUpdateImage}
										fieldName="teacher_update_image"
										profile_image={teacher.teacher_image}
										profile_major={teacher.teacher_major}
										imagePreview={imagePreview ?? ""}
										setImagePreview={setImagePreview}
										setImage={setTeacherUpdateImage}
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
							{/* Teacher position */}
							<SelectField
								// Disable if the user tries to demote the administrator. //
								disabled={teacherUpdateObject.teacher_position === 6}
								label={t("crud_modal_position_label")}
								name="teacher_position"
								className="col-span-1"
								object={teacherUpdateObject}
								setObject={setTeacherUpdateObject}
								value={teacherUpdateObject.teacher_position}
								validation={validationErrors.teacher_position}>
								<option value="0">
									{t("crud_modal_position_option1")}
								</option>
								<option value="3">
									{t("crud_modal_position_option2")}
								</option>
								<option value="4">
									{t("crud_modal_position_option3")}
								</option>
								{teacherUpdateObject.teacher_position === 6 ? (
									<option value="6">
										{t("crud_modal_position_option4")}
									</option>
								) : null}
							</SelectField>
							{/* Teacher ID */}
							<TextField
								label={t("crud_modal_ID_label")}
								name="teacher_ID"
								className="col-span-1"
								object={teacherUpdateObject}
								setObject={setTeacherUpdateObject}
								value={teacherUpdateObject.teacher_ID}
								validation={validationErrors.teacher_ID}
							/>
						</div>
					</div>
				</div>
				{/* Teacher major */}
				<SelectField
					label={t("crud_modal_major_label")}
					name="teacher_major"
					className="col-span-1"
					object={teacherUpdateObject}
					setObject={setTeacherUpdateObject}
					value={teacherUpdateObject.teacher_major}
					validation={validationErrors.teacher_major}
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
				{/* Gender */}
				<SelectField
					label={t("crud_modal_gender_label")}
					name="teacher_gender"
					className="col-span-1"
					object={teacherUpdateObject}
					setObject={setTeacherUpdateObject}
					value={teacherUpdateObject.teacher_gender}
					validation={validationErrors.teacher_gender}>
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
					{/* Teacher English first name */}
					<TextField
						label={t("crud_modal_firstName_label")}
						name="teacher_first_name"
						className="col-span-1"
						object={teacherUpdateObject}
						setObject={setTeacherUpdateObject}
						value={teacherUpdateObject.teacher_first_name}
						validation={validationErrors.teacher_first_name}
					/>
					{/* Teacher English last name */}
					<TextField
						label={t("crud_modal_lastName_label")}
						name="teacher_last_name"
						className="col-span-1"
						object={teacherUpdateObject}
						setObject={setTeacherUpdateObject}
						value={teacherUpdateObject.teacher_last_name}
						validation={validationErrors.teacher_last_name}
					/>
				</div>
				<div className="grid grid-cols-2 col-span-1 gap-4">
					{/* Teacher Thai first name */}
					<TextField
						label={t("crud_modal_firstNameThai_label")}
						name="teacher_first_name_thai"
						className="col-span-1"
						object={teacherUpdateObject}
						setObject={setTeacherUpdateObject}
						value={teacherUpdateObject.teacher_first_name_thai}
						validation={validationErrors.teacher_first_name_thai}
					/>
					{/* Teacher Thai last name */}
					<TextField
						label={t("crud_modal_lastNameThai_label")}
						name="teacher_last_name_thai"
						className="col-span-1"
						object={teacherUpdateObject}
						setObject={setTeacherUpdateObject}
						value={teacherUpdateObject.teacher_last_name_thai}
						validation={validationErrors.teacher_last_name_thai}
					/>
				</div>
				<div className="grid grid-cols-2 col-span-1 gap-4 mb-4">
					{/* Teacher English nickname */}
					<TextField
						label={t("crud_modal_nickname_label")}
						name="teacher_nickname"
						className="col-span-1"
						object={teacherUpdateObject}
						setObject={setTeacherUpdateObject}
						value={teacherUpdateObject.teacher_nickname}
						validation={validationErrors.teacher_nickname}
					/>
					{/* Teacher Thai nickname */}
					<TextField
						label={t("crud_modal_nicknameThai_label")}
						name="teacher_nickname_thai"
						className="col-span-1"
						object={teacherUpdateObject}
						setObject={setTeacherUpdateObject}
						value={teacherUpdateObject.teacher_nickname_thai}
						validation={validationErrors.teacher_nickname_thai}
					/>
				</div>
				{/* Teacher email */}
				<TextField
					label={t("crud_modal_email_label")}
					name="teacher_email"
					className="col-span-1"
					object={teacherUpdateObject}
					setObject={setTeacherUpdateObject}
					value={teacherUpdateObject.teacher_email}
					validation={validationErrors.teacher_email}
				/>
				<div className="grid grid-cols-2 col-span-1 gap-4 mb-4">
					{/* Teacher phone */}
					<TextField
						label={t("crud_modal_phone_label")}
						name="teacher_phone"
						className="col-span-1"
						object={teacherUpdateObject}
						setObject={setTeacherUpdateObject}
						value={teacherUpdateObject.teacher_phone}
						validation={validationErrors.teacher_phone}
					/>
					{/* Teacher Line ID */}
					<TextField
						label={t("crud_modal_lineID_label")}
						name="teacher_line_ID"
						className="col-span-1"
						object={teacherUpdateObject}
						setObject={setTeacherUpdateObject}
						value={teacherUpdateObject.teacher_line_ID}
						validation={validationErrors.teacher_line_ID}
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
					<Admin_Teachers_modal_delete teacher={teacher} open={deleteModalOpen} onModalClose={onDeleteModalClose} />
				</div>
			</div>
		</Modal>
	);
};

export default Admin_teachers_modal_update;
