"use client";

import { useState, useEffect } from "react";

interface CounterProps {
	count: number;
	outerClassName?: string;
	className?: string;
	id?: string;
	name?: string;
	increment?: number;
	min?: number;
	max?: number;
	onChange?: (newValue: number) => void;
}

export default function Counter({
	count,
	outerClassName,
	className,
	id,
	name,
	increment = 1,
	min = 0,
	max = 9,
	onChange,
}: CounterProps) {
	const [value, setValue] = useState(count);

	useEffect(() => {
		setValue(count);
	}, [count]);

	const handleIncrement = () => {
		const newValue = value + increment;
		const finalValue = newValue > max ? min : newValue;
		setValue(finalValue);
		if (onChange) {
			onChange(finalValue);
		}
	};

	return (
		<div className={`${outerClassName} p-1 border border-gray-3 flex`}>
			<button
				type="button"
				onClick={handleIncrement}
				className={`w-full border border-gray-6 text-center ${className}`}
				aria-label={`Increment counter (current value: ${value})`}
			>
				<output
					id={id}
					name={name}
					htmlFor={id}
					className="text-sm w-full block tracking-[-0.1em]"
				>
					{value}
				</output>
			</button>
			<input type="hidden" name={name} value={value} />
		</div>
	);
}
