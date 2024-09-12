"use client";

import Input from "./Input";

interface NumberInputProps {
	label: string;
	id?: string;
	defaultValue?: number;
	min?: number;
	max?: number;
}

export default function NumberInput({
	label,
	id,
	defaultValue,
	min,
	max,
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
			{...props}
		/>
	);
}
