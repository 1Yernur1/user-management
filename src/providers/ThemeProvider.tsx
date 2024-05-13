import { createTheme } from "@mui/material";
import { ThemeProvider as MUIThemeProvider } from "@mui/material/styles";
const theme = createTheme({
	palette: {
		mode: "dark",
	},
});
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
	return <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>;
};
