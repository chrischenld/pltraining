"use client";

import Button from "./components/Button";
import { useFormState } from "react-dom";
import { markRowsWithDate } from "./actions";

const initialState = {
	message: "",
	setId: 0,
};

export default function MarkDateForm({ setId }: { setId: number }) {
	const [state, formAction] = useFormState(markRowsWithDate, initialState);

	return (
		<form action={formAction}>
			<input type="hidden" name="setId" value={setId} />
			<Button label={`mark set ${setId} done`} loading="..." />
		</form>
	);
}
