import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import i18n from "../../../../i18n";
import Modal from "../../../Extended/Modal";
import Button from "../../../Extended/Button";
import TextField from "../../../Extended/TextField";
import SelectField from "../../../Extended/SelectField";
import TextArea from "../../../Extended/TextArea";
import { ClubInterface, ClubManagerInterface } from "../../../../interfaces/clubs.interface";
import { MajorInterface } from "../../../../interfaces/common.interface";
// Contexts //
import { useContext_Account } from "../../../../contexts/Account.context";
import { useContext_Clubs } from "../../../../contexts/Clubs/Clubs.context";
import { useContext_Majors } from "../../../../contexts/Major.context";
import { useContext_Teachers } from "../../../../contexts/Profiles/Teachers/Teacher.context";
// Functions //
import { handle_image_change } from "../../../../functions/fields.function";
import { head_access_only } from "../../../../functions/permission_check.function";
import { teacher_image_from_ID, teacher_major_from_ID, teacher_name_from_ID } from "../../../../functions/information/teachers.function";
import { arrays_equality_check } from "../../../../functions/array.function";
import { club_update } from "../../../../functions/CRUD/Clubs/Clubs/club_update.function";
import { clubManager_createDelete } from "../../../../functions/CRUD/Clubs/ClubManagers/clubManager_createDelete.function";
// Components //
import Button_feedback from "../../../Extended/Button_feedback";
import File_reset_button from "../../../Miscellaneous/common/Buttons/File_reset_button.component";
import Admin_Clubs_modal_update_teachers from "./Admin_Clubs_modal_update_teachers.component";
import Admin_Clubs_modal_delete from "./Admin_Clubs_modal_delete.component";
// Constants //
import { major_name_thai, major_name_german, major_name } from "../../../../constants/names/major_name";
import { background_color_from_major } from "../../../../constants/styles/colors/color_from_major.constant";
import { CDN_ENDPOINT } from "../../../../constants/ENDPOINTS";
import { hover_transition } from "../../../../constants/styles/transition.style";

interface CurrentComponentProp {
	club: ClubInterface;
	open: boolean;
	onModalClose: () => void;
}

