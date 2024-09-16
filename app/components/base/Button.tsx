"use client";

import { useFormStatus } from "react-dom";

interface ButtonProps {
	label: string;
	loading?: React.ReactNode;
	className?: string;
	form?: string;
	disabled?: boolean;
}

export default function Button({
	label,
	loading,
	form,
	className,
	disabled: externalDisabled,
}: ButtonProps) {
	const { pending } = useFormStatus();
	const isDisabled = externalDisabled || pending;

	return (
		<button
			type="submit"
			disabled={isDisabled}
			aria-disabled={isDisabled}
			form={form}
			className={`h-16 px-4 bg-bg-strong border border-border-semibold rounded-[0.125rem] text-fg-onStrong text-sm uppercase ${className} ${
				isDisabled ? "opacity-50 cursor-not-allowed" : ""
			}`}
		>
			{pending ? loading ?? label : label}
		</button>
	);
}
