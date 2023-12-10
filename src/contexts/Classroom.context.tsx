import { ReactNode, createContext, useContext, useMemo, useState } from "react";
import { ClassroomInterface } from "../interfaces/common.interface";
import axios from "axios";
// Constants //
import { API_ENDPOINT } from "../constants/ENDPOINTS";

interface ClassroomContextInterface {
	status: boolean;
	result: ClassroomInterface[];
}

// Type //
type ClassroomContextType = {
	classrooms: ClassroomContextInterface;
	setClassrooms: React.Dispatch<
		React.SetStateAction<ClassroomContextInterface>
	>;
	fetchClassrooms: (force?: boolean) => void;
};
type ClassroomContextProviderProps = {
	children: ReactNode;
};

// Context //
const ClassroomsContext = createContext<ClassroomContextType | undefined>(
	undefined
);

export function useContext_Classrooms() {
	const context = useContext(ClassroomsContext);
	if (context === undefined) {
		throw new Error("useContext_Classrooms is not used within its provider");
	}
	return context;
}

export function ClassroomContextProvider({
	children,
}: Readonly<ClassroomContextProviderProps>) {
	const [classrooms, setClassrooms] = useState<ClassroomContextInterface>({
		status: false,
		result: [],
	});

	const fetchClassrooms = async (force?: boolean) => {
		if (force || (!classrooms.status && classrooms.result.length === 0)) {
			try {
				const response: { data: ClassroomContextInterface; } = await axios.get(
					`${API_ENDPOINT}/api/v1/classroom`
				);

				const sortedClassrooms = response.data.result.sort((a: ClassroomInterface, b: ClassroomInterface) => {
					if (a.classroom_level !== b.classroom_level) {
						return a.classroom_level - b.classroom_level;
					}

					return a.classroom_class - b.classroom_class;
				});

				setClassrooms({
					status: true,
					result: sortedClassrooms
				});
			} catch (error) {
				setClassrooms({
					status: false,
					result: [],
				});
			}
		}
	};

	const contextValue = useMemo(
		() => ({
			classrooms,
			setClassrooms,
			fetchClassrooms,
		}),
		[classrooms, setClassrooms]
	);

	return (
		<ClassroomsContext.Provider value={contextValue}>
			{children}
		</ClassroomsContext.Provider>
	);
}
