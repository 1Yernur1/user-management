import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getUser } from "../service";
import { UserForm } from "../shared/components";

export const UserEditPage = () => {
	const { userId } = useParams();

	const { data, isLoading, isError } = useQuery({
		queryKey: ["updateUser", userId],
		queryFn: () => getUser(userId!),
	});

	if (isLoading) return <p>Loading...</p>;
	if (isError) return <p>Error</p>;

	return <UserForm data={data} mode="update" />;
};
