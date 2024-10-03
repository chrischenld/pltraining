"use client";

import Input from "./Input";

interface NumberInputProps {
	label: string;
	id?: string;
	defaultValue?: number;
	min?: number;
	max?: number;
	className?: string;
	required?: boolean;
	isInvalid?: boolean;
	errorMessage?: string;
	[key: string]: any;
}

export default function NumberInput({
	label,
	id,
	defaultValue,
	min,
	max,
	className,
	required,
	isInvalid,
	errorMessage,
	...props
}: NumberInputProps): JSX.Element {
	return (
		<Input
			type="number"
			label={label}
			id={id}
			defaultValue={defaultValue}
			min={min}
			max={max}
			pattern="[0-9]*"
			className={className}
			required={required}
			aria-required={required}
			isInvalid={isInvalid}
			aria-invalid={isInvalid}
			errorMessage={errorMessage}
			{...props}
		/>
	);
}
