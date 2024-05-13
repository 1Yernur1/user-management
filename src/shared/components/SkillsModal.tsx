import { useQuery } from "@tanstack/react-query";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { SkillModel } from "../../model";
import { useState } from "react";

export const SkillsModal = () => {
	const navigate = useNavigate();
	const [skills, setValue] = useOutletContext<[string[], (name: string, value: string[]) => void]>();
	const [skill, setSkill] = useState("");

	const { data } = useQuery({
		queryKey: ["skills"],
		queryFn: async (): Promise<SkillModel[]> => {
			const response = await fetch("http://localhost:3000/skills");
			return response.json();
		},
	});

	const options =
		data
			?.filter((element) => !skills.includes(element.value))
			.map((element) => ({ label: element.value, value: element.value })) || [];

	return (
		<Dialog open fullWidth onClose={() => navigate(-1)}>
			<DialogTitle>Add Skill</DialogTitle>
			<DialogContent>
				<Autocomplete
					options={options}
					isOptionEqualToValue={(option, value) => option.value === value.value}
					renderInput={(params) => <TextField label="Select skill" {...params} />}
					onChange={(_, newValue) => {
						setSkill(newValue?.value || "");
					}}
				/>
			</DialogContent>
			<DialogActions>
				<Button
					onClick={() => {
						skill && setValue("skills", [...skills, skill]);
						navigate(-1);
					}}
				>
					Add
				</Button>
			</DialogActions>
		</Dialog>
	);
};
