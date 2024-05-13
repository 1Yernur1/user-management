import { createBrowserRouter } from "react-router-dom";
import { UsersPage } from "../pages/UsersListPage";
import { UserCreatePage, UserEditPage } from "../pages";
import { SkillsModal } from "../shared";

export const routes = createBrowserRouter([
	{
		path: "/",
		element: <UsersPage />,
	},
	{
		path: "/create",
		element: <UserCreatePage />,
		children: [
			{
				path: "skills",
				element: <SkillsModal />,
			},
		],
	},
	{
		path: "/:userId/edit",
		element: <UserEditPage />,
		children: [
			{
				path: "skills",
				element: <SkillsModal />,
			},
		],
	},
]);
