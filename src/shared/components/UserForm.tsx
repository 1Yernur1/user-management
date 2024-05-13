import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { createUser, updateUser } from "../../service";
import { Button, Chip, IconButton, Stack, TextField } from "@mui/material";
import { UserModel } from "../../model";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const defaultValues = {
	firstName: "",
	lastName: "",
	email: "",
	skills: [],
	registrationDate: new Date().toISOString().split('T')[0],
};

interface UserFormProps {
	mode: "create" | "update";
	data?: UserModel;
}

export const UserForm = ({ data = defaultValues, mode }: UserFormProps) => {
	const { userId } = useParams();
	const navigate = useNavigate();
	const location = useLocation();

	const { control, register, handleSubmit, setValue, watch } = useForm({
		defaultValues: data,
	});

	useEffect(() => {
		setValue("id", data.id);
		setValue("skills", data.skills);
		setValue("registrationDate", data.registrationDate);
	}, [data, setValue]);

	const { skills } = watch();

	const mutation = useMutation({
		mutationKey: ["user", userId],
		mutationFn: (data: UserModel) => (mode === "create" ? createUser(data) : updateUser(data, userId!)),
		onSuccess: () => navigate(-1),
	});

	return (
		<div className="min-h-screen grid place-items-center relative">
			<div className="absolute top-4 left-4">
			<IconButton onClick={() => navigate(-1)}>
				<ArrowBackIcon />
			</IconButton>
			</div>
			<form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="flex flex-col gap-6 w-80">
				<TextField label="First Name" {...register("firstName")} />
				<TextField label="Last Name" {...register("lastName")} />
				<TextField label="Email" {...register("email")} type="email" />
				<Controller
					name="skills"
					control={control}
					render={({ field: { value, onChange } }) => (
						<Stack direction="row" spacing={1} alignItems="center">
							{value.map((skill: string) => (
								<Chip key={skill} label={skill} onDelete={() => onChange(value.filter((s: string) => s !== skill))} />
							))}
							{value.length < 3 && (
								<IconButton onClick={() => navigate(`${location.pathname}/skills`)}>
									<AddCircleOutlineIcon />
								</IconButton>
							)}
						</Stack>
					)}
				/>
				<Button type="submit" variant="contained">
					Submit
				</Button>
			</form>
			<Outlet context={[skills, setValue]} />
		</div>
	);
};
