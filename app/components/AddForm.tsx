"use client";

import { useFormState, useFormStatus } from "react-dom";
import { createTodo } from "../actions";

const initialState = {
	message: "",
};

function SubmitButton() {
	const { pending } = useFormStatus;

	return (
		<button type="submit" aria-disabled={pending}>
			Add
		</button>
	);
}

export function AddForm() {
	const [state, formAction] = useFormState(createTodo, initialState);

	return <form action={formAction}></form>;
}
