import { RouterProvider } from "react-router-dom";
import { Providers } from "./providers";
import { routes } from "./routes";

export const App = () => {
	return (
		<Providers>
			<RouterProvider router={routes} />
		</Providers>
	);
};
