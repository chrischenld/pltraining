import Block, { BlockVariant } from "@/app/components/base/Block";
import { Set, LiftType } from "@/app/types";
import { getSetStatus, getLiftTypeCode } from "@/app/util";

interface JokerSetBlockProps {
	set: Set;
	isSelected: boolean;
	onSelect: () => void;
	className?: string;
	outerClassName?: string;
	primaryLiftType: LiftType;
	secondaryLiftType: LiftType;
}

export default function JokerSetBlock({
	set,
	isSelected,
	onSelect,
	className,
	outerClassName,
	primaryLiftType,
	secondaryLiftType,
}: JokerSetBlockProps) {
	const { variant, textClass } = getSetStatus(set, isSelected);
	const liftType =
		set.lift_type === "PRIMARY" ? primaryLiftType : secondaryLiftType;
	const liftCode = getLiftTypeCode(liftType);

	return (
		<div className={`grid grid-cols-subgrid col-span-2 gap-y-2`}>
			<Block
				paddingSize="p-1"
				className="grid grid-cols-subgrid col-span-full"
				outerClassName={outerClassName}
				variant={
					set.success
						? "completed"
						: isSelected
						? "selected"
						: (variant as BlockVariant)
				}
				isSelectable={true}
				onSelect={onSelect}
			>
				<p className="flex items-center justify-center col-span-2">-</p>
			</Block>
			<div className="grid grid-rows-4 col-span-full px-1">
				<p>JKR</p>
				<p>--</p>
				<p>--</p>
				<p>--</p>
			</div>
		</div>
	);
}
