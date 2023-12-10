import { ReactNode, createContext, useContext, useMemo, useState } from "react";
import axios from "axios";
import { MajorInterface } from "../interfaces/common.interface";
// Constants //
import { API_ENDPOINT } from "../constants/ENDPOINTS";

interface MajorContextInterface {
	status: boolean;
	result: MajorInterface[];
}

// Type //
type MajorContextType = {
	majors: MajorContextInterface;
	setMajors: React.Dispatch<React.SetStateAction<MajorContextInterface>>;
	fetchMajors: (force?: boolean) => void;
};
type MajorContextProviderProps = {
	children: ReactNode;
};

// Context //
const MajorsContext = createContext<MajorContextType | undefined>(undefined);

export function useContext_Majors() {
	const context = useContext(MajorsContext);
	if (context === undefined) {
		throw new Error("useContext_Majors is not used within its provider");
	}
	return context;
}

const fallbackMajors = [
	{ major_ID: 1, major_name: "Accounting" },
	{ major_ID: 2, major_name: "Business Computer" },
	{ major_ID: 3, major_name: "Computer Graphic" },
	{ major_ID: 4, major_name: "Foreign Language" },
	{ major_ID: 5, major_name: "Hotel Management" },
	{ major_ID: 6, major_name: "Information Technology" },
	{ major_ID: 7, major_name: "Marketing" },
	{ major_ID: 8, major_name: "Tourism" },
];

export function MajorContextProvider({
	children,
}: Readonly<MajorContextProviderProps>) {
	const [majors, setMajors] = useState<MajorContextInterface>({
		status: true,
		result: fallbackMajors,
	});

	const fetchMajors = async (force?: boolean) => {
		if (force || (!majors.status && majors.result.length === 0)) {
			try {
				const response: { data: MajorContextInterface; } = await axios.get(
					`${API_ENDPOINT}/api/v1/major/getAll`
				);

				setMajors(response.data);
			} catch (error) {
				setMajors({
					status: true,
					result: fallbackMajors,
				});
			}
		}
	};

	const contextValue = useMemo(
		() => ({
			majors,
			setMajors,
			fetchMajors,
		}),
		[majors, setMajors]
	);

	return (
		<MajorsContext.Provider value={contextValue}>
			{children}
		</MajorsContext.Provider>
	);
}
