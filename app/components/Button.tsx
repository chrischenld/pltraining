"use client";

import { useFormStatus } from "react-dom";

interface ButtonProps {
	label: string;
	loading?: React.ReactNode;
	className?: string;
}

export default function Button({ label, loading, className }: ButtonProps) {
	const { pending } = useFormStatus();

	return (
		<button
			type="submit"
			disabled={pending}
			aria-disabled={pending}
			className={`h-8 px-4 border text-neutral-100 bg-neutral-900 border-neutral-600 disabled:border-0 ${className}`}
		>
			{pending ? loading ?? label : label}
		</button>
	);
}
