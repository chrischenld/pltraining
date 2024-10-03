import React, { ReactNode } from "react";

export type BlockVariant = "default" | "selected" | "completed" | "empty";

interface BlockProps {
	children: ReactNode;
	variant?: BlockVariant;
	onSelect?: () => void;
	isSelectable?: boolean;
	className?: string;
}

export default function Block({
	children,
	variant = "default",
	onSelect,
	isSelectable = false,
	className,
}: BlockProps) {
	const variants = {
		default: "border-border-default bg-bg-base",
		selected: "border-border-strong bg-bg-base",
		completed: "border-border-default bg-bg-default",
		empty: "text-fg-disabled border-border-default",
	};

	const handleClick = () => {
		if (isSelectable && onSelect) {
			onSelect();
		}
	};

	return (
		<div
			className={`grid border p-2 border-gray-3
			} ${isSelectable ? "cursor-pointer" : ""} ${className}`}
			onClick={handleClick}
		>
			<div
				className={`grid grid-rows-8 aspect-square rounded-[0.125rem] border align-items p-2 tracking-wider ${variants[variant]} ${className}`}
			>
				{children}
			</div>
		</div>
	);
}
