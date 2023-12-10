import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Button_feedback from "../../../../Extended/Button_feedback";
import Modal from "../../../../Extended/Modal";
import { StudentInterface } from "../../../../../interfaces/profiles.interface";
// Functions //
import { student_delete } from "../../../../../functions/CRUD/Students/student_delete.function";
// Contexts //
import { useContext_Students } from "../../../../../contexts/Profiles/Students/Student.context";
// Constants //
import { text_color_from_major } from "../../../../../constants/styles/colors/color_from_major.constant";

interface CurrentComponentProp {
	student: StudentInterface;
	open: boolean;
	onModalClose: () => void;
}

const Admin_Students_modal_delete = (props: CurrentComponentProp) => {
	const { student, open, onModalClose } = props;

	const { fetchStudents } = useContext_Students();

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isDeleteSuccess, setIsDeleteSuccess] = useState(false);

	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 3000);

		return () => clearTimeout(timer);
	}, []);

	const handleModalClose = () => {
		onModalClose();
	};

	const setObjectAndSubmit = async () => {
		setIsSubmitting(true);

		const submissionStatus = await student_delete(
			student.primary_student_ID
		);

		if (submissionStatus) {
			fetchStudents(true);

			setIsSubmitting(false);
			setIsDeleteSuccess(true);

			handleModalClose();
		} else {
			setIsSubmitting(false);
			setIsDeleteSuccess(false);
		}
	};

	const { t } = useTranslation("crud_modal_students");

	return (
		<Modal
			open={open}
			onModalClose={handleModalClose}
			icon="fa-solid fa-trash-can"
			title={t("delete_modal_header")}>
			<div className="flex flex-col w-full gap-8">
				<h1 className="text-xl opacity-50">
					{t("delete_modal_message")}
				</h1>
				<div className="flex flex-col gap-2 p-4 border rounded-xl">
					<h1 className="opacity-50 text-md">{student.student_ID}</h1>
					<h1 className={`text-2xl font-semibold ${text_color_from_major[student.student_major]}`}>
						{student.student_first_name} {student.student_last_name}
					</h1>
					<h1 className="text-xl">
						{student.student_first_name_thai} {student.student_last_name_thai}
					</h1>
				</div>
				{/* Submit button */}
				<Button_feedback
					label={t("delete_modal_submit_button_title")}
					successLabel={t("delete_modal_submit_success_message")}
					icon="fa-solid fa-trash-can"
					background_color="hover:bg-error"
					border_color="border-error"
					text_color="text-error"
					disabled={isLoading}
					isPending={isSubmitting}
					isSuccess={isDeleteSuccess}
					onClick={setObjectAndSubmit}
				/>
			</div>
		</Modal>
	);
};

export default Admin_Students_modal_delete;
