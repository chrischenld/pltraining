"use client";

import { GeistSans } from "geist/font/sans";

interface InputProps {
	label: string;
	type: "text" | "number";
	id?: string;
	className?: string;
	outerClassName?: string;
	required?: boolean;
	isInvalid?: boolean;
	errorMessage?: string;
	[key: string]: any;
}

export default function Input({
	type,
	label,
	id,
	className,
	outerClassName,
	required,
	isInvalid,
	errorMessage,
	...props
}: InputProps): JSX.Element {
	const errorId = `${id}-error`;

	return (
		<div
			className={`grid grid-cols-subgrid col-span-full p-2 border border-gray-3 ${outerClassName}`}
		>
			<div className={`relative ${className}`}>
				<input
					type={type}
					className={`bg-gray-3 border border-gray-6 rounded-[0.125rem] h-[7.25rem] px-3 pb-4 text-5xl pt-10 ${GeistSans.className} font-semibold tracking-tight [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${className}`}
					name={id}
					id={id}
					required={required}
					aria-required={required}
					aria-invalid={isInvalid}
					aria-describedby={errorMessage ? errorId : undefined}
					{...props}
				/>
				<label
					htmlFor={id}
					className="absolute text-sm text-fg-muted left-3 top-4"
				>
					{label}
				</label>
				{errorMessage && (
					<div id={errorId} className="text-fg-danger text-sm mt-1">
						{errorMessage}
					</div>
				)}
			</div>
		</div>
	);
}
