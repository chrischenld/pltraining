"use client";

import { GeistSans } from "geist/font/sans";

interface Input {
	label: string;
	type: "text" | "number";
	id?: string;
	[key: string]: any;
}

export default function Input({
	type,
	label,
	id,
	...props
}: Input): JSX.Element {
	return (
		<div className="relative">
			<input
				type={type}
				className={`bg-bg-base border border-border-default rounded-[0.125rem] min-h-8 h-[7.25rem] px-4 py-4 text-5xl w-full pt-10 ${GeistSans.className} font-semibold tracking-tight [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
				name={id}
				id={id}
				{...props}
			/>
			<label
				htmlFor={id}
				className="absolute text-sm text-fg-muted left-4 top-4"
			>
				{label}
			</label>
		</div>
	);
}
