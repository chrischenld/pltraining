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
import Counter from "@/app/components/base/Counter";
import Toast from "@/app/components/base/Toast";
import { SetSubmissionState } from "@/app/types";
import Block from "../base/Block";
import { GeistSans } from "geist/font/sans";

const initialState: SetSubmissionState = { message: "", success: false };

export default function NewSessionForm({
	sessionData,
	setData,
}: {
	sessionData: Session;
	setData: Set[];
}) {
	const [state, formAction] = useFormState<SetSubmissionState, FormData>(
		submitSet,
		initialState
	);
	const router = useRouter();
	const [isPending, startTransition] = useTransition();
	const isSubmittingRef = useRef(false);

	const sortedSetData = useMemo(() => {
		return [...setData].sort((a, b) => a.set_id - b.set_id);
	}, [setData]);

	const [currentSetIndex, setCurrentSetIndex] = useState(() => {
		const index = sortedSetData.findIndex((set) => !set.success);
		return index !== -1 ? index : sortedSetData.length - 1;
	});

	const currentSet = sortedSetData[currentSetIndex];

	const [weightPerformed, setWeightPerformed] = useState(
		currentSet.weight_programmed || 0
	);
	const [repsPerformed, setRepsPerformed] = useState(
		currentSet.reps_programmed || 0
	);
	const [rpePerformed, setRpePerformed] = useState(
		currentSet.rate_perceived_exertion || 0
	);

	// Update state when currentSet changes
	useEffect(() => {
		setWeightPerformed(
			currentSet.weight_programmed &&
				currentSet.weight_performed &&
				currentSet.weight_performed !== currentSet.weight_programmed
				? currentSet.weight_performed
				: currentSet.weight_programmed || 0
		);
		setRepsPerformed(
			currentSet.reps_programmed &&
				currentSet.reps_performed &&
				currentSet.reps_performed !== currentSet.reps_programmed
				? currentSet.reps_performed
				: currentSet.reps_programmed || 0
		);
		setRpePerformed(currentSet.rate_perceived_exertion || 0);
	}, [currentSet]);

	const handleSubmit = useCallback(
		(formData: FormData) => {
			if (isSubmittingRef.current) {
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

	const toastDuration = 1000;

	useEffect(() => {
		if (state.success && isSubmittingRef.current) {
			setIsUpdate(state.isUpdate || false);
			setShowToast(state.isUpdate || false);
			startTransition(() => {
				const nextNonCompletedIndex = sortedSetData.findIndex(
					(set, index) => index > currentSetIndex && !set.success
				);
				if (nextNonCompletedIndex !== -1) {
					setCurrentSetIndex(nextNonCompletedIndex);
				}
				isSubmittingRef.current = false;
				router.refresh();
			});
		}
	}, [state, currentSetIndex, sortedSetData, router]);

	useEffect(() => {
		if (showToast) {
			const timer = setTimeout(() => {
				setShowToast(false);
			}, toastDuration);
			return () => clearTimeout(timer);
		}
	}, [showToast]);

	const ProgrammedFields = ({ className }: { className?: string }) => (
		<div
			className={`grid grid-cols-subgrid grid-rows-3 col-span-4 ${className}`}
		>
			<Block
				className="relative aspect-auto"
				outerClassName="col-span-full border-l-0 px-1 py-1 h-full"
				isSquare={false}
			>
				<p
					className={`px-3 pb-4 text-5xl pt-10 ${GeistSans.className} font-semibold tracking-tight`}
				>
					{currentSet.weight_programmed}
				</p>
				<p className="absolute text-sm text-fg-muted left-3 top-4">WT PRG</p>
			</Block>
			<Block
				className="relative aspect-auto"
				outerClassName="aspect-auto col-span-full border-l-0 border-t-0 px-1 py-1 h-full"
				isSquare={false}
			>
				<p
					className={`px-3 pb-4 text-5xl pt-10 ${GeistSans.className} font-semibold tracking-tight`}
				>
					{currentSet.reps_programmed}
				</p>
				<p className="absolute text-sm text-fg-muted left-3 top-4">RP PRG</p>
			</Block>
			<Block
				className="relative aspect-auto"
				outerClassName="aspect-auto col-span-full border-l-0 border-t-0 px-1 py-1 h-full"
				isSquare={false}
			>
				<p
					className={`px-3 pb-4 text-5xl pt-10 ${GeistSans.className} font-semibold tracking-tight`}
				>
					{currentSet.weight_percentage_programmed}
				</p>
				<p className="absolute text-sm text-fg-muted left-3 top-4">PT PRG</p>
			</Block>
		</div>
	);

	const ActionBar = () => (
		<div className="grid grid-cols-10 md:grid-cols-24 col-span-full p-1 fixed bottom-0 left-0 right-0 bg-gray-2 border-t border-t-gray-6">
			<Counter
				count={rpePerformed}
				outerClassName="col-span-2"
				className="aspect-square"
				id="rpePerformed"
				name="rpePerformed"
				onChange={(newValue) => setRpePerformed(newValue)}
				increment={0.5}
				min={5}
				max={10}
			/>
			<Counter
				count={repsPerformed}
				outerClassName="col-span-2 border-l-0"
				className="aspect-square"
				id="repsPerformed"
				name="repsPerformed"
				onChange={(newValue) => setRepsPerformed(newValue)}
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
	);

	return (
		<>
			<Toast
				id="toast"
				message={state.message}
				show={showToast}
				duration={toastDuration}
				className={state.success ? "text-fg-success" : "text-fg-danger"}
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
				<div
					className={`grid grid-cols-subgrid grid-rows-3 ${
						currentSet.weight_performed && currentSet.reps_performed
							? "col-span-4"
							: "col-span-full"
					}`}
				>
					<NumberInput
						label={`${
							currentSet.weight_programmed &&
							weightPerformed > currentSet.weight_programmed
								? "Weight (OVR)"
								: currentSet.weight_programmed &&
								  weightPerformed < currentSet.weight_programmed
								? "Weight (FAIL)"
								: "Weight"
						}`}
						id="weightPerformed"
						name="weightPerformed"
						value={weightPerformed}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setWeightPerformed(Number(e.target.value))
						}
						min={0}
						className={`grid grid-cols-subgrid col-span-full`}
						outerClassName="px-1 py-1 row-span-1"
					/>
					<NumberInput
						label={`${
							currentSet.reps_programmed &&
							repsPerformed > currentSet.reps_programmed
								? "Reps (OVR)"
								: currentSet.reps_programmed &&
								  repsPerformed < currentSet.reps_programmed
								? "Reps (FAIL)"
								: "Reps"
						}`}
						id="repsPerformed-DISPLAY-ONLY"
						name="repsPerformed-DISPLAY-ONLY"
						value={repsPerformed}
						className="grid grid-cols-subgrid col-span-full"
						outerClassName="border-t-0 px-1 py-1"
						isDisabled={true}
					/>
					<NumberInput
						label="RPE"
						id="rpe-DISPLAY-ONLY"
						name="rpe-DISPLAY-ONLY"
						value={rpePerformed}
						className="grid grid-cols-subgrid col-span-full"
						outerClassName="border-t-0 px-1 py-1"
						isDisabled={true}
					/>
				</div>
				<ProgrammedFields
					className={`${
						currentSet.weight_performed && currentSet.reps_performed
							? "block"
							: "hidden"
					}`}
				/>
				<ActionBar />
			</form>
		</>
	);
}
