import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from "../../../../../i18n";
import Modal from "../../../../Extended/Modal";
import SelectField from "../../../../Extended/SelectField";
import TextField from "../../../../Extended/TextField";
import Button_feedback from "../../../../Extended/Button_feedback";
import ImageField from "../../../../Extended/ImageField";
import { MajorInterface } from "../../../../../interfaces/common.interface";
// Functions //
import { student_create } from "../../../../../functions/CRUD/Students/student_create.function";
import { head_access_only } from "../../../../../functions/permission_check.function";
// Contexts //
import { useContext_Account } from "../../../../../contexts/Account.context";
import { useContext_Majors } from "../../../../../contexts/Major.context";
import { useContext_Students } from "../../../../../contexts/Profiles/Students/Student.context";
// Constants //
import { major_name_thai, major_name_german, major_name } from "../../../../../constants/names/major_name";

interface CurrentComponentProp {
	open: boolean;
	onModalClose: () => void;
}

const Admin_Students_modal_create = (props: CurrentComponentProp) => {
	const { open, onModalClose } = props;

	const { userInfo } = useContext_Account();
	const { fetchStudents } = useContext_Students();
	const { majors, fetchMajors } = useContext_Majors();

	const currentMajor = head_access_only(userInfo.result.profile_position) ? userInfo.result.profile_major : 0;

	useEffect(() => {
		fetchMajors();
	}, []);

	const [studentCreateObject, setStudentCreateObject] = useState({
		student_ID: "",
		student_position: 0,
		student_first_name: "",
		student_last_name: "",
		student_nickname: "",
		student_first_name_thai: "",
		student_last_name_thai: "",
		student_nickname_thai: "",
		student_gender: 0,
		student_major: currentMajor,
		student_level: 0,
		student_class: "",
		student_phone: "",
		student_line_ID: "",
		student_image: "",
		student_email: "",
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
		student_image: "",
	});
	const [studentCreateImage, setStudentCreateImage] = useState(null);

	const [imagePreview, setImagePreview] = useState(null);
	const [fileSizeNotice, setFileSizeNotice] = useState(false);

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isCreateSuccess, setIsCreateSuccess] = useState(false);

	const handleModalClose = () => {
		setStudentCreateObject({
			student_ID: "",
			student_position: 0,
			student_first_name: "",
			student_last_name: "",
			student_nickname: "",
			student_first_name_thai: "",
			student_last_name_thai: "",
			student_nickname_thai: "",
			student_gender: 0,
			student_major: currentMajor,
			student_level: 0,
			student_class: "",
			student_phone: "",
			student_line_ID: "",
			student_image: "",
			student_email: "",
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
			student_image: "",
		});
		setStudentCreateImage(null);

		setImagePreview(null);
		setFileSizeNotice(false);

		setIsSubmitting(false);
		setIsCreateSuccess(false);

		onModalClose();
	};

	const setObjectAndSubmit = async () => {
		setIsSubmitting(true);

		const submissionStatus = await student_create(
			studentCreateObject,
			studentCreateImage,
			setValidationErrors
		);

		if (submissionStatus) {
			fetchStudents(true);

			setIsSubmitting(false);
			setIsCreateSuccess(true);
		} else {
			setIsSubmitting(false);
			setIsCreateSuccess(false);
		}
	};

	const { t } = useTranslation("crud_modal_students");

	return (
		<Modal
			open={open}
			onModalClose={handleModalClose}
			icon="fa-solid fa-plus"
			title={t("create_modal_header")}
			overflow>
			<div className="grid grid-cols-1 gap-4">
				<div className="col-span-1 mb-4">
					<div className="flex flex-col w-full gap-4 sm:flex-row sm:justify-between sm:gap-2">
						<div className="flex justify-center mx-12">
							<label htmlFor="student_create_image">
								<div className="flex flex-col items-center gap-2">
									<ImageField
										imageObject={studentCreateImage}
										fieldName="student_create_image"
										imagePreview={imagePreview ?? ""}
										setImagePreview={setImagePreview}
										setImage={setStudentCreateImage}
										setFileSizeNotice={setFileSizeNotice}
									/>
									{fileSizeNotice && (
										<h1 className="mb-2 text-sm text-error">
											{t("fileSizeNotice_20MB")}
										</h1>
									)}
									{validationErrors.student_image != "" ? (
										<h1 className="text-sm text-error">
											{validationErrors.student_image}
										</h1>
									) : null}
								</div>
							</label>
						</div>
						<div className="flex flex-col justify-center gap-4">
							{/* Student position */}
							<SelectField
								label={t("crud_modal_position_label")}
								name="student_position"
								className="col-span-1"
								object={studentCreateObject}
								setObject={setStudentCreateObject}
								value={studentCreateObject.student_position}
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
								object={studentCreateObject}
								setObject={setStudentCreateObject}
								value={studentCreateObject.student_ID}
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
					object={studentCreateObject}
					setObject={setStudentCreateObject}
					value={studentCreateObject.student_major}
					validation={validationErrors.student_major}
					disabled={head_access_only(userInfo.result.profile_position)}>
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
						object={studentCreateObject}
						setObject={setStudentCreateObject}
						value={studentCreateObject.student_level}
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
						object={studentCreateObject}
						setObject={setStudentCreateObject}
						value={studentCreateObject.student_class}
						validation={validationErrors.student_class}
					/>
				</div>
				{/* Gender */}
				<SelectField
					label={t("crud_modal_gender_label")}
					name="student_gender"
					className="col-span-1"
					object={studentCreateObject}
					setObject={setStudentCreateObject}
					value={studentCreateObject.student_gender}
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
						object={studentCreateObject}
						setObject={setStudentCreateObject}
						value={studentCreateObject.student_first_name}
						validation={validationErrors.student_first_name}
					/>
					{/* Student English last name */}
					<TextField
						label={t("crud_modal_lastName_label")}
						name="student_last_name"
						className="col-span-1"
						object={studentCreateObject}
						setObject={setStudentCreateObject}
						value={studentCreateObject.student_last_name}
						validation={validationErrors.student_last_name}
					/>
				</div>
				<div className="grid grid-cols-2 col-span-1 gap-4">
					{/* Student Thai first name */}
					<TextField
						label={t("crud_modal_firstNameThai_label")}
						name="student_first_name_thai"
						className="col-span-1"
						object={studentCreateObject}
						setObject={setStudentCreateObject}
						value={studentCreateObject.student_first_name_thai}
						validation={validationErrors.student_first_name_thai}
					/>
					{/* Student Thai last name */}
					<TextField
						label={t("crud_modal_lastNameThai_label")}
						name="student_last_name_thai"
						className="col-span-1"
						object={studentCreateObject}
						setObject={setStudentCreateObject}
						value={studentCreateObject.student_last_name_thai}
						validation={validationErrors.student_last_name_thai}
					/>
				</div>
				<div className="grid grid-cols-2 col-span-1 gap-4 mb-4">
					{/* Student English nickname */}
					<TextField
						label={t("crud_modal_nickname_label")}
						name="student_nickname"
						className="col-span-1"
						object={studentCreateObject}
						setObject={setStudentCreateObject}
						value={studentCreateObject.student_nickname}
						validation={validationErrors.student_nickname}
					/>
					{/* Student Thai nickname */}
					<TextField
						label={t("crud_modal_nicknameThai_label")}
						name="student_nickname_thai"
						className="col-span-1"
						object={studentCreateObject}
						setObject={setStudentCreateObject}
						value={studentCreateObject.student_nickname_thai}
						validation={validationErrors.student_nickname_thai}
					/>
				</div>
				{/* Student email */}
				<TextField
					label={t("crud_modal_email_label")}
					name="student_email"
					className="col-span-1"
					object={studentCreateObject}
					setObject={setStudentCreateObject}
					value={studentCreateObject.student_email}
					validation={validationErrors.student_email}
				/>
				<div className="grid grid-cols-2 col-span-1 gap-4 mb-4">
					{/* Student phone */}
					<TextField
						label={t("crud_modal_phone_label")}
						name="student_phone"
						className="col-span-1"
						object={studentCreateObject}
						setObject={setStudentCreateObject}
						value={studentCreateObject.student_phone}
						validation={validationErrors.student_phone}
					/>
					{/* Student Line ID */}
					<TextField
						label={t("crud_modal_lineID_label")}
						name="student_line_ID"
						className="col-span-1"
						object={studentCreateObject}
						setObject={setStudentCreateObject}
						value={studentCreateObject.student_line_ID}
						validation={validationErrors.student_line_ID}
					/>
				</div>
				{/* Submit button */}
				<Button_feedback
					label={t("create_modal_submit_button_title")}
					successLabel={t("create_modal_submit_success_message")}
					icon="fa-solid fa-plus"
					isPending={isSubmitting}
					isSuccess={isCreateSuccess}
					onClick={() => {
						setObjectAndSubmit();
					}}
				/>
			</div>
		</Modal>
	);
};

export default Admin_Students_modal_create;
