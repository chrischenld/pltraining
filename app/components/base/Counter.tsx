"use client";

import { useState, useEffect } from "react";

export default function Counter({
	count,
	outerClassName,
	className,
	id,
	name,
	increment = 1,
	min = 0,
	max = 9,
}: {
	count: number;
	outerClassName?: string;
	className?: string;
	id?: string;
	name?: string;
	increment?: number;
	min?: number;
	max?: number;
}) {
	const [value, setValue] = useState(count);

	useEffect(() => {
		setValue(count);
	}, [count]);

	const handleIncrement = () => {
		const newValue = value + increment;
		setValue(newValue > max ? min : newValue);
	};

	return (
		<div className={`${outerClassName} p-1 border border-gray-3`}>
			<input
				className={`w-full h-full rounded-[0.125rem] bg-gray-3 text-fg-default text-center border border-gray-6 text-sm tracking-[-0.1em] ${className}`}
				onClick={handleIncrement}
				type="number"
				id={id}
				name={name}
				value={value}
				min={min}
				max={max}
				readOnly
			/>
		</div>
	);
}
