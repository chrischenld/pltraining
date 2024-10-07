"use client";

import SetBlock from "../compositions/SetBlock";
import JokerSetBlock from "../compositions/JokerSetBlock";
import { Set, LiftType } from "@/app/types";

interface SetGridProps {
	setData: Set[];
	onSetSelect: (setIndex: number) => void;
	currentSetIndex: number;
	primaryLiftType: LiftType;
	secondaryLiftType: LiftType;
	jokerSets: number; // Number of joker sets to display
}

export default function SetGrid({
	setData,
	onSetSelect,
	currentSetIndex,
	primaryLiftType,
	secondaryLiftType,
	jokerSets,
}: SetGridProps) {
	const sortedSetData = [...setData].sort((a, b) => a.set_id - b.set_id);
	const primarySets = sortedSetData.filter(
		(set) => set.lift_type === "PRIMARY"
	);
	const secondarySets = sortedSetData.filter(
		(set) => set.lift_type === "SECONDARY"
	);

	const handleSetSelect = (index: number) => {
		// console.log(`SetGrid: Selected set_id ${sortedSetData[index].set_id}`);
		onSetSelect(index);
	};

	return (
		<div className="grid grid-cols-10 col-span-full gap-y-3">
			{primarySets.map((set, index) => (
				<SetBlock
					key={set.set_id}
					set={set}
					isSelected={sortedSetData.indexOf(set) === currentSetIndex}
					onSelect={() => handleSetSelect(sortedSetData.indexOf(set))}
					outerClassName={index < 2 ? "border-r-0" : ""}
					primaryLiftType={primaryLiftType}
					secondaryLiftType={secondaryLiftType}
				/>
			))}
			{[...Array(jokerSets)].map((_, index) => (
				<JokerSetBlock
					key={`joker-${index}`}
					set={{} as Set} // Pass an empty object as Set, modify as needed
					isSelected={false}
					onSelect={() => {}} // Implement joker set selection logic if needed
					outerClassName={index === 0 ? "border-r-0" : ""}
					primaryLiftType={primaryLiftType}
					secondaryLiftType={secondaryLiftType}
				/>
			))}
			{secondarySets.map((set, index) => (
				<SetBlock
					key={set.set_id}
					set={set}
					isSelected={sortedSetData.indexOf(set) === currentSetIndex}
					onSelect={() => onSetSelect(sortedSetData.indexOf(set))}
					outerClassName={
						index < 4 ? "border-r-0" : index === 4 ? "pb-[5px]" : ""
					}
					primaryLiftType={primaryLiftType}
					secondaryLiftType={secondaryLiftType}
				/>
			))}
		</div>
	);
}
