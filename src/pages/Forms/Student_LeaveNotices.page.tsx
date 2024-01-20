import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from "../../components/Extended/Button";
import { LeaveNoticeInterface } from "../../interfaces/forms.interface";
// Contexts //
import { useContext_Account } from "../../contexts/Account.context";
import { useContext_LeaveNotices } from '../../contexts/forms/LeaveNotice.context';
// Components //
import Page_header_return from "../../components/Miscellaneous/common/Page_header_return.component";
import LeaveNotices_rolodex from '../../components/Forms/LeaveNotices/LeaveNotices_rolodex.component';
import Skeleton_Forms_rolodex from "../../components/Forms/Skeleton_Forms_rolodex.component";
import LeaveNotices_modal_create from "../../components/Forms/LeaveNotices/modal/LeaveNotices_modal_create.component";

const Student_LeaveNotices = () => {
	const { userInfo } = useContext_Account();
	const { leaveNotices, fetchLeaveNotices } = useContext_LeaveNotices();

	const [selfLeaveNotices, setSelfLeaveNotices] = useState<LeaveNoticeInterface[]>([]);

	useEffect(() => {
		fetchLeaveNotices();

		const leaveNoticesSelf = [...leaveNotices.result].filter((leaveNotice: LeaveNoticeInterface) => leaveNotice.leave_notice_student_ID === userInfo.result.profile_ID);
		setSelfLeaveNotices(leaveNoticesSelf);
	}, [leaveNotices]);

	const [createModalOpen, setCreateModalOpen] = useState(false);
	const onCreateModalClose = () => {
		setCreateModalOpen(false);
	};

	const { t } = useTranslation("page_student_leaveNotices");

	return (
		<>
			<Page_header_return text={t("header")} />

			<div className="mb-8">
				<Button
					label={t("create_button_title")}
					icon="fa-solid fa-flag"
					onClick={() => { setCreateModalOpen(true); }}
				/>
				<LeaveNotices_modal_create
					open={createModalOpen}
					onModalClose={onCreateModalClose}
				/>
			</div>

			<div className="flex flex-col gap-4">
				{leaveNotices.status ? (
					<LeaveNotices_rolodex leaveNotices={selfLeaveNotices} evaluateAs={1} />
				) : (
					<Skeleton_Forms_rolodex />
				)}
			</div>
		</>
	);
};

export default Student_LeaveNotices;