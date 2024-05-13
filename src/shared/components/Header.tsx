import { Link } from "react-router-dom";

export const Header = () => {
	return (
		<header>
			<div className="container mx-auto">
				<nav className="px-6 py-4">
					<ul>
						<li className="flex gap-6 uppercase justify-center text-xl">
							<Link to={"/"} className="hover:text-blue-500 hover:underline">
								Users
							</Link>
							<Link to={"/create"} className="hover:text-blue-500 hover:underline">
								Create
							</Link>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	);
};
