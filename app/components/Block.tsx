import React, { ReactNode } from "react";

interface BlockProps {
	children: ReactNode;
	variant?: "default" | "selected" | "completed";
}

export default function Block({ children, variant = "default" }: BlockProps) {
	const variants = {
		default: "border-border-default bg-bg-base",
		selected: "border-border-strong bg-bg-base",
		completed: "border-border-default bg-bg-default",
	};

	return (
		<div
			className={`flex flex-col h-16 w-16 border align-items px-2 py-3 tracking-wider ${variants[variant]}`}
		>
			{children}
		</div>
	);
}
