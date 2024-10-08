import Block, { BlockVariant } from "@/app/components/base/Block";
import { Set, LiftType } from "@/app/types";
import { getSetStatus, getLiftTypeCode } from "@/app/util";

interface SetBlockProps {
	set: Set;
	isSelected: boolean;
	onSelect: () => void;
	className?: string;
	outerClassName?: string;
	primaryLiftType: LiftType;
	secondaryLiftType: LiftType;
}

export default function SetBlock({
	set,
	isSelected,
	onSelect,
	className,
	outerClassName,
	primaryLiftType,
	secondaryLiftType,
}: SetBlockProps) {
	const { variant, textClass } = getSetStatus(set, isSelected);
	const liftType =
		set.lift_type === "PRIMARY" ? primaryLiftType : secondaryLiftType;
	const liftCode = getLiftTypeCode(liftType);

	// Determine the variant based on both success and selection states
	const blockVariant: BlockVariant =
		set.success && isSelected
			? "completedSelected"
			: set.success
			? "completed"
			: isSelected
			? "selected"
			: (variant as BlockVariant);

	return (
		<div className={`grid grid-cols-subgrid col-span-2 gap-y-2`}>
			<Block
				paddingSize="p-1"
				className="grid grid-rows-1 grid-cols-subgrid col-span-full"
				outerClassName={outerClassName}
				variant={blockVariant}
				isSelectable={true}
				onSelect={onSelect}
			>
				<p
					className={`flex items-center justify-center col-span-2 ${
						set.success && isSelected
							? "text-fg-success"
							: set.success
							? "text-fg-success"
							: isSelected
							? "text-fg-default"
							: "text-fg-muted"
					}`}
				>
					{liftCode}
					{set.set_number}
				</p>
			</Block>
			<div className="grid grid-rows-3 col-span-full px-1">
				{set.weight_performed && set.reps_performed ? (
					<p className="text-fg-success lowercase">
						{set.weight_performed}x{set.reps_performed}
					</p>
				) : (
					<p>
						{set.weight_programmed}x{set.reps_programmed}
					</p>
				)}
				<p>{set.weight_percentage_programmed}%</p>
			</div>
		</div>
	);
}
