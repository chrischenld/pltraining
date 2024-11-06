import React from "react";

export default function Loading() {
	return (
		<div className="grid grid-cols-subgrid col-span-full grid-rows-[auto_1fr] gap-y-4 pb-16">
			{/* Header */}
			<div className="grid grid-cols-subgrid col-span-full">
				<div className="col-span-full bg-gray-2 border border-gray-4 h-8 w-48 rounded-[0.125rem]"></div>
			</div>

			{/* Set Grid */}
			<div className="grid grid-cols-10 col-span-full gap-y-6 pb-28">
				<div className="grid grid-cols-subgrid col-span-full gap-y-16 pb-16">
					{[...Array(10)].map((_, index) => (
						<div key={index} className={`border border-gray-3 p-1 col-span-2`}>
							<div className="bg-gray-2 border-gray-4 h-full w-full rounded-[0.125rem] aspect-square"></div>
						</div>
					))}
				</div>

				{/* Input Fields Section */}
				<div className="grid grid-cols-subgrid col-span-full grid-rows-3">
					{[...Array(3)].map((_, index) => (
						<div
							key={index}
							className="col-span-full border border-gray-3 rounded-[0.125rem] p-1"
						>
							<div className="bg-gray-2 border border-gray-4 h-[7.5rem] w-full rounded-[0.125rem]"></div>
						</div>
					))}
				</div>

				{/* Action Bar */}
				<div className="grid grid-cols-10 md:grid-cols-24 col-span-full p-1 fixed bottom-0 left-0 right-0 bg-gray-2 border-t border-t-gray-6">
					{/* Counter Buttons */}
					{[...Array(3)].map((_, index) => (
						<div
							key={index}
							className={`col-span-2 border border-gray-3 p-1 ${
								index > 0 ? "border-l-0" : ""
							}`}
						>
							<div className="bg-gray-2 border border-gray-4 aspect-square w-full rounded-[0.125rem]"></div>
						</div>
					))}

					{/* Submit Button */}
					<div className="p-1 border border-gray-3 border-l-0 col-span-4 md:col-span-18 p-1">
						<div className="bg-gray-2 border border-gray-4 h-full w-full rounded-[0.125rem]"></div>
					</div>
				</div>
			</div>
		</div>
	);
}
