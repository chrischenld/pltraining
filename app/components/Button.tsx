"use client";

import { useFormStatus } from "react-dom";

interface ButtonProps {
	label: string;
	loading?: React.ReactNode;
	className?: string;
	form?: string;
}

export default function Button({
	label,
	loading,
	form,
	className,
}: ButtonProps) {
	const { pending } = useFormStatus();

	return (
		<button
			type="submit"
			disabled={pending}
			aria-disabled={pending}
			form={form}
			className={`h-16 px-4 bg-bg-strong border border-border-semibold rounded-[0.125rem] text-fg-onStrong text-sm uppercase ${className}`}
		>
			{pending ? loading ?? label : label}
		</button>
	);
}
