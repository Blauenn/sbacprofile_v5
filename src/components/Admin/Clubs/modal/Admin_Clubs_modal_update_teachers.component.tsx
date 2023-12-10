import { useTranslation } from "react-i18next";
import { ClubInterface } from "../../../../interfaces/clubs.interface";
import { TeacherInterface } from "../../../../interfaces/profiles.interface";
import Modal from "../../../Extended/Modal";
// Contexts //
import { useContext_Teachers } from "../../../../contexts/Profiles/Teachers/Teacher.context";
// Components //
import Admin_Clubs_modal_update_teachers_teacher_card from "./Admin_Clubs_modal_update_teachers_teacher_card.component";
// Constants //
import { hover_transition } from "../../../../constants/styles/transition.style";
import Button from "../../../Extended/Button";

interface CurrentComponentProp {
	club: ClubInterface;
	clubTeachers: number[];
	setClubTeachers: React.Dispatch<React.SetStateAction<number[]>>;
	open: boolean;
	onModalClose: () => void;
}

const change_button_style = `flex justify-center items-center bg-gray-500 opacity-50 w-[25px] h-[25px] rounded-full hover:opacity-100 ${hover_transition}`;

const Admin_Clubs_modal_update_teachers = (props: CurrentComponentProp) => {
	const { club, clubTeachers, setClubTeachers, open, onModalClose } = props;

	const { teachers } = useContext_Teachers();

	const filteredTeachersMajors = teachers.result.filter((teacher: TeacherInterface) => {
		return teacher.teacher_major === club.club_major;
	});
	const filteredTeachers = filteredTeachersMajors.filter((teacher: TeacherInterface) => {
		return !clubTeachers.includes(teacher.teacher_ID);
	});

	const addTeacher = (teacher_ID: number) => {
		if (!clubTeachers.includes(teacher_ID)) {
			const updatedClubTeachers = [...clubTeachers, teacher_ID];

			setClubTeachers(updatedClubTeachers);
		}
	};
	const removeTeacher = (teacher_ID: number) => {
		if (clubTeachers.includes(teacher_ID)) {
			const updatedClubTeachers = clubTeachers.filter(
				(id: number) => id !== teacher_ID
			);

			setClubTeachers(updatedClubTeachers);
		}
	};

	const handleModalClose = () => {
		onModalClose();
	};

	const { t } = useTranslation("crud_modal_clubs");

	return (
		<Modal
			open={open}
			onModalClose={handleModalClose}
			icon="fa-solid fa-chalkboard-user"
			title={t("update_teachers_modal_header")}>
			<div className="flex flex-col gap-8">
				<div className="flex flex-col">
					<h1 className="mb-2 text-xl font-semibold">
						{t("update_teachers_currentTeachers_label")}
					</h1>
					<div className="flex flex-col gap-2">
						{clubTeachers.length !== 0 ? (
							clubTeachers.map((teacher: number) => (
								<div
									key={teacher}
									className="flex flex-row items-center justify-between gap-4 px-2 py-1 border border-opacity-25 border-standardBlack rounded-xl">
									<Admin_Clubs_modal_update_teachers_teacher_card teacher_ID={teacher} />
									{/* Remove button */}
									<div
										onClick={() => {
											removeTeacher(teacher);
										}}
										className={`${change_button_style} hover:bg-error cursor-pointer`}>
										<i className="text-white fa-solid fa-minus"></i>
									</div>
								</div>
							))
						) : (
							<h1 className="font-semibold opacity-50">
								{t("crud_modal_noTeachers_message")}
							</h1>
						)}
					</div>
				</div>
				<div className="flex flex-col">
					<h1 className="mb-2 text-xl font-semibold">
						{t("crud_modal_otherTeachers_label")}
					</h1>
					<div className="flex flex-col gap-2">
						{filteredTeachers.length !== 0 ? (
							filteredTeachers.map((teacher: TeacherInterface) => (
								<div
									key={teacher.teacher_ID}
									className="flex flex-row items-center justify-between gap-4 px-2 py-1 border border-opacity-25 border-standardBlack rounded-xl">
									<Admin_Clubs_modal_update_teachers_teacher_card teacher_ID={teacher.teacher_ID} />
									{/* Add button */}
									<div
										onClick={() => {
											addTeacher(teacher.teacher_ID);
										}}
										className={`${change_button_style} hover:bg-success cursor-pointer`}>
										<i className="text-white fa-solid fa-plus"></i>
									</div>
								</div>
							))
						) : (
							<h1 className="font-semibold opacity-50">
								{t("crud_modal_noTeachers_message")}
							</h1>
						)}
					</div>
				</div>
				<Button
					label={t("update_teachers_submit_button_title")}
					icon="fa-solid fa-pencil"
					onClick={handleModalClose}
				/>
			</div>
		</Modal>
	);
};

export default Admin_Clubs_modal_update_teachers;
