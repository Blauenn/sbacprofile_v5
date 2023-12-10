import React, {
	createContext,
	useContext,
	useState,
	ReactNode,
	useMemo,
} from "react";

interface FilterInterface {
	selected_major: number,
	selected_level: number,
	selected_class: number,
	search_field: string,
}

// Type //
type StudentsFiltersContextType = {
	filters: FilterInterface;
	setFilters: React.Dispatch<React.SetStateAction<FilterInterface>>;
};
type StudentsFiltersContextProviderProps = {
	children: ReactNode;
};

// Context //
const StudentsFiltersContext = createContext<StudentsFiltersContextType | undefined>(
	undefined
);

export function useContext_Students_filters() {
	const context = useContext(StudentsFiltersContext);
	if (context === undefined) {
		throw new Error("useContext_Students_filters is not used within its provider");
	}
	return context;
}

export function StudentsFiltersContextProvider({
	children,
}: Readonly<StudentsFiltersContextProviderProps>) {
	const [filters, setFilters] = useState({
		selected_major: 0,
		selected_level: 0,
		selected_class: 0,
		search_field: "",
	});

	const contextValue = useMemo(
		() => ({
			filters,
			setFilters
		}),
		[filters, setFilters]
	);

	return (
		<StudentsFiltersContext.Provider value={contextValue}>
			{children}
		</StudentsFiltersContext.Provider>
	);
}
