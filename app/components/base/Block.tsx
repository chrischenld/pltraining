import React, { ReactNode } from "react";

export type BlockVariant = "default" | "selected" | "completed" | "empty";

interface BlockProps {
	children: ReactNode;
	variant?: BlockVariant;
	onSelect?: () => void;
	isSelectable?: boolean;
}

export default function Block({
	children,
	variant = "default",
	onSelect,
	isSelectable = false,
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
			className={`flex flex-col h-16 w-16 border align-items px-2 py-3 tracking-wider ${
				variants[variant]
			} ${isSelectable ? "cursor-pointer" : ""}`}
			onClick={handleClick}
		>
			{children}
		</div>
	);
}
