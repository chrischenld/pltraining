"use client";

import { useFormStatus } from "react-dom";

interface ButtonProps {
	label: string;
	loading?: React.ReactNode;
	completed?: React.ReactNode;
	className?: string;
	form?: string;
	disabled?: boolean;
	isCompleted?: boolean;
}

export default function Button({
	label,
	loading,
	completed,
	form,
	className,
	disabled: externalDisabled,
	isCompleted = false,
}: ButtonProps) {
	const { pending } = useFormStatus();
	const isDisabled = externalDisabled || pending || isCompleted;

	return (
		<button
			type="submit"
			disabled={isDisabled}
			aria-disabled={isDisabled}
			form={form}
			className={`
				h-16 px-4 rounded-[0.125rem] text-sm uppercase border
				${className}
				${
					isCompleted
						? "bg-bg-success-strong border-border-default text-fg-default"
						: isDisabled
						? "bg-bg-default border-border-default text-fg-muted cursor-not-allowed"
						: "bg-bg-strong border-border-semibold text-fg-onStrong"
				}
			`}
		>
			{isCompleted ? completed ?? label : pending ? loading ?? label : label}
		</button>
	);
}
