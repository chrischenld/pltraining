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
import { Session, Set, SetSubmissionState } from "@/app/types";
import Counter from "@/app/components/base/Counter";
import Toast from "@/app/components/base/Toast";

const initialState: SetSubmissionState = { message: "", success: false };

export default function NewSessionForm({
	sessionData,
	setData,
}: {
	sessionData: Session;
	setData: Set[];
}) {
	console.log("NewSessionForm: Component rendering", { sessionData, setData });

	const [state, formAction] = useFormState<SetSubmissionState, FormData>(
		submitSet,
		initialState
	);
	const router = useRouter();
	const [isPending, startTransition] = useTransition();
	const isSubmittingRef = useRef(false);
	const renderCountRef = useRef(0);

	const sortedSetData = useMemo(() => {
		console.log("NewSessionForm: Sorting setData", setData);
		return [...setData].sort((a, b) => a.set_id - b.set_id);
	}, [setData]);

	const [currentSetIndex, setCurrentSetIndex] = useState(() => {
		console.log("NewSessionForm: Calculating initialNonCompletedIndex");
		const index = sortedSetData.findIndex((set) => !set.success);
		return index !== -1 ? index : sortedSetData.length - 1;
	});

	const currentSet = sortedSetData[currentSetIndex];

	const handleSubmit = useCallback(
		(formData: FormData) => {
			console.log("NewSessionForm: handleSubmit called", { currentSet });
			if (isSubmittingRef.current) {
				console.log("NewSessionForm: Submission already in progress, skipping");
				return;
			}

			isSubmittingRef.current = true;
			formData.append(
				"weightProgrammed",
				currentSet.weight_programmed?.toString() || "0"
			);
			formData.append("repsProgrammed", currentSet.reps_programmed.toString());
			formAction(formData);
		},
		[formAction, currentSet]
	);

	const [showToast, setShowToast] = useState(false);
	const [isUpdate, setIsUpdate] = useState(false);

	useEffect(() => {
		console.log("NewSessionForm: state effect triggered", {
			state,
			currentSet,
		});
		if (state.success && isSubmittingRef.current) {
			console.log("NewSessionForm: Successful submission, updating state");
			setIsUpdate(state.isUpdate || false);
			setShowToast(state.isUpdate || false);
			startTransition(() => {
				const nextNonCompletedIndex = sortedSetData.findIndex(
					(set, index) => index > currentSetIndex && !set.success
				);
				if (nextNonCompletedIndex !== -1) {
					console.log(
						`NewSessionForm: Moving to next non-completed set: ${sortedSetData[nextNonCompletedIndex].set_id}`
					);
					setCurrentSetIndex(nextNonCompletedIndex);
				} else {
					console.log("NewSessionForm: All sets completed");
				}
				isSubmittingRef.current = false;
				router.refresh();
			});
		}
	}, [state, currentSetIndex, sortedSetData, router, currentSet]);

	// Add this new effect to reset showToast
	useEffect(() => {
		if (showToast) {
			const timer = setTimeout(() => {
				setShowToast(false);
			}, 500);
			return () => clearTimeout(timer);
		}
	}, [showToast]);

	useEffect(() => {
		renderCountRef.current += 1;
		console.log(`NewSessionForm render count: ${renderCountRef.current}`);
		console.log("Current state:", { currentSetIndex, currentSet, setData });
	});

	console.log("NewSessionForm: Rendering form", { currentSet });

	return (
		<>
			<Toast
				id="toast"
				message={state.message}
				show={showToast}
				duration={500}
				className={
					state.success ? "bg-green-500 text-white" : "bg-red-500 text-white"
				}
			/>
			<form
				action={handleSubmit}
				className="grid grid-cols-subgrid col-span-full gap-y-6 pb-28"
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
				<input type="hidden" name="sessionId" value={sessionData.session_id} />
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
						id="repsPerformed-DISPLAY-ONLY"
						name="repsPerformed-DISPLAY-ONLY"
						defaultValue={currentSet.reps_programmed || 0}
						className="grid grid-cols-subgrid col-span-full"
						outerClassName="border-t-0"
						isDisabled={true}
					/>
					<NumberInput
						label="Percentage"
						id="percentageProgrammed-DISPLAY-ONLY"
						name="percentageProgrammed-DISPLAY-ONLY"
						defaultValue={currentSet.weight_percentage_programmed || 0}
						className="grid grid-cols-subgrid col-span-full"
						outerClassName="border-t-0"
						isDisabled={true}
					/>
				</div>
				<div className="grid grid-cols-10 md:grid-cols-24 col-span-full p-1 fixed bottom-0 left-0 right-0 bg-gray-2 border-t border-t-gray-6">
					<Counter
						count={7}
						outerClassName="col-span-2"
						className="bg-gray-4 text-gray-10 aspect-square"
						id="rpePerformed"
						name="rpePerformed"
						increment={0.5}
						min={5}
						max={10}
					/>
					<Counter
						count={currentSet.reps_programmed}
						outerClassName="col-span-2 border-l-0"
						className="aspect-square"
						id="repsPerformed"
						name="repsPerformed"
					/>
					<div className="p-1 border border-gray-3 border-l-0 col-span-6 md:col-span-20">
						<Button
							label="Submit Set"
							loading="Submitting..."
							completed="Submitted"
							className="w-full h-full"
							disabled={isPending}
						/>
					</div>
				</div>
			</form>
		</>
	);
}
