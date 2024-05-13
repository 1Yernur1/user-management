import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { deleteUser } from "../../service";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { UserModel } from "../../model";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

interface UserListTableProps {
	data?: UserModel[];
}

export const UserListTable = ({ data }: UserListTableProps) => {
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();

	const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleOpenMenu = (e: React.MouseEvent<HTMLButtonElement>, userId: number) => {
		setSelectedUserId(userId);
		setAnchorEl(e.currentTarget);
	};

	const handleCloseMenu = () => {
		setAnchorEl(null);
	};

	const queryClient = useQueryClient();
	const mutation = useMutation({
		mutationKey: ["deleteUser", selectedUserId],
		mutationFn: () => deleteUser(selectedUserId!),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["users"] });
		},
	});

	const columns: GridColDef[] = [
		{ field: "id", headerName: "ID", flex: 0.5 },
		{ field: "firstName", headerName: "Name", flex: 1 },
		{ field: "lastName", headerName: "Last Name", flex: 1 },
		{ field: "email", headerName: "Email", flex: 1 },
		{
			field: "registrationDate",
			headerName: "Registration Date",
			flex: 1,
			valueFormatter: (params: { value: string }) => params.value,
		},
		{
			field: "skills",
			headerName: "Skills",
			sortable: false,
			flex: 2,
			renderCell: (params) => (
				<>
					{params.value.map((skill: string, index: number) => (
						<span key={index} className="bg-slate-300 px-4 py-2 rounded-md text-black mr-4 last:mr-0">
							{skill}
						</span>
					))}
				</>
			),
		},
		{
			field: "actions",
			headerName: "",
			sortable: false,
			renderCell: (params) => (
				<IconButton onClick={(e) => handleOpenMenu(e, params.row.id)}>
					<MoreHorizIcon />
				</IconButton>
			),
		},
	];

	const handleChangePage = ({ page, pageSize }: GridPaginationModel) => {
		searchParams.set("page", page.toString());
		searchParams.set("pageSize", pageSize.toString());
		setSearchParams(searchParams);
	};

	const handleDeleteUser = () => {
		mutation.mutate();
		setAnchorEl(null);
	};

	return (
		<div className="container mx-auto mt-6 px-4">
			<DataGrid
				rows={data}
				columns={columns}
				initialState={{
					pagination: {
						paginationModel: {
							page: Number(searchParams.get("page")) || 0,
							pageSize: Number(searchParams.get("pageSize")) || 10,
						},
					},
				}}
				onPaginationModelChange={(model) => handleChangePage(model)}
			/>
			<Menu open={open} anchorEl={anchorEl} onClose={handleCloseMenu}>
				<MenuItem onClick={() => navigate(`/${selectedUserId}/edit`)}>Edit</MenuItem>
				<MenuItem onClick={handleDeleteUser}>Delete</MenuItem>
			</Menu>
		</div>
	);
};
