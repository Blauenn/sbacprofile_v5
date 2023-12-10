import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from "../../../../i18n";
import Modal from "../../../Extended/Modal";
import { MajorInterface } from "../../../../interfaces/common.interface";
// Contexts //
import { useContext_Account } from "../../../../contexts/Account.context";
import { useContext_Clubs } from "../../../../contexts/Clubs/Clubs.context";
import { useContext_Majors } from "../../../../contexts/Major.context";
// Functions //
import { handle_image_change } from "../../../../functions/fields.function";
import { head_access_only } from "../../../../functions/permission_check.function";
import { club_create } from "../../../../functions/CRUD/Clubs/Clubs/club_create.function";
// Components //
import File_reset_button from "../../../Miscellaneous/common/Buttons/File_reset_button.component";
import Button_feedback from "../../../Extended/Button_feedback";
// Constants //
import { major_name_thai, major_name_german, major_name } from "../../../../constants/names/major_name";
import TextField from "../../../Extended/TextField";
import SelectField from "../../../Extended/SelectField";
import TextArea from "../../../Extended/TextArea";
import { hover_transition } from "../../../../constants/styles/transition.style";

interface CurrentComponentProp {
	open: boolean;
	onModalClose: () => void;
}

const Admin_Clubs_modal_create = (props: CurrentComponentProp) => {
	const { open, onModalClose } = props;

	const { userInfo } = useContext_Account();
	const { fetchClubs } = useContext_Clubs();
	const { majors, fetchMajors } = useContext_Majors();

	useEffect(() => {
		fetchMajors();
	}, []);

	const currentMajor = head_access_only(userInfo.result.profile_position)
		? userInfo.result.profile_major
		: 0;

	const [clubCreateObject, setClubCreateObject] = useState({
		club_name: "",
		club_major: currentMajor,
		club_description: "",
		club_image: "",
		club_status: 1,
		club_capacity: 45,
	});
	const [validationErrors, setValidationErrors] = useState({
		club_name: "",
		club_major: "",
		club_status: "",
		club_description: "",
		club_image: "",
		club_capacity: "",
	});
	const [clubCreateImage, setClubCreateImage] = useState(null);
	const [clubCreateImageName, setClubCreateImageName] = useState("");

	const [imagePreview, setImagePreview] = useState("");
	const [fileSizeNotice, setFileSizeNotice] = useState(false);

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isCreateSuccess, setIsCreateSuccess] = useState(false);

	const handleImageCancel = () => {
		setImagePreview("");
		setClubCreateImage(null);
		setClubCreateImageName("");
		setFileSizeNotice(false);
	};
	const handleModalClose = () => {
		setClubCreateObject({
			club_name: "",
			club_major: currentMajor,
			club_description: "",
			club_image: "",
			club_status: 1,
			club_capacity: 45,
		});
		setValidationErrors({
			club_name: "",
			club_major: "",
			club_status: "",
			club_description: "",
			club_image: "",
			club_capacity: "",
		});
		handleImageCancel();

		setIsSubmitting(false);
		setIsCreateSuccess(false);

		onModalClose();
	};

	const setObjectAndSubmit = async () => {
		setIsSubmitting(true);

		const submissionStatus = await club_create(
			clubCreateObject,
			clubCreateImage,
			clubCreateImageName,
			setValidationErrors
		);

		if (submissionStatus) {
			fetchClubs(true);

			setIsSubmitting(false);
			setIsCreateSuccess(true);
		} else {
			setIsSubmitting(false);
			setIsCreateSuccess(false);
		}
	};

	const { t } = useTranslation("crud_modal_clubs");

	return (
		<Modal
			open={open}
			onModalClose={handleModalClose}
			icon="fa-solid fa-plus"
			title={t("create_modal_header")}>
			<div className="grid grid-cols-1 gap-4">
				{/* Club image */}
				<div className="flex flex-col gap-1">
					{clubCreateImage ? (
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
												setClubCreateImage,
												setFileSizeNotice,
												setClubCreateImageName
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
											setClubCreateImage,
											setFileSizeNotice,
											setClubCreateImageName
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
					object={clubCreateObject}
					setObject={setClubCreateObject}
					value={clubCreateObject.club_name}
					validation={validationErrors.club_name}
				/>
				<div className="grid grid-cols-2 gap-4">
					{/* Club major */}
					<SelectField
						label={t("crud_modal_major_label")}
						name="club_major"
						className="col-span-1"
						object={clubCreateObject}
						setObject={setClubCreateObject}
						value={clubCreateObject.club_major}
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
						object={clubCreateObject}
						setObject={setClubCreateObject}
						value={clubCreateObject.club_capacity}
						validation={validationErrors.club_capacity}
					/>
				</div>
				{/* Club description */}
				<TextArea
					label={t("crud_modal_description_label")}
					name="club_description"
					className="col-span-1"
					maxRows={4}
					object={clubCreateObject}
					setObject={setClubCreateObject}
					value={clubCreateObject.club_description}
					validation={validationErrors.club_description}
				/>
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
		</Modal >
	);
};

export default Admin_Clubs_modal_create;
