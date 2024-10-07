import React from "react";

export default function Loading() {
	return (
		<div className="grid grid-cols-subgrid col-span-full grid-rows-[auto_1fr] gap-y-4 animate-pulse">
			<div className="grid grid-cols-subgrid col-span-full">
				<h1 className="col-span-full bg-gray-3 h-8 w-48 rounded"></h1>
			</div>
			<div className="grid grid-cols-subgrid col-span-full gap-4">
				{/* Session Info Skeleton */}
				<div className="col-span-full bg-gray-2 h-12 rounded"></div>

				{/* Sets Skeleton */}
				{[...Array(5)].map((_, index) => (
					<div key={index} className="col-span-full grid grid-cols-6 gap-2">
						<div className="col-span-1 bg-gray-2 h-8 rounded"></div>
						<div className="col-span-1 bg-gray-2 h-8 rounded"></div>
						<div className="col-span-1 bg-gray-2 h-8 rounded"></div>
						<div className="col-span-1 bg-gray-2 h-8 rounded"></div>
						<div className="col-span-1 bg-gray-2 h-8 rounded"></div>
						<div className="col-span-1 bg-gray-2 h-8 rounded"></div>
					</div>
				))}

				{/* Button Skeleton */}
				<div className="col-span-full flex justify-end mt-4">
					<div className="bg-gray-3 h-10 w-32 rounded"></div>
				</div>
			</div>
		</div>
	);
}
