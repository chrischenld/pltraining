"use client";

import { useState } from "react";
import NumberFlow from "@number-flow/react";

interface CounterProps {
	count: number;
	outerClassName?: string;
	className?: string;
	id?: string;
	name?: string;
	increment?: number;
	min?: number;
	max?: number;
	showDecimal?: boolean;
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
	showDecimal = false,
	onChange,
}: CounterProps) {
	const [state, setState] = useState(count);

	const handleIncrement = () => {
		const newValue = state + increment;
		let finalValue;
		if (newValue > max) {
			finalValue = min;
		} else if (newValue < min) {
			finalValue = max;
		} else {
			finalValue = newValue;
		}

		setState(finalValue);
	};

	const handleBlur = () => {
		onChange?.(state);
	};

	return (
		<div className={`${outerClassName} p-1 border border-gray-3 flex`}>
			<button
				type="button"
				onClick={handleIncrement}
				onBlur={handleBlur}
				className={`w-full border border-gray-6 text-center ${className}`}
				aria-label={`Increment counter (current value: ${state})`}
			>
				<NumberFlow
					value={state}
					trend={false}
					animated={true}
					willChange
					className="tracking-tighter"
					format={{
						minimumFractionDigits: showDecimal ? 1 : 0,
						maximumFractionDigits: showDecimal ? 1 : 0,
					}}
				/>
			</button>
			<input type="hidden" name={name} value={state} />
		</div>
	);
}
