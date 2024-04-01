import { useFormStatus } from "react-dom";

type SubmitButtonProps = {
	label: string;
	loading?: React.ReactNode;
	className?: string;
};

export default function SubmitButton({
	label,
	loading,
	className,
}: SubmitButtonProps) {
	const { pending } = useFormStatus();

	return (
		<button
			type="submit"
			disabled={pending}
			aria-disabled={pending}
			className={`h-8 border text-neutral-800 bg-neutral-100 border-neutral-700 ${className}`}
		>
			{pending ? loading ?? label : label}
		</button>
	);
}
