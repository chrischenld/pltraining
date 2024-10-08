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
			}, 250);

			return () => clearTimeout(delay);
		}
	}, [state, router]);

	return (
		<>
			<form
				action={handleSubmit}
				id="new-cycle"
				className="grid grid-cols-subgrid col-span-full pb-20"
			>
				{state.message && !state.success && (
					<p
						className={`col-span-full ${
							state.success ? "text-fg-success" : "text-fg-danger"
						}`}
					>
						{state.message}
					</p>
				)}
				<NumberInput
					label="Squat"
					id="squat"
					name="squat"
					defaultValue={315}
					min={0}
					className="grid grid-cols-subgrid col-span-full"
				/>
				<NumberInput
					label="Bench"
					id="bench"
					name="bench"
					min={0}
					className="grid grid-cols-subgrid col-span-full"
					outerClassName="border-t-0"
				/>
				<NumberInput
					label="Deadlift"
					id="deadlift"
					name="deadlift"
					min={0}
					className="grid grid-cols-subgrid col-span-full"
					outerClassName="border-t-0"
				/>
				<NumberInput
					label="Overhead Press"
					id="overheadPress"
					name="overheadPress"
					min={0}
					className="grid grid-cols-subgrid col-span-full"
					outerClassName="border-t-0"
				/>
				<div className="grid grid-cols-subgrid col-span-full p-2 fixed bottom-0 left-0 right-0 bg-gray-2 border-t border-t-gray-6">
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
