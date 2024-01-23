import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ClubMembershipInterface } from "../../interfaces/clubs.interface";
// Functions //
import { teacher_access_only } from "../../functions/permission_check.function";
import { clubMembership_delete } from "../../functions/CRUD/Clubs/ClubMemberships/clubMembership_delete.function";
// Contexts //
import { useContext_Account } from "../../contexts/Account.context";
import { useContext_Clubs } from "../../contexts/Clubs/Clubs.context";
// Components //
import Club_studentInfo from "./clubRequests/Club_studentInfo.component";
import Club_student_interact_button from "./clubRequests/Club_student_interact_button.component";

interface CurrentComponentProp {
	clubMembers: ClubMembershipInterface[];
	title: string;
}

const Club_information_members = (props: CurrentComponentProp) => {
	const { clubMembers, title } = props;

	const { userInfo } = useContext_Account();
	const { fetchClubMemberships } = useContext_Clubs();

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);

	const setObjectAndSubmit = async (
		club_ID: number,
		club_student_ID: number
	) => {
		setIsSubmitting(true);

		const submissionStatus = await clubMembership_delete(
			club_ID,
			club_student_ID
		);

		if (submissionStatus) {
			fetchClubMemberships(true);

			setIsUpdateSuccess(true);
		} else {
			setIsUpdateSuccess(false);
		}
		setIsSubmitting(false);
	};

	const { t } = useTranslation("page_teacher_club");

	return clubMembers.length > 0 ? (
		<div className="flex flex-col gap-4">
			<div className="flex flex-row justify-between">
				<h1 className="opacity-50">{title}</h1>
				{isUpdateSuccess ? (
					<h1>
						{t("members_updated_message")}
						<i className="text-success fa-solid fa-circle-check ms-2"></i>
					</h1>
				) : null}
			</div>
			<div className="flex flex-col gap-2">
				{clubMembers.map((clubMembership: ClubMembershipInterface) => (
					<div
						key={clubMembership.club_membership_ID}
						className="flex flex-row items-center justify-between">
						<Club_studentInfo
							student_ID={clubMembership.club_membership_student_ID}
						/>
						{teacher_access_only(userInfo.result.profile_position) ? (
							<div className="flex flex-row gap-4">
								<div className="flex flex-row gap-2">
									{/* Approve button */}
									<Club_student_interact_button
										title={t("club_student_remove_button_title")}
										functionToRun={() => {
											setObjectAndSubmit(
												clubMembership.club_membership_club_ID,
												clubMembership.club_membership_student_ID
											);
										}}
										isSubmitting={isSubmitting}
										icon="fa-solid fa-minus"
										color="border border-error hover:bg-error"
										textColor="text-error"
									/>
								</div>
							</div>
						) : null}
					</div>
				))}
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

export default Club_information_members;
