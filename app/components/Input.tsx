"use client";

import { GeistSans } from "geist/font/sans";

interface Input {
	label: string;
	type: "text" | "number";
	[key: string]: any;
}

export default function Input({ type, label, ...props }: Input): JSX.Element {
	return (
		<div className="relative">
			<input
				type={type}
				className={`bg-bg-default min-h-8 px-3 py-4 text-5xl w-full pt-10 ${GeistSans.className} font-semibold tracking-tight [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
				{...props}
			/>
			<label className="absolute text-sm text-fg-muted left-3 top-4">
				{label}
			</label>
		</div>
	);
}
