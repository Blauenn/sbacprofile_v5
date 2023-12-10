import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import { ClubManagerInterface } from "../../interfaces/clubs.interface";
// Contexts //
import { useContext_Teachers } from "../../contexts/Profiles/Teachers/Teacher.context";
// Constants //
import { background_color_from_major } from "../../constants/styles/colors/color_from_major.constant";
import { teacher_image_from_ID, teacher_major_from_ID, teacher_name_thai_from_ID, teacher_name_from_ID } from "../../functions/information/teachers.function";
import { CDN_ENDPOINT } from "../../constants/ENDPOINTS";

interface CurrentComponentProp {
	clubTeachers: ClubManagerInterface[];
	title: string;
}

const Club_information_teachers = (props: CurrentComponentProp) => {
	const { clubTeachers, title } = props;

	const { teachers } = useContext_Teachers();

	const { t } = useTranslation("page_student_club");

	return clubTeachers.length > 0 ? (
		<div className="flex flex-col gap-4">
			<h1 className="opacity-50">{title}</h1>
			<div className="flex flex-col gap-2">
				{clubTeachers.map((clubManager: ClubManagerInterface) =>
					<div
						key={clubManager.club_manager_teacher_ID}
						className="flex flex-row items-center gap-4">
						<img
							src={`${CDN_ENDPOINT}${teacher_image_from_ID(
								clubManager.club_manager_teacher_ID,
								teachers.result
							)}`}
							className={`${background_color_from_major[
								teacher_major_from_ID(
									clubManager.club_manager_teacher_ID,
									teachers.result
								)
							]
								} w-[32px] h-[32px] rounded-full`}
						/>
						<h1 className="line-clamp-1">
							{i18n.language === "th"
								? teacher_name_thai_from_ID(
									clubManager.club_manager_teacher_ID,
									teachers.result
								)
								: teacher_name_from_ID(
									clubManager.club_manager_teacher_ID,
									teachers.result
								)}
						</h1>
					</div>
				)}
			</div>
		</div>
	) : (
		<div className="flex flex-col">
			<h1 className="opacity-50">{t("members_title")}</h1>
			<h1 className="text-2xl font-semibold">
				{t("member_noMembers_message")}
			</h1>
		</div>
	);
};

export default Club_information_teachers;
