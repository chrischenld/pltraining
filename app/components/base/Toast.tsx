import React, { useEffect, useRef } from "react";

interface ToastProps {
	id: string;
	message: string;
	duration?: number;
	className?: string;
	show: boolean;
}

export default function Toast({
	id,
	message,
	duration = 3000,
	className,
	show,
}: ToastProps) {
	const toastRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const toastElement = toastRef.current;
		if (toastElement && show) {
			toastElement.showPopover();

			const timer = setTimeout(() => {
				toastElement.hidePopover();
			}, duration);

			return () => clearTimeout(timer);
		}
	}, [duration, show]);

	return (
		<div
			ref={toastRef}
			id={id}
			popover="auto"
			className={`fixed top-3 right-3 p-4 rounded shadow-lg bg-gray-3 border border-gray-6 text-sm ${className}`}
		>
			{message}
		</div>
	);
}
