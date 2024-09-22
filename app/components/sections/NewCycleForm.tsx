"use client";

import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { useEffect, useCallback, useTransition, useState } from "react";
import NumberInput from "../base/NumberInput";
import { createNewCycle } from "@/app/actions";
import Button from "@/app/components/base/Button";

const initialState = { message: "", success: false };

export default function NewCycleForm() {
	const [state, formAction] = useFormState(createNewCycle, initialState);
	const router = useRouter();

	const [isPending, startTransition] = useTransition();
	const [isCompleted, setIsCompleted] = useState(false);

	const handleSubmit = useCallback(
		(formData: FormData) => {
			formAction(formData);
		},
		[formAction]
	);

	useEffect(() => {
		if (state.success) {
			setIsCompleted(true);
			const delay = setTimeout(() => {
				startTransition(() => {
					router.push("/powerlifting");
				});
			}, 750);

			return () => clearTimeout(delay);
		}
	}, [state, router]);

	return (
		<>
			<form
				action={handleSubmit}
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
				<div className="pt-5 pb-6 px-4 fixed bottom-0 left-0 right-0 bg-bg-base border-t border-t-border-default">
					<Button
						label="Create cycle"
						loading="Submitting..."
						completed="Submitted"
						className="w-full"
						disabled={isPending || isCompleted}
						isCompleted={isCompleted}
					/>
				</div>
			</form>
		</>
	);
}