const Admin_Clubs_modal_update = (props: CurrentComponentProp) => {
	const { club, open, onModalClose } = props;

	const { userInfo } = useContext_Account();
	const { fetchClubs, clubManagers, fetchClubManagers } = useContext_Clubs();
	const { majors, fetchMajors } = useContext_Majors();
	const { teachers } = useContext_Teachers();

	const [originalClubTeachers, setOriginalClubTeachers] = useState<number[]>(
		[]
	);
	const [clubTeachers, setClubTeachers] = useState<number[]>([]);

	useEffect(() => {
		fetchMajors();

		const currentClubTeachers = clubManagers.result
			.filter(
				(clubManager: ClubManagerInterface) =>
					clubManager.club_manager_club_ID === club.club_ID
			)
			.map((clubManager: ClubManagerInterface) => clubManager.club_manager_teacher_ID);
		setOriginalClubTeachers(currentClubTeachers);
		setClubTeachers(currentClubTeachers);
	}, [clubManagers]);

	const currentMajor = head_access_only(userInfo.result.profile_position)
		? userInfo.result.profile_major
		: club.club_major;

	const [teacherModalOpen, setTeacherModalOpen] = useState(false);
	const onTeacherModalClose = () => {
		setTeacherModalOpen(false);
	};

	const [clubUpdateObject, setClubUpdateObject] = useState({
		club_ID: club.club_ID,
		club_name: club.club_name,
		club_major: currentMajor,
		club_status: club.club_status,
		club_description: club.club_description,
		club_image: club.club_image,
		club_capacity: club.club_capacity,
	});
	const [validationErrors, setValidationErrors] = useState({
		club_ID: "",
		club_name: "",
		club_major: "",
		club_status: "",
		club_description: "",
		club_image: "",
		club_capacity: "",
	});
	const [clubUpdateImage, setClubUpdateImage] = useState(null);
	const [clubUpdateImageName, setClubUpdateImageName] = useState("");

	const [imagePreview, setImagePreview] = useState("");
	const [fileSizeNotice, setFileSizeNotice] = useState(false);

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);

	const handleImageCancel = () => {
		setImagePreview("");
		setClubUpdateImage(null);
		setClubUpdateImageName("");
		setFileSizeNotice(false);
	};
	const handleModalClose = () => {
		setClubUpdateObject({
			club_ID: club.club_ID,
			club_name: club.club_name,
			club_major: currentMajor,
			club_status: club.club_status,
			club_description: club.club_description,
			club_image: club.club_image,
			club_capacity: club.club_capacity,
		});
		setValidationErrors({
			club_ID: "",
			club_name: "",
			club_major: "",
			club_status: "",
			club_description: "",
			club_image: "",
			club_capacity: "",
		});
		handleImageCancel();

		setIsSubmitting(false);
		setIsUpdateSuccess(false);

		onModalClose();
	};

	const originalImageName = club.club_image.replace(
		/^\/assets\/profilePic\/clubs\//,
		""
	);
	const setObjectAndSubmit = async () => {
		setIsSubmitting(true);

		// Check if the image is updated or not. //
		let imageNameToUpdate;
		if (clubUpdateImage) {
			imageNameToUpdate = clubUpdateImageName;
		} else {
			imageNameToUpdate = originalImageName;
		}

		const updatedClubUpdateObject = {
			club_ID: clubUpdateObject.club_ID,
			club_name: clubUpdateObject.club_name,
			club_major: clubUpdateObject.club_major,
			club_status: clubUpdateObject.club_status,
			club_description: clubUpdateObject.club_description,
			club_image: clubUpdateObject.club_image,
			club_capacity: clubUpdateObject.club_capacity,
		};

		const submissionStatus = await club_update(
			updatedClubUpdateObject,
			clubUpdateImage,
			imageNameToUpdate,
			setValidationErrors
		);

		if (submissionStatus) {
			fetchClubs(true);

			if (!arrays_equality_check(originalClubTeachers, clubTeachers)) {
				const clubTeachersSubmissionStatus = await clubManager_createDelete(
					clubUpdateObject.club_ID,
					originalClubTeachers,
					clubTeachers
				);

				if (clubTeachersSubmissionStatus) {
					fetchClubManagers(true);

					setIsUpdateSuccess(true);
				} else {
					setIsUpdateSuccess(false);
				}
			} else {
				setIsUpdateSuccess(true);
			}
		} else {
			setIsUpdateSuccess(false);
		}

		setIsSubmitting(false);
	};

	const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
	const onDeleteModalClose = () => {
		setDeleteModalOpen(false);
	};

	const { t } = useTranslation("crud_modal_clubs");

	return (
		<Modal
			open={open}
			onModalClose={handleModalClose}
			icon="fa-solid fa-pencil"
			title={t("update_modal_header")}
			overflow>
			<div className="grid grid-cols-1 gap-4">
				{/* Club image */}
				<div className="flex flex-col gap-1">
					{clubUpdateImage ? (
						<div className="border rounded-xl w-full sm:w-[500px] h-auto overflow-auto cursor-pointer">
							<div className="relative">
								<File_reset_button functionToRun={handleImageCancel} />
								<label htmlFor="announcement_image">
									<div className="flex items-center justify-center h-full">
										<img src={imagePreview} className="w-full h-auto" />
									</div>
									<input
										type="file"
										name="announcement_image"
										id="announcement_image"
										accept=".jpg, .jpeg, .png"
										hidden
										onChange={(event) => {
											handle_image_change(
												event,
												setImagePreview,
												setClubUpdateImage,
												setFileSizeNotice,
												setClubUpdateImageName
											);
										}}
									/>
								</label>
							</div>
						</div>
					) : club.club_image !== "" ? (
						<div className="border rounded-xl w-full sm:w-[500px] h-auto overflow-auto">
							<div className="relative">
								<label htmlFor="announcement_image">
									<div className="flex items-center justify-center h-full">
										<img src={`${CDN_ENDPOINT}${club.club_image}`} />
									</div>
									<input
										type="file"
										name="announcement_image"
										id="announcement_image"
										accept=".jpg, .jpeg, .png"
										hidden
										onChange={(event) => {
											handle_image_change(
												event,
												setImagePreview,
												setClubUpdateImage,
												setFileSizeNotice,
												setClubUpdateImageName
											);
										}}
									/>
								</label>
							</div>
						</div>
					) : (
						<div className={`border rounded-xl w-full min-h-[200px] overflow-auto cursor-pointer hover:bg-slate-100 ${hover_transition}`}>
							<label htmlFor="announcement_image">
								<div className="flex flex-row items-center justify-center w-full h-full gap-4">
									<i className="text-4xl opacity-50 fa-solid fa-image"></i>
									<h1 className="text-xl opacity-50">
										{t("crud_modal_file_label")}
									</h1>
								</div>
								<input
									type="file"
									name="announcement_image"
									id="announcement_image"
									accept=".jpg, .jpeg, .png"
									hidden
									onChange={(event) => {
										handle_image_change(
											event,
											setImagePreview,
											setClubUpdateImage,
											setFileSizeNotice,
											setClubUpdateImageName
										);
									}}
								/>
							</label>
						</div>
					)}
					{fileSizeNotice && (
						<h1 className="mb-2 text-sm text-error">
							{t("crud_modal_file_fileSizeNotice_message")}
						</h1>
					)}
				</div>
				{/* Club name */}
				<TextField
					label={t("crud_modal_name_label")}
					name="club_name"
					className="col-span-1"
					object={clubUpdateObject}
					setObject={setClubUpdateObject}
					value={clubUpdateObject.club_name}
					validation={validationErrors.club_name}
				/>
				<div className="grid grid-cols-2 gap-4">
					{/* Club major */}
					<SelectField
						label={t("crud_modal_major_label")}
						name="club_major"
						className="col-span-1"
						object={clubUpdateObject}
						setObject={setClubUpdateObject}
						value={clubUpdateObject.club_major}
						validation={validationErrors.club_major}
						disabled={head_access_only(userInfo.result.profile_position)}>
						<option value="0">{t("crud_modal_major_option1")}</option>
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
					{/* Club capacity */}
					<TextField
						label={t("crud_modal_capacity_label")}
						name="club_capacity"
						className="col-span-1"
						object={clubUpdateObject}
						setObject={setClubUpdateObject}
						value={clubUpdateObject.club_capacity}
						validation={validationErrors.club_capacity}
					/>
				</div>
				{/* Club status */}
				<SelectField
					label={t("crud_modal_status_label")}
					name="club_status"
					className="col-span-1"
					object={clubUpdateObject}
					setObject={setClubUpdateObject}
					value={clubUpdateObject.club_status}
					validation={validationErrors.club_status}>
					<option value="0">{t("crud_modal_status_option1")}</option>
					<option value="1">{t("crud_modal_status_option2")}</option>
					<option value="2">{t("crud_modal_status_option3")}</option>
					<option value="3">{t("crud_modal_status_option4")}</option>
				</SelectField>
				{/* Club description */}
				<TextArea
					label={t("crud_modal_description_label")}
					name="club_description"
					className="col-span-1"
					maxRows={4}
					object={clubUpdateObject}
					setObject={setClubUpdateObject}
					value={clubUpdateObject.club_description}
					validation={validationErrors.club_description}
				/>
				{/* Club teachers */}
				<div className="flex flex-col gap-4 my-2">
					<div className="flex flex-col gap-2">
						<h1 className="font-semibold opacity-50 text-md">
							{t("update_modal_teachers_label")}
						</h1>
						{clubTeachers.length !== 0 ? (
							<div className="grid gap-2 sm:grid-cols-2">
								{clubTeachers.map((teacher: number) => (
									<div
										key={teacher}
										className="flex flex-row items-center justify-between gap-4 p-2 border border-opacity-25 border-standardBlack rounded-xl">
										<div className="flex flex-row items-center gap-4">
											<img
												src={`${CDN_ENDPOINT}${teacher_image_from_ID(
													teacher,
													teachers.result
												)}`}
												className={`w-[40px] h-[40px] rounded-full ${background_color_from_major[
													teacher_major_from_ID(teacher, teachers.result)
												]
													}`}
											/>
											<h1 className="line-clamp-1">
												{teacher_name_from_ID(teacher, teachers.result)}
											</h1>
										</div>
									</div>
								))}
							</div>
						) : (
							<h1 className="mb-4 font-semibold opacity-50">
								{t("crud_modal_noTeachers_message")}
							</h1>
						)}
					</div>
					<Admin_Clubs_modal_update_teachers
						club={club}
						clubTeachers={clubTeachers}
						setClubTeachers={setClubTeachers}
						open={teacherModalOpen}
						onModalClose={onTeacherModalClose}
					/>
					<Button
						label={t("update_modal_teacher_label")}
						icon="fa-solid fa-chalkboard-user"
						onClick={() => { setTeacherModalOpen(true); }} />
				</div>
				<div className="flex flex-col gap-4">
					{/* Submit button */}
					<Button_feedback
						label={t("update_modal_submit_button_title")}
						successLabel={t("update_modal_submit_success_message")}
						icon="fa-solid fa-pencil"
						background_color=""
						border_color=""
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
					<Admin_Clubs_modal_delete club={club} open={deleteModalOpen} onModalClose={onDeleteModalClose} />
				</div>
			</div>
		</Modal>
	);
};

export default Admin_Clubs_modal_update;
