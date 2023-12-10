import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import fade_transition from '../../../animations/fade_transition.transition';
// Contexts providers //
import { StudentsContextProvider } from '../../../contexts/Profiles/Students/Student.context';
// Contexts //
import { useContext_LeaveNotices } from '../../../contexts/forms/LeaveNotice.context';
// Components //
import Page_header_return from "../../../components/Miscellaneous/common/Page_header_return.component";
import LeaveNotices_rolodex from '../../../components/Forms/LeaveNotices/LeaveNotices_rolodex.component';
import Skeleton_Forms_rolodex from '../../../components/Forms/Skeleton_Forms_rolodex.component';

const Admin_LeaveNotices = () => {
	const { leaveNotices, fetchLeaveNotices } = useContext_LeaveNotices();

	useEffect(() => {
		fetchLeaveNotices();
	}, [leaveNotices]);

	const { t } = useTranslation("page_admin_leaveNotices");

	return (
		<>
			<Page_header_return text={t("header")} />

			{leaveNotices.status ? (
				<StudentsContextProvider>
					<LeaveNotices_rolodex leaveNotices={leaveNotices.result} />
				</StudentsContextProvider>
			) : (
				<Skeleton_Forms_rolodex />
			)
			}
		</>
	);
};

export default fade_transition(Admin_LeaveNotices);