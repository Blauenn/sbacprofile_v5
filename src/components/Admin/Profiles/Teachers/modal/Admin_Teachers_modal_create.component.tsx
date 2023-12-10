import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from "../../../../../i18n";
import SelectField from "../../../../Extended/SelectField";
import ImageField from "../../../../Extended/ImageField";
import TextField from "../../../../Extended/TextField";
import Button_feedback from "../../../../Extended/Button_feedback";
import Modal from "../../../../Extended/Modal";
import { MajorInterface } from "../../../../../interfaces/common.interface";
// Functions //
import { teacher_create } from "../../../../../functions/CRUD/Teachers/teacher_create.function";
import { head_access_only } from "../../../../../functions/permission_check.function";
// Contexts //
import { useContext_Majors } from "../../../../../contexts/Major.context";
import { useContext_Teachers } from "../../../../../contexts/Profiles/Teachers/Teacher.context";
import { useContext_Account } from "../../../../../contexts/Account.context";
// Components //
// Constants //
import { major_name_thai, major_name_german, major_name } from "../../../../../constants/names/major_name";

interface CurrentComponentProp {
	open: boolean;
	onModalClose: () => void;
}

const Admin_Teachers_modal_create = (props: CurrentComponentProp) => {
	const { open, onModalClose } = props;

	const { userInfo } = useContext_Account();
	const { fetchTeachers } = useContext_Teachers();
	const { majors, fetchMajors } = useContext_Majors();

	const currentMajor = head_access_only(userInfo.result.profile_position) ? userInfo.result.profile_major : 0;

	useEffect(() => {
		fetchMajors();
	}, []);

	const [teacherCreateObject, setTeacherCreateObject] = useState({
		teacher_ID: "",
		teacher_position: 0,
		teacher_first_name: "",
		teacher_last_name: "",
		teacher_nickname: "",
		teacher_first_name_thai: "",
		teacher_last_name_thai: "",
		teacher_nickname_thai: "",
		teacher_gender: 0,
		teacher_major: currentMajor,
		teacher_phone: "",
		teacher_line_ID: "",
		teacher_image: "",
		teacher_email: "",
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
		teacher_image: "",
	});
	const [teacherCreateImage, setTeacherCreateImage] = useState(null);

	const [imagePreview, setImagePreview] = useState(null);
	const [fileSizeNotice, setFileSizeNotice] = useState(false);

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isCreateSuccess, setIsCreateSuccess] = useState(false);

	const handleModalClose = () => {
		setTeacherCreateObject({
			teacher_ID: "",
			teacher_position: 0,
			teacher_first_name: "",
			teacher_last_name: "",
			teacher_nickname: "",
			teacher_first_name_thai: "",
			teacher_last_name_thai: "",
			teacher_nickname_thai: "",
			teacher_gender: 0,
			teacher_major: currentMajor,
			teacher_phone: "",
			teacher_line_ID: "",
			teacher_image: "",
			teacher_email: "",
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
			teacher_image: "",
		});
		setTeacherCreateImage(null);

		setImagePreview(null);
		setFileSizeNotice(false);

		setIsSubmitting(false);
		setIsCreateSuccess(false);

		onModalClose();
	};

	const setObjectAndSubmit = async () => {
		setIsSubmitting(true);

		const submissionStatus = await teacher_create(
			teacherCreateObject,
			teacherCreateImage,
			setValidationErrors
		);

		if (submissionStatus) {
			fetchTeachers(true);

			setIsSubmitting(false);
			setIsCreateSuccess(true);
		} else {
			setIsSubmitting(false);
			setIsCreateSuccess(false);
		}
	};

	const { t } = useTranslation("crud_modal_teachers");

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
							<label htmlFor="teacher_create_image">
								<div className="flex flex-col items-center gap-2">
									<ImageField
										imageObject={teacherCreateImage}
										fieldName="teacher_create_image"
										imagePreview={imagePreview ?? ""}
										setImagePreview={setImagePreview}
										setImage={setTeacherCreateImage}
										setFileSizeNotice={setFileSizeNotice}
									/>
									{fileSizeNotice && (
										<h1 className="mb-2 text-sm text-error">
											{t("fileSizeNotice_20MB")}
										</h1>
									)}
									{validationErrors.teacher_image != "" ? (
										<h1 className="text-sm text-error">
											{validationErrors.teacher_image}
										</h1>
									) : null}
								</div>
							</label>
						</div>
						<div className="flex flex-col justify-center gap-4">
							{/* Teacher position */}
							<SelectField
								// Disable if the user tries to demote the administrator. //
								label={t("crud_modal_position_label")}
								name="teacher_position"
								className="col-span-1"
								object={teacherCreateObject}
								setObject={setTeacherCreateObject}
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
							</SelectField>
							{/* Teacher ID */}
							<TextField
								label={t("crud_modal_ID_label")}
								name="teacher_ID"
								className="col-span-1"
								object={teacherCreateObject}
								setObject={setTeacherCreateObject}
								value={teacherCreateObject.teacher_ID}
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
					object={teacherCreateObject}
					setObject={setTeacherCreateObject}
					value={teacherCreateObject.teacher_major}
					validation={validationErrors.teacher_major}
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
				{/* Gender */}
				<SelectField
					label={t("crud_modal_gender_label")}
					name="teacher_gender"
					className="col-span-1"
					object={teacherCreateObject}
					setObject={setTeacherCreateObject}
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
						object={teacherCreateObject}
						setObject={setTeacherCreateObject}
						validation={validationErrors.teacher_first_name}
					/>
					{/* Teacher English last name */}
					<TextField
						label={t("crud_modal_lastName_label")}
						name="teacher_last_name"
						className="col-span-1"
						object={teacherCreateObject}
						setObject={setTeacherCreateObject}
						validation={validationErrors.teacher_last_name}
					/>
				</div>
				<div className="grid grid-cols-2 col-span-1 gap-4">
					{/* Teacher Thai first name */}
					<TextField
						label={t("crud_modal_firstNameThai_label")}
						name="teacher_first_name_thai"
						className="col-span-1"
						object={teacherCreateObject}
						setObject={setTeacherCreateObject}
						validation={validationErrors.teacher_first_name_thai}
					/>
					{/* Teacher Thai last name */}
					<TextField
						label={t("crud_modal_lastNameThai_label")}
						name="teacher_last_name_thai"
						className="col-span-1"
						object={teacherCreateObject}
						setObject={setTeacherCreateObject}
						validation={validationErrors.teacher_last_name_thai}
					/>
				</div>
				<div className="grid grid-cols-2 col-span-1 gap-4 mb-4">
					{/* Teacher English nickname */}
					<TextField
						label={t("crud_modal_nickname_label")}
						name="teacher_nickname"
						className="col-span-1"
						object={teacherCreateObject}
						setObject={setTeacherCreateObject}
						validation={validationErrors.teacher_nickname}
					/>
					{/* Teacher Thai nickname */}
					<TextField
						label={t("crud_modal_nicknameThai_label")}
						name="teacher_nickname_thai"
						className="col-span-1"
						object={teacherCreateObject}
						setObject={setTeacherCreateObject}
						validation={validationErrors.teacher_nickname_thai}
					/>
				</div>
				{/* Teacher email */}
				<TextField
					label={t("crud_modal_email_label")}
					name="teacher_email"
					className="col-span-1"
					object={teacherCreateObject}
					setObject={setTeacherCreateObject}
					validation={validationErrors.teacher_email}
				/>
				<div className="grid grid-cols-2 col-span-1 gap-4 mb-4">
					{/* Teacher phone */}
					<TextField
						label={t("crud_modal_phone_label")}
						name="teacher_phone"
						className="col-span-1"
						object={teacherCreateObject}
						setObject={setTeacherCreateObject}
						validation={validationErrors.teacher_phone}
					/>
					{/* Teacher Line ID */}
					<TextField
						label={t("crud_modal_lineID_label")}
						name="teacher_line_ID"
						className="col-span-1"
						object={teacherCreateObject}
						setObject={setTeacherCreateObject}
						validation={validationErrors.teacher_line_ID}
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

export default Admin_Teachers_modal_create;
