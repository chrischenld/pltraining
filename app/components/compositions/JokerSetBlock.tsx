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
				className="grid grid-rows-1 grid-cols-subgrid col-span-full"
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
				<p className="flex items-center justify-center col-span-2 text-gray-6">
					JKR
				</p>
			</Block>
			<div className="grid grid-cols-subgrid grid-rows-3 col-span-full px-1 gap-y-0.5">
				<div className="grid grid-cols-subgrid col-span-full">
					<p className="text-gray-6">--</p>
					<p className="text-gray-6 text-right">--</p>
				</div>
				<div className="grid grid-cols-subgrid col-span-full">
					<p className="text-gray-6">--</p>
					<p className="text-gray-6 text-right">--</p>
				</div>
				<div className="grid grid-cols-subgrid col-span-full">
					<p className="text-gray-6">--</p>
					<p className="text-gray-6 text-right">--</p>
				</div>
			</div>
		</div>
	);
}
