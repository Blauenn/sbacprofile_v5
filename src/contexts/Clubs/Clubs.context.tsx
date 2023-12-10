import React, {
	createContext,
	useContext,
	useState,
	ReactNode,
	useMemo,
} from "react";
import { API_ENDPOINT } from "../../constants/ENDPOINTS";
import { ClubInterface, ClubJoinRequestInterface, ClubLeaveRequestInterface, ClubManagerInterface, ClubMembershipInterface } from "../../interfaces/clubs.interface";
import axios from "axios";

interface ClubContextInterface {
	status: boolean;
	result: ClubInterface[];
}
interface ClubMembershipContextInterface {
	status: boolean;
	result: ClubMembershipInterface[];
}
interface ClubManagerContextInterface {
	status: boolean;
	result: ClubManagerInterface[];
}
interface ClubJoinRequestContextInterface {
	status: boolean;
	result: ClubJoinRequestInterface[];
}
interface ClubLeaveRequestContextInterface {
	status: boolean;
	result: ClubLeaveRequestInterface[];
}

// Type //
type ClubsContextType = {
	clubs: ClubContextInterface;
	setClubs: React.Dispatch<React.SetStateAction<ClubContextInterface>>;
	fetchClubs: (force?: boolean) => void;

	clubMemberships: ClubMembershipContextInterface;
	setClubMemberships: React.Dispatch<React.SetStateAction<ClubMembershipContextInterface>>;
	fetchClubMemberships: (force?: boolean) => void;

	clubManagers: ClubManagerContextInterface;
	setClubManagers: React.Dispatch<React.SetStateAction<ClubManagerContextInterface>>;
	fetchClubManagers: (force?: boolean) => void;

	clubJoinRequests: ClubJoinRequestContextInterface;
	setClubJoinRequests: React.Dispatch<React.SetStateAction<ClubJoinRequestContextInterface>>;
	fetchClubJoinRequests: (force?: boolean) => void;

	clubLeaveRequests: ClubLeaveRequestContextInterface;
	setClubLeaveRequests: React.Dispatch<React.SetStateAction<ClubLeaveRequestContextInterface>>;
	fetchClubLeaveRequests: (force?: boolean) => void;
};
type ClubsContextProviderProps = {
	children: ReactNode;
};

// Context //
const ClubsContext = createContext<ClubsContextType | undefined>(undefined);

export function useContext_Clubs() {
	const context = useContext(ClubsContext);
	if (context === undefined) {
		throw new Error("useContext_Clubs is not used within its provider");
	}
	return context;
}

export function ClubsContextProvider({
	children,
}: Readonly<ClubsContextProviderProps>) {
	const [clubs, setClubs] = useState<ClubContextInterface>({
		status: false,
		result: []
	});
	const [clubMemberships, setClubMemberships] = useState<ClubMembershipContextInterface>({
		status: false,
		result: []
	});
	const [clubManagers, setClubManagers] = useState<ClubManagerContextInterface>({
		status: false,
		result: []
	});
	const [clubJoinRequests, setClubJoinRequests] = useState<ClubJoinRequestContextInterface>({
		status: false,
		result: []
	});
	const [clubLeaveRequests, setClubLeaveRequests] = useState<ClubLeaveRequestContextInterface>({
		status: false,
		result: []
	});

	const fetchClubs = async (force?: boolean) => {
		if (force || (!clubs.status && clubs.result.length === 0)) {
			try {
				const response: { data: ClubContextInterface; } = await axios.get(`${API_ENDPOINT}/api/v1/club/getAll`);

				const sortedClubs = [...response.data.result].sort((a: ClubInterface, b: ClubInterface) =>
					a.club_name.localeCompare(b.club_name)
				);

				setClubs({
					status: true,
					result: sortedClubs
				});
			} catch (error) {
				setClubs({
					status: false,
					result: []
				});
			}
		}
	};

	const fetchClubMemberships = async (force?: boolean) => {
		if (force || (!clubMemberships.status && clubMemberships.result.length === 0)) {
			try {
				const response: { data: ClubMembershipContextInterface; } = await axios.get(`${API_ENDPOINT}/api/v1/clubMembership/getAll`);

				setClubMemberships(response.data);
			} catch (error) {
				setClubMemberships({
					status: false,
					result: []
				});
			}
		}
	};

	const fetchClubManagers = async (force?: boolean) => {
		if (force || (!clubManagers.status && clubManagers.result.length === 0)) {
			try {
				const response: { data: ClubManagerContextInterface; } = await axios.get(`${API_ENDPOINT}/api/v1/clubManager/getAll`);

				setClubManagers(response.data);
			} catch (error) {
				setClubManagers({
					status: false,
					result: []
				});
			}
		}
	};

	const fetchClubJoinRequests = async (force?: boolean) => {
		if (force || (!clubJoinRequests.status && clubJoinRequests.result.length === 0)) {
			try {
				const response: { data: ClubJoinRequestContextInterface; } = await axios.get(`${API_ENDPOINT}/api/v1/clubJoinRequest/getAll`);

				setClubJoinRequests(response.data);
			} catch (error) {
				setClubJoinRequests({
					status: false,
					result: []
				});
			}
		}
	};

	const fetchClubLeaveRequests = async (force?: boolean) => {
		if (force || (!clubLeaveRequests.status && clubLeaveRequests.result.length === 0)) {
			try {
				const response: { data: ClubLeaveRequestContextInterface; } = await axios.get(`${API_ENDPOINT}/api/v1/clubLeaveRequest/getAll`);

				setClubLeaveRequests(response.data);
			} catch (error) {
				setClubLeaveRequests({
					status: false,
					result: []
				});
			}
		}
	};

	const contextValue = useMemo(
		() => ({
			clubs,
			setClubs,
			fetchClubs,

			clubMemberships,
			setClubMemberships,
			fetchClubMemberships,

			clubManagers,
			setClubManagers,
			fetchClubManagers,

			clubJoinRequests,
			setClubJoinRequests,
			fetchClubJoinRequests,

			clubLeaveRequests,
			setClubLeaveRequests,
			fetchClubLeaveRequests,
		}),
		[
			clubs,
			setClubs,

			clubMemberships,
			setClubMemberships,

			clubManagers,
			setClubManagers,

			clubJoinRequests,
			setClubJoinRequests,

			clubLeaveRequests,
			setClubLeaveRequests,
		]
	);

	return (
		<ClubsContext.Provider value={contextValue}>
			{children}
		</ClubsContext.Provider>
	);
}
