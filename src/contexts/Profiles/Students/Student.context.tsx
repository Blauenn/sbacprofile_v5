import React, {
	createContext,
	useContext,
	useState,
	ReactNode,
	useMemo,
} from "react";
import axios from "axios";
import { StudentInterface } from "../../../interfaces/profiles.interface";
// Functions //
import { title_case_capitalize } from "../../../functions/string.function";
// Constants //
import { API_ENDPOINT } from "../../../constants/ENDPOINTS";

interface StudentContextInterface {
	status: boolean;
	result: StudentInterface[];
}

// Type //
type StudentsContextType = {
	students: StudentContextInterface;
	setStudents: React.Dispatch<React.SetStateAction<StudentContextInterface>>;
	studentCount: number;
	setStudentCount: React.Dispatch<React.SetStateAction<number>>;
	fetchStudents: (force?: boolean) => void;
};
type StudentsContextProviderProps = {
	children: ReactNode;
};

// Context //
const StudentsContext = createContext<StudentsContextType | undefined>(
	undefined
);

export function useContext_Students() {
	const context = useContext(StudentsContext);
	if (context === undefined) {
		throw new Error("useContext_Students is not used within its provider");
	}
	return context;
}

export function StudentsContextProvider({
	children,
}: Readonly<StudentsContextProviderProps>) {
	const [students, setStudents] = useState<StudentContextInterface>({
		status: false,
		result: [],
	});
	const [studentCount, setStudentCount] = useState<number>(0);

	const fetchStudents = async (force?: boolean) => {
		if (force || (!students.status && students.result.length === 0)) {
			try {
				const response: { data: StudentContextInterface; } = await axios.get(
					`${API_ENDPOINT}/api/v1/student/getAll`
				);

				// Capitalize names //
				const modifiedStudents = response.data.result.map(student => ({
					...student,
					student_first_name: title_case_capitalize(student.student_first_name),
					student_last_name: title_case_capitalize(student.student_last_name),
				}));

				setStudents({
					status: response.data.status,
					result: modifiedStudents,
				});

				setStudentCount(modifiedStudents.length);
			} catch (error) {
				setStudents({
					status: false,
					result: [],
				});
				setStudentCount(0);
			}
		}
	};

	const contextValue = useMemo(
		() => ({
			students,
			setStudents,

			studentCount,
			setStudentCount,

			fetchStudents,
		}),
		[students, studentCount]
	);

	return (
		<StudentsContext.Provider value={contextValue}>
			{children}
		</StudentsContext.Provider>
	);
}
