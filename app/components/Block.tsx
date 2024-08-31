import React, { ReactNode } from "react";

export type BlockVariant = "default" | "selected" | "completed" | "empty";

interface BlockProps {
	children: ReactNode;
	variant?: BlockVariant;
}

export default function Block({ children, variant = "default" }: BlockProps) {
	const variants = {
		default: "border-border-default bg-bg-base",
		selected: "border-border-strong bg-bg-base",
		completed: "border-border-default bg-bg-default",
		empty: "text-fg-muted border-border-default bg-bg-base",
	};

	return (
		<div
			className={`flex flex-col h-16 w-16 border align-items px-2 py-3 tracking-wider ${variants[variant]}`}
		>
			{children}
		</div>
	);
}
