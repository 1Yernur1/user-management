import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../service";
import { Header } from "../shared";
import { UserListTable } from "../shared/components";

export const UsersPage = () => {
	const { data, isLoading, isError } = useQuery({
		queryKey: ["users"],
		queryFn: getAllUsers,
	});

	if (isLoading) return <p>Loading...</p>;
	if (isError) return <p>Error</p>;

	return (
		<div>
			<Header />
			<UserListTable data={data} />
		</div>
	);
};
