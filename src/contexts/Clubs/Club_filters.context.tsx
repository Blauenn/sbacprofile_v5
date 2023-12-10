import React, {
	createContext,
	useContext,
	useState,
	ReactNode,
	useMemo,
} from "react";

interface FilterInterface {
	selected_major: number,
	search_field: string,
}

// Type //
type ClubsFiltersContextType = {
	filters: FilterInterface;
	setFilters: React.Dispatch<React.SetStateAction<FilterInterface>>;
};
type ClubsFiltersContextProviderProps = {
	children: ReactNode;
};

// Context //
const ClubsFiltersContext = createContext<ClubsFiltersContextType | undefined>(
	undefined
);

export function useContext_Clubs_filters() {
	const context = useContext(ClubsFiltersContext);
	if (context === undefined) {
		throw new Error("useContext_Clubs_filters is not used within its provider");
	}
	return context;
}

export function ClubsFiltersContextProvider({
	children,
}: Readonly<ClubsFiltersContextProviderProps>) {
	const [filters, setFilters] = useState({
		selected_major: 0,
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
		<ClubsFiltersContext.Provider value={contextValue}>
			{children}
		</ClubsFiltersContext.Provider>
	);
}
