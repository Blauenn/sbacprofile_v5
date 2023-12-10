import React, {
	createContext,
	useContext,
	useState,
	ReactNode,
	useMemo,
} from "react";
import { API_ENDPOINT } from "../../constants/ENDPOINTS";
import axios from "axios";
import { LeaveNoticeInterface } from "../../interfaces/forms.interface";

interface LeaveNoticeContextInterface {
	status: boolean;
	result: LeaveNoticeInterface[];
}

// Type //
type LeaveNoticesContextType = {
	leaveNotices: LeaveNoticeContextInterface;
	setLeaveNotices: React.Dispatch<React.SetStateAction<LeaveNoticeContextInterface>>;
	fetchLeaveNotices: (force?: boolean) => void;
};
type LeaveNoticesContextProviderProps = {
	children: ReactNode;
};

// Context //
const LeaveNoticesContext = createContext<LeaveNoticesContextType | undefined>(
	undefined
);

export function useContext_LeaveNotices() {
	const context = useContext(LeaveNoticesContext);
	if (context === undefined) {
		throw new Error("useContext_LeaveNotices is not used within its provider");
	}
	return context;
}

export function LeaveNoticesContextProvider({
	children,
}: Readonly<LeaveNoticesContextProviderProps>) {
	const [leaveNotices, setLeaveNotices] = useState<LeaveNoticeContextInterface>({
		status: false,
		result: []
	});

	const fetchLeaveNotices = async (force?: boolean) => {
		if (force || (!leaveNotices.status && leaveNotices.result.length === 0)) {
			try {
				const response: { data: LeaveNoticeContextInterface; } = await axios.get(`${API_ENDPOINT}/api/v1/forms/leaveNotice/getAll`);

				const reversedLeaveNotices: LeaveNoticeContextInterface = {
					status: true,
					result: response.data.result.reverse()
				};

				setLeaveNotices(reversedLeaveNotices);
			} catch (error) {
				setLeaveNotices({
					status: false,
					result: []
				});
			}
		}
	};

	const contextValue = useMemo(
		() => ({
			leaveNotices,
			setLeaveNotices,
			fetchLeaveNotices,
		}),
		[leaveNotices, setLeaveNotices]
	);

	return (
		<LeaveNoticesContext.Provider value={contextValue}>
			{children}
		</LeaveNoticesContext.Provider>
	);
}
