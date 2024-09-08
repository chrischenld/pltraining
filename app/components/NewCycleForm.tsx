"use client";

import { useFormState } from "react-dom";
import NumberInput from "./NumberInput";
import Button from "./Button";
import { createNewCycle } from "../actions";

const initialState = { success: false, error: undefined };

export default function NewCycleForm() {
	const [state, formAction] = useFormState(
		(_: unknown, formData: FormData) => createNewCycle(formData),
		initialState
	);

	return (
		<form
			action={formAction}
			id="new-cycle"
			className="flex flex-col gap-4 pb-24"
		>
			<NumberInput label="Squat" id="squat" defaultValue={315} min={0} />
			<NumberInput label="Bench" id="bench" min={0} />
			<NumberInput label="Deadlift" id="deadlift" min={0} />
			<NumberInput label="Overhead Press" id="overheadPress" min={0} />
		</form>
	);
}
