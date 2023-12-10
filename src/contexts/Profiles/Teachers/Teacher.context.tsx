import React, {
	createContext,
	useContext,
	useState,
	ReactNode,
	useMemo,
} from "react";
import axios from "axios";
import { TeacherInterface } from "../../../interfaces/profiles.interface";
import { title_case_capitalize } from "../../../functions/string.function";
// Constants //
import { API_ENDPOINT } from "../../../constants/ENDPOINTS";

interface TeacherContextInterface {
	status: boolean;
	result: TeacherInterface[];
}

// Type //
type TeachersContextType = {
	teachers: TeacherContextInterface;
	setTeachers: React.Dispatch<React.SetStateAction<TeacherContextInterface>>;
	teacherCount: number;
	setTeacherCount: React.Dispatch<React.SetStateAction<number>>;
	fetchTeachers: (force?: boolean) => void;
};
type TeachersContextProviderProps = {
	children: ReactNode;
};

// Context //
const TeachersContext = createContext<TeachersContextType | undefined>(
	undefined
);

export function useContext_Teachers() {
	const context = useContext(TeachersContext);
	if (context === undefined) {
		throw new Error("useContext_Teachers is not used within its provider");
	}
	return context;
}

export function TeachersContextProvider({
	children,
}: Readonly<TeachersContextProviderProps>) {
	const [teachers, setTeachers] = useState<TeacherContextInterface>({
		status: false,
		result: [],
	});
	const [teacherCount, setTeacherCount] = useState<number>(0);

	const fetchTeachers = async (force?: boolean) => {
		if (force || (!teachers.status && teachers.result.length === 0)) {
			try {
				const response: { data: TeacherContextInterface; } = await axios.get(
					`${API_ENDPOINT}/api/v1/teacher/getAll`
				);

				// Capitalize names //
				const modifiedTeachers = response.data.result.map(teacher => ({
					...teacher,
					teacher_first_name: title_case_capitalize(teacher.teacher_first_name),
					teacher_last_name: title_case_capitalize(teacher.teacher_last_name),
				}));

				setTeachers({
					status: response.data.status,
					result: modifiedTeachers,
				});

				setTeacherCount(response.data.result.length);
			} catch (error) {
				setTeachers({
					status: false,
					result: [],
				});
				setTeacherCount(0);
			}
		}
	};

	const contextValue = useMemo(
		() => ({
			teachers,
			setTeachers,

			teacherCount,
			setTeacherCount,

			fetchTeachers,
		}),
		[teachers, teacherCount]
	);

	return (
		<TeachersContext.Provider value={contextValue}>
			{children}
		</TeachersContext.Provider>
	);
}
