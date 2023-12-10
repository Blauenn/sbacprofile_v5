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
type TeachersFiltersContextType = {
	filters: FilterInterface;
	setFilters: React.Dispatch<React.SetStateAction<FilterInterface>>;
};
type TeachersFiltersContextProviderProps = {
	children: ReactNode;
};

// Context //
const TeachersFiltersContext = createContext<TeachersFiltersContextType | undefined>(
	undefined
);

export function useContext_Teachers_filters() {
	const context = useContext(TeachersFiltersContext);
	if (context === undefined) {
		throw new Error("useContext_Teachers_filters is not used within its provider");
	}
	return context;
}

export function TeachersFiltersContextProvider({
	children,
}: Readonly<TeachersFiltersContextProviderProps>) {
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
		<TeachersFiltersContext.Provider value={contextValue}>
			{children}
		</TeachersFiltersContext.Provider>
	);
}
