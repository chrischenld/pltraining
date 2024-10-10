import React, { ReactNode } from "react";

export type BlockVariant =
	| "default"
	| "selected"
	| "completed"
	| "completedSelected"
	| "empty";

interface BlockProps {
	children: ReactNode;
	variant?: BlockVariant;
	onSelect?: () => void;
	isSelectable?: boolean;
	className?: string;
	outerClassName?: string;
	paddingSize?: string;
}

export default function Block({
	children,
	variant = "default",
	onSelect,
	isSelectable = false,
	className,
	outerClassName,
	paddingSize = "p-2",
}: BlockProps) {
	const variants = {
		default: "border-gray-6 bg-gray-2",
		selected: "border-border-strong",
		completed: "border-gray-6 bg-gray-3",
		completedSelected: "border-border-strong bg-gray-3", // New variant
		empty: "text-fg-disabled border-border-default",
	};

	const handleClick = () => {
		if (isSelectable && onSelect) {
			onSelect();
		}
	};

	return (
		<div
			className={`grid border ${paddingSize} border-gray-3
			${isSelectable ? "cursor-pointer" : ""} ${outerClassName}`}
			onClick={handleClick}
		>
			<div
				className={`grid aspect-square rounded-[0.125rem] border align-items tracking-wider ${variants[variant]} ${className}`}
			>
				{children}
			</div>
		</div>
	);
}
