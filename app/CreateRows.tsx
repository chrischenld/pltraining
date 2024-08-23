"use client";

import { createRows } from "./actions";
import Button from "./components/Button";
import { useFormState } from "react-dom";

const initialState = {};

export default function CreateRows() {
	const [state, formAction] = useFormState(createRows, initialState);

	return (
		<form action={formAction}>
			<Button label="create rows" loading="..." />
		</form>
	);
}
