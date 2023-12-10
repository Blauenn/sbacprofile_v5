import {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import { UserInfoInterface } from "../interfaces/account.interface";
// Functions //
import { fetch_user_info } from "../functions/fetch/fetch_user.function";

// Export for the use in the logout function. //
export interface UserInfoContextInterface {
	status: false;
	result: UserInfoInterface;
}

// Type //
type AccountContextType = {
	accessToken: string;
	setAccessToken: React.Dispatch<React.SetStateAction<string>>;
	userInfo: UserInfoContextInterface;
	setUserInfo: React.Dispatch<React.SetStateAction<UserInfoContextInterface>>;
	isLoggedIn: boolean;
	setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};
type AccountContextProviderProps = {
	children: ReactNode;
};

// Context //
const AccountContext = createContext<AccountContextType | undefined>(undefined);

export function useContext_Account() {
	const context = useContext(AccountContext);
	if (context === undefined) {
		throw new Error("useContext_Account is not used within its provider");
	}
	return context;
}

export function AccountContextProvider({
	children,
}: Readonly<AccountContextProviderProps>) {
	const [accessToken, setAccessToken] = useState<string>("");
	const [userInfo, setUserInfo] = useState<UserInfoContextInterface>({
		status: false,
		result: {
			primary_profile_ID: 0,
			profile_position: 0,
			profile_ID: 0,
			profile_first_name: "",
			profile_last_name: "",
			profile_nickname: "",
			profile_first_name_thai: "",
			profile_last_name_thai: "",
			profile_nickname_thai: "",
			profile_gender: 0,
			profile_major: 0,
			profile_level: 0,
			profile_class: 0,
			profile_phone: "",
			profile_email: "0",
			profile_line_ID: "",
			profile_image: "",
		}
	});
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

	const contextValue = useMemo(
		() => ({
			accessToken,
			setAccessToken,

			userInfo,
			setUserInfo,

			isLoggedIn,
			setIsLoggedIn,
		}),
		[
			accessToken,
			setAccessToken,

			userInfo,
			setUserInfo,

			isLoggedIn,
			setIsLoggedIn,
		],
	);

	useEffect(() => {
		if (userInfo.result.primary_profile_ID === 0) {
			fetch_user_info(accessToken, setUserInfo);
		}
	}, []);

	return (
		<AccountContext.Provider value={contextValue}>
			{children}
		</AccountContext.Provider>
	);
}
