"use client";

import Button from "./components/Button";
import { useFormState } from "react-dom";
import { deleteTodo } from "./actions";

const initialState = {
	message: "",
};

export default function DeleteForm({ id, todo }: { id: number; todo: string }) {
	const [state, formAction] = useFormState(deleteTodo, initialState);

	return (
		<form action={formAction}>
			<input type="hidden" name="id" value={id} />
			<input type="hidden" name="todo" value={todo} />
			<Button label="del" loading="..." />
		</form>
	);
}
