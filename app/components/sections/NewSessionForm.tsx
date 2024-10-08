"use client";

import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import {
	useEffect,
	useCallback,
	useTransition,
	useState,
	useMemo,
	useRef,
} from "react";
import NumberInput from "../base/NumberInput";
import { submitSet } from "@/app/actions";
import Button from "@/app/components/base/Button";
import SetGrid from "./SetGrid";
import { Session, Set } from "@/app/types";

const initialState = { message: "", success: false };

export default function NewSessionForm({
	sessionData,
	setData,
}: {
	sessionData: Session;
	setData: Set[];
}) {
	const [state, formAction] = useFormState(submitSet, initialState);
	const router = useRouter();
	const [isPending, startTransition] = useTransition();
	const [isCompleted, setIsCompleted] = useState(false);
	const renderCount = useRef(0);
	const lastSubmissionTime = useRef(0);
	const nextSetIndexRef = useRef<number | null>(null);

	const sortedSetData = useMemo(
		() => [...setData].sort((a, b) => a.set_id - b.set_id),
		[setData]
	);

	const initialNonCompletedIndex = useMemo(() => {
		const index = sortedSetData.findIndex((set) => !set.success);
		return index !== -1 ? index : 0;
	}, [sortedSetData]);

	const [currentSetIndex, setCurrentSetIndex] = useState(
		initialNonCompletedIndex
	);

	const currentSet = sortedSetData[currentSetIndex];

	const resetState = useCallback(() => {
		formAction(new FormData());
	}, [formAction]);

	useEffect(() => {
		renderCount.current += 1;
		console.log(`NewSessionForm meaningful render: ${renderCount.current}`);
		console.log(`Current set index: ${currentSetIndex}`);
		console.log(`Current set ID: ${currentSet?.set_id}`);
		console.log(`Is completed: ${isCompleted}`);

		if (nextSetIndexRef.current !== null) {
			setCurrentSetIndex(nextSetIndexRef.current);
			nextSetIndexRef.current = null;
		}

		return () => {
			console.log("NewSessionForm is unmounting");
		};
	}, [currentSetIndex, currentSet, isCompleted, setData]);

	const handleSubmit = useCallback(
		(formData: FormData) => {
			const now = Date.now();
			const timeSinceLastSubmission = lastSubmissionTime.current
				? now - lastSubmissionTime.current
				: "First submission";
			console.log(
				`Submitting form at ${now}. Time since last submission: ${timeSinceLastSubmission}ms`
			);
			lastSubmissionTime.current = now;

			formData.append(
				"weightProgrammed",
				currentSet.weight_programmed?.toString() || "0"
			);
			formData.append("repsProgrammed", currentSet.reps_programmed.toString());
			formAction(formData);
		},
		[formAction, currentSet]
	);

	useEffect(() => {
		if (state.success) {
			console.log("Successful submission, updating state");
			startTransition(() => {
				const nextNonCompletedIndex = sortedSetData.findIndex(
					(set, index) => index > currentSetIndex && !set.success
				);
				if (nextNonCompletedIndex !== -1) {
					console.log(
						`Moving to next non-completed set: ${sortedSetData[nextNonCompletedIndex].set_id}`
					);
					nextSetIndexRef.current = nextNonCompletedIndex;
				} else {
					console.log("All sets completed");
					setIsCompleted(true);
				}
				router.refresh();
				resetState();
			});
		}
	}, [state, currentSetIndex, sortedSetData, router, resetState]);

	return (
		<>
			<form
				action={handleSubmit}
				className="grid grid-cols-subgrid col-span-full gap-y-3 pb-20"
			>
				<SetGrid
					setData={sortedSetData}
					onSetSelect={setCurrentSetIndex}
					currentSetIndex={currentSetIndex}
					primaryLiftType={sessionData.primary_lift_type}
					secondaryLiftType={sessionData.secondary_lift_type}
					jokerSets={2}
				/>
				<input type="hidden" name="setId" value={currentSet.set_id} />
				<div className="grid grid-cols-subgrid col-span-full">
					<NumberInput
						label="Weight"
						id="weightPerformed"
						name="weightPerformed"
						defaultValue={currentSet.weight_programmed || 0}
						min={0}
						className="grid grid-cols-subgrid col-span-full"
					/>
					<NumberInput
						label="Reps"
						id="repsPerformed"
						name="repsPerformed"
						defaultValue={currentSet.reps_programmed}
						min={0}
						className="grid grid-cols-subgrid col-span-full"
						outerClassName="border-t-0"
					/>
				</div>

				<div className="grid grid-cols-subgrid col-span-full p-2 fixed bottom-0 left-0 right-0 bg-gray-2 border-t border-t-gray-6">
					<Button
						label={
							currentSetIndex < sortedSetData.length - 1
								? "Submit Set"
								: "Complete Session"
						}
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
