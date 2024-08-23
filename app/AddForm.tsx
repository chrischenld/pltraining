"use client";

import { createTodo } from "./actions";
import Button from "./components/Button";
import { useFormState } from "react-dom";

const initialState = {
	message: "",
	resetKey: "",
};

export default function AddForm() {
	const [state, formAction] = useFormState(createTodo, initialState);

	return (
		<form
			action={formAction}
			key={state?.resetKey}
			className="flex flex-col gap-4"
		>
			<div className="flex flex-col gap-2">
				<label htmlFor="todo" className="block">
					add todo
				</label>
				<input
					type="text"
					id="todo"
					name="todo"
					required
					className="h-8 px-2 border bg-neutral-950 border-neutral-700"
				></input>
			</div>
			<Button label="submit" loading="..." />
		</form>
	);
}
