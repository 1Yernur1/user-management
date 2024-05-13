import { UserModel } from "../model";

export const getAllUsers = async (): Promise<UserModel[]> => {
	const response = await fetch("http://localhost:3000/users");
	return response.json();
};

export const getUser = async (userId: string): Promise<UserModel> => {
	const response = await fetch(`http://localhost:3000/users/${userId}`);
	return response.json();
};

export const updateUser = async (body: UserModel, userId: string) => {
	const response = await fetch(`http://localhost:3000/users/${userId}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	});

	return response.json();
};

export const createUser = async (data: UserModel) => {
	const response = await fetch("http://localhost:3000/users", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});
	return response.json();
};

export const deleteUser = async (selectedUserId: number) => {
	const response = await fetch(`http://localhost:3000/users/${selectedUserId}`, {
		method: "DELETE",
	});
	return response.json();
};
