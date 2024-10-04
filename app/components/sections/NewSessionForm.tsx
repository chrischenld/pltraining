"use client";

import { Session } from "@/app/types";
import SetGrid from "./SetGrid";
import NumberInput from "../base/NumberInput";
import Button from "../base/Button";

interface NewSessionFormProps {
	sessionData: Session;
}

export default function NewSessionForm({ sessionData }: NewSessionFormProps) {
	// Use sessionData to pre-fill the form
	return (
		<form className="grid grid-cols-subgrid col-span-full gap-y-8 pb-20">
			<SetGrid />
			<div className="grid grid-cols-subgrid col-span-full">
				<NumberInput
					label="Squat"
					id="squat"
					defaultValue={315}
					min={0}
					className="grid grid-cols-subgrid col-span-full"
				/>
				<NumberInput
					label="Bench"
					id="bench"
					min={0}
					className="grid grid-cols-subgrid col-span-full"
					outerClassName="border-t-0"
				/>
				<NumberInput
					label="Deadlift"
					id="deadlift"
					min={0}
					className="grid grid-cols-subgrid col-span-full"
					outerClassName="border-t-0"
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
			{/* ... */}
		</form>
	);
}
