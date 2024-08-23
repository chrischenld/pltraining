"use client";

import Button from "./components/Button";
import { useFormState } from "react-dom";
import { setRepsPerformed } from "./actions";

const initialState = {
	message: "",
	setId: 0,
	reps: 0,
};

export default function SetRepsPerformedForm({
	setId,
	reps,
}: {
	setId: number;
	reps?: number;
}) {
	const [state, formAction] = useFormState(setRepsPerformed, initialState);

	return (
		<form action={formAction} className="flex flex-row gap-2">
			<input name="reps" className="w-8 p-2 h-8" />
			<input type="hidden" name="setId" value={setId} />
			<Button label="submit" loading="..." />
		</form>
	);
}
