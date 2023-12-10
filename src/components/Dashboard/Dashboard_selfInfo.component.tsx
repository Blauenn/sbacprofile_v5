// Contexts //
import { useContext_Account } from "../../contexts/Account.context";
// Constants //
import { background_color_from_major } from "../../constants/styles/colors/color_from_major.constant";
import { CDN_ENDPOINT } from "../../constants/ENDPOINTS";

const Dashboard_selfInfo = () => {
	const { userInfo } = useContext_Account();

	const formatted_email = userInfo.result.profile_email.substring(
		0,
		userInfo.result.profile_email.indexOf("@")
	);
	const formatted_phone_number = `${userInfo.result.profile_phone.substring(
		0,
		3
	)}-${userInfo.result.profile_phone.substring(
		3,
		6
	)}-${userInfo.result.profile_phone.substring(6)}`;
	const formatted_line_ID = userInfo.result.profile_line_ID.toString().toLowerCase();

	return (
		<div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-1">
			<div className={`flex flex-col items-center gap-2 sm:gap-4 bg-white shadow-sm rounded-xl px-6 py-4`}>
				<div className="flex flex-col items-center gap-1">
					<img src={`${CDN_ENDPOINT}${userInfo.result.profile_image}`} className={`rounded-full w-[120px] h-[120px] xl:w-[180px] xl:h-[180px] ${background_color_from_major[userInfo.result.profile_major]}`} />
					<h1 className="opacity-50 text-md">{userInfo.result.profile_ID}</h1>
				</div>
				<div className="flex flex-col gap-0 sm:gap-2">
					<h1 className="text-xl font-semibold">{userInfo.result.profile_first_name} {userInfo.result.profile_last_name}</h1>
					<h1 className="text-lg opacity-50">{userInfo.result.profile_first_name_thai} {userInfo.result.profile_last_name_thai}</h1>
				</div>
			</div>
			<div className={`bg-white shadow-sm rounded-xl px-6 py-4 flex flex-col gap-2`}>
				{/* Email */}
				<h1 className="text-lg">
					<i className="fa-solid fa-at me-4 | hidden sm:inline-block"></i>
					{formatted_email}
				</h1>
				{/* Phone */}
				{formatted_phone_number != "--" ? (
					<h1 className="text-lg">
						<i className="fa-solid fa-phone me-4 | hidden sm:inline-block"></i>
						{formatted_phone_number}
					</h1>
				) : null}
				{/* Line ID */}
				{formatted_line_ID != "" ? (
					<h1 className="text-lg">
						<i className="fa-brands fa-line me-4 | hidden sm:inline-block"></i>
						{formatted_line_ID}
					</h1>
				) : null}
			</div>
		</div>
	);
};

export default Dashboard_selfInfo;
