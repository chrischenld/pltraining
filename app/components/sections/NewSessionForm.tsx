"use client";

import { Session, Set } from "@/app/types";
import SetGrid from "./SetGrid";
import NumberInput from "../base/NumberInput";
import Button from "../base/Button";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { useEffect, useCallback, useTransition, useState } from "react";

interface NewSessionFormProps {
	sessionData: Session;
	setData: Set[];
}

const initialState = { message: "", success: false };

// This is a placeholder for the actual server action
const updateSession = async (prevState: any, formData: FormData) => {
	// Implement the actual update logic here
	return { message: "Session updated successfully", success: true };
};

export default function NewSessionForm({
	sessionData,
	setData,
}: NewSessionFormProps) {
	const [state, formAction] = useFormState(updateSession, initialState);
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
		<form
			action={handleSubmit}
			className="grid grid-cols-subgrid col-span-full gap-y-8 pb-20"
		>
			{state.message && (
				<p
					className={`col-span-full ${
						state.success ? "text-fg-success" : "text-fg-danger"
					}`}
				>
					{state.message}
				</p>
			)}
			<SetGrid />
			<div className="grid grid-cols-subgrid col-span-full">
				<NumberInput
					label="Weight"
					id="weight"
					min={0}
					defaultValue={265}
					className="grid grid-cols-subgrid col-span-full"
					outerClassName="border-t-0"
				/>
				<NumberInput
					label="Reps"
					id="reps"
					min={0}
					defaultValue={3}
					className="grid grid-cols-subgrid col-span-full"
					outerClassName="border-t-0"
				/>
				<NumberInput
					label="Set"
					id="set"
					defaultValue={1}
					min={0}
					className="grid grid-cols-subgrid col-span-full"
				/>
			</div>
			<div className="grid grid-cols-subgrid col-span-full p-2 fixed bottom-0 left-0 right-0 bg-gray-2 border-t border-t-gray-6">
				<Button
					label="Next set"
					loading="Submitting..."
					completed="Submitted"
					className="w-full"
					// disabled={isPending || isCompleted}
					// isCompleted={isCompleted}
				/>
			</div>
			<p className="col-span-full">Session ID: {sessionData.session_id}</p>
		</form>
	);
}
