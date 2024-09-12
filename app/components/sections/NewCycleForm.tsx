"use client";

import { useFormState } from "react-dom";
import NumberInput from "../base/NumberInput";
import { createNewCycle } from "../../actions";

const initialState = { message: "" };

export default function NewCycleForm() {
	const [state, formAction] = useFormState(createNewCycle, initialState);

	return (
		<form
			action={formAction}
			id="new-cycle"
			className="flex flex-col gap-4 pb-24"
		>
			{state.message && <p className="text-fg-danger">{state.message}</p>}
			<NumberInput label="Squat" id="squat" defaultValue={315} min={0} />
			<NumberInput label="Bench" id="bench" min={0} />
			<NumberInput label="Deadlift" id="deadlift" min={0} />
			<NumberInput label="Overhead Press" id="overheadPress" min={0} />
		</form>
	);
}
