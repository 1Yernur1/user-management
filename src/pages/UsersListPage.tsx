import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { getAllUsers } from "../service";
import {
	IconButton,
	Menu,
	MenuItem,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useNavigate } from "react-router-dom";
import { Header } from "../shared";

export const UsersPage = () => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const { data, isLoading, isError } = useQuery({
		queryKey: ["users"],
		queryFn: getAllUsers,
	});

	const handleOpenMenu = (e: React.MouseEvent<HTMLButtonElement>, userId: number) => {
		setSelectedUserId(userId);
		setAnchorEl(e.currentTarget);
	};

	const handleCloseMenu = () => {
		setAnchorEl(null);
	};

	const mutation = useMutation({
		mutationKey: ["deleteUser", selectedUserId],
		mutationFn: async () => {
			const response = await fetch(`http://localhost:3000/users/${selectedUserId}`, {
				method: "DELETE",
			});
			return response.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["users"] });
		},
	});

	if (isLoading) return <p>Loading...</p>;
	if (isError) return <p>Error</p>;

	return (
		<div>
			<Header />
			<div className="container mx-auto mt-6 px-4	">
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }}>
						<TableHead>
							<TableRow>
								<TableCell>ID</TableCell>
								<TableCell>Name</TableCell>
								<TableCell>Last Name</TableCell>
								<TableCell>Email</TableCell>
								<TableCell>Registration Date</TableCell>
								<TableCell>Skills</TableCell>
								<TableCell></TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{data?.map((user) => (
								<TableRow key={user.id}>
									<TableCell>{user.id}</TableCell>
									<TableCell>{user.firstName}</TableCell>
									<TableCell>{user.lastName}</TableCell>
									<TableCell>{user.email}</TableCell>
									<TableCell>{new Date(user.registrationDate).toLocaleDateString()}</TableCell>
									<TableCell>
										<div className="flex gap-4">
											{user.skills?.map((skill) => (
												<span key={skill} className="bg-slate-300 px-4 py-2 rounded-md text-black">
													{skill}
												</span>
											))}
										</div>
									</TableCell>
									<TableCell>
										<IconButton onClick={(e) => handleOpenMenu(e, user.id!)}>
											<MoreHorizIcon />
										</IconButton>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
				<Menu open={open} anchorEl={anchorEl} onClose={handleCloseMenu}>
					<MenuItem onClick={() => navigate(`/${selectedUserId}/edit`)}>Edit</MenuItem>
					<MenuItem
						onClick={() => {
							mutation.mutate();
							setAnchorEl(null);
						}}
					>
						Delete
					</MenuItem>
				</Menu>
			</div>
		</div>
	);
};
