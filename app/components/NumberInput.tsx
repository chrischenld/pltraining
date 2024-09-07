"use client";

import Input from "./Input";

interface NumberInputProps {
	label: string;
	initialValue?: number;
	defaultValue?: number;
	min?: number;
	max?: number;
}

export default function NumberInput({
	label,
	initialValue,
	defaultValue,
	min,
	max,
	...props
}: NumberInputProps): JSX.Element {
	return (
		<Input
			type="number"
			label={label}
			defaultValue={defaultValue}
			min={min}
			max={max}
			pattern="[0-9]*"
			{...props}
		/>
	);
}
