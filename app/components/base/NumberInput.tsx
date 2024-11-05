"use client";

import Input from "./Input";
import { ChangeEvent } from "react";

interface NumberInputProps {
	label: string;
	id?: string;
	name?: string;
	value?: number;
	onChange?: (value: number) => void;
	min?: number;
	max?: number;
	className?: string;
	outerClassName?: string;
	required?: boolean;
	isInvalid?: boolean;
	errorMessage?: string;
	isDisabled?: boolean;
	[key: string]: any;
}

export default function NumberInput({
	label,
	id,
	name,
	value,
	onChange,
	min,
	max,
	className,
	outerClassName,
	required,
	isInvalid,
	errorMessage,
	isDisabled,
	...props
}: NumberInputProps): JSX.Element {
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value === "" ? 0 : parseFloat(e.target.value);
		onChange?.(newValue);
	};

	return (
		<Input
			type="number"
			label={label}
			id={id}
			name={name}
			value={value}
			onChange={handleChange}
			min={min}
			max={max}
			pattern="[0-9]*"
			className={className}
			outerClassName={outerClassName}
			required={required}
			aria-required={required}
			isInvalid={isInvalid}
			aria-invalid={isInvalid}
			errorMessage={errorMessage}
			isDisabled={isDisabled}
			{...props}
		/>
	);
}
