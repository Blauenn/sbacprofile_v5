import { useTranslation } from 'react-i18next';
import fade_transition from '../animations/fade_transition.transition';
// Functions //
import { text_from_position } from "../functions/account/account_info.function";
// Contexts //
import { useContext_Account } from '../contexts/Account.context';
// Components //
import Page_header from "../components/Miscellaneous/common/Page_header.component";
import Dashboard_quickAccess_button_list from "../components/Dashboard/Buttons/Dashboard_quickAccess_button_list.component";
import Dashboard_selfInfo from "../components/Dashboard/Dashboard_selfInfo.component";
import Skeleton_Dashboard_selfInfo from "../components/Dashboard/Skeleton_Dashboard_selfInfo.component";
import Loading from "../components/Miscellaneous/Loading.component";

const Dashboard = () => {
	const { userInfo } = useContext_Account();

	const { t } = useTranslation("page_dashboard");

	return (
		<>
			<Page_header
				icon="fa-solid fa-bolt-lightning"
				text={t("header")}
			/>

			<div className="grid w-full grid-cols-1 gap-8 xl:grid-cols-8">
				<div className="col-span-8 xl:col-span-6">
					{userInfo.status ? (
						<Dashboard_quickAccess_button_list
							profile={text_from_position(userInfo.result.profile_position)}
						/>
					) : <Loading />}
				</div>
				<div className="col-span-8 xl:col-span-2">
					{userInfo.status ? (
						<Dashboard_selfInfo />
					) : (
						<Skeleton_Dashboard_selfInfo />
					)}
				</div>
			</div>
		</>
	);
};

export default fade_transition(Dashboard);