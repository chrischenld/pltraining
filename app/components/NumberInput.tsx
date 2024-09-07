"use client";

import Input from "./Input";

interface NumberInputProps {
	label: string;
	initialValue?: number;
	defaultValue?: number;
}

export default function NumberInput({
	label,
	initialValue,
	defaultValue,
	...props
}: NumberInputProps): JSX.Element {
	return (
		<Input type="number" label={label} defaultValue={defaultValue} {...props} />
	);
}
