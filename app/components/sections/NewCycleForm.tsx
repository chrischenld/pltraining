"use client";

import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import NumberInput from "../base/NumberInput";
import { createNewCycle } from "@/app/actions";
import Button from "@/app/components/base/Button";

const initialState = { message: "", success: false };

export default function NewCycleForm() {
	const [state, formAction] = useFormState(createNewCycle, initialState);
	const router = useRouter();

	useEffect(() => {
		if (state.success) {
			router.push("/powerlifting");
		}
	}, [state.success, router]);

	return (
		<>
			<form
				action={formAction}
				id="new-cycle"
				className="flex flex-col gap-4 pb-24"
			>
				{state.message && !state.success && (
					<p className={state.success ? "text-fg-success" : "text-fg-danger"}>
						{state.message}
					</p>
				)}
				<NumberInput label="Squat" id="squat" defaultValue={315} min={0} />
				<NumberInput label="Bench" id="bench" min={0} />
				<NumberInput label="Deadlift" id="deadlift" min={0} />
				<NumberInput label="Overhead Press" id="overheadPress" min={0} />
			</form>
			<footer className="fixed bottom-0 left-0 right-0 bg-bg-base border-t border-t-border-default">
				<Button
					label="Create cycle"
					loading="Submitting..."
					form="new-cycle"
					className="w-full"
				/>
			</footer>
		</>
	);
}
