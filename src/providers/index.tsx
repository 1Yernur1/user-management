import { QueryProvider } from "./QueryProvider";
import { ThemeProvider } from "./ThemeProvider";

export const Providers = ({ children }: { children: React.ReactNode }) => {
	return (
		<QueryProvider>
			<ThemeProvider>{children}</ThemeProvider>
		</QueryProvider>
	);
};
