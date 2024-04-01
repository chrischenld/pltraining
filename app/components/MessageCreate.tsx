"use client";

import { useFormState } from "react-dom";
import { createMessage } from "../actions";
import SubmitButton from "./SubmitButton";
import { EMPTY_FORM_STATE } from "../util";
import FieldError from "./FormFieldError";

export default function MessageCreate() {
	const [state, formAction] = useFormState(createMessage, EMPTY_FORM_STATE);

	return (
		<form action={formAction} className="flex flex-col w-96 gap-4">
			<div className="flex flex-col gap-1">
				<label htmlFor="title" className="text-neutral-400">
					title
				</label>
				<input
					id="title"
					name="title"
					className="h-8 px-2 border border-neutral-700"
				></input>
				<span className="text-xs text-red-400">
					{state.fieldErrors["title"]?.[0]}
				</span>
				<FieldError state={state} name="title" />
			</div>

			<div className="flex flex-col gap-1">
				<label htmlFor="text" className="text-neutral-400">
					text
				</label>
				<input
					type="text"
					id="text"
					name="text"
					className="h-8 px-2 border border-neutral-700"
				></input>
				<FieldError state={state} name="text" />
			</div>

			<SubmitButton label="send" loading="..." />
		</form>
	);
}
