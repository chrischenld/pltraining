export default function Loading() {
	return (
		<div className="grid grid-cols-subgrid col-span-full grid-rows-[auto_1fr] gap-y-4">
			{/* Header */}
			<div className="grid grid-cols-subgrid col-span-full gap-2">
				<div className="col-span-full bg-gray-2 border border-gray-4 h-8 w-36 rounded-[0.125rem]"></div>
				<div className="col-span-full bg-gray-2 border border-gray-4 h-4 w-24 rounded-[0.125rem]"></div>
			</div>

			{/* Session Grid */}
			<div className="grid grid-cols-subgrid col-span-full">
				<div className="grid grid-cols-subgrid auto-rows-max col-span-full pb-24 md:pb-0">
					{/* Mimicking SessionGrid with 16 blocks */}
					{[...Array(16)].map((_, index) => {
						let borderClass = "border border-gray-3";

						if (index % 2 !== 0) {
							borderClass += " border-l-0";
						}

						if (index >= 2) {
							borderClass += " border-t-0";
						}

						if (index >= 2 && index <= 5) {
							borderClass += " md:border-t";
						}

						if (index === 6 || index === 12) {
							borderClass += " md:border-l";
						}

						if (index >= 6) {
							borderClass += " md:border-t-0";
						}

						if ([2, 4, 8, 10, 14].includes(index)) {
							borderClass += " md:border-l-0";
						}

						return (
							<div key={index} className={`${borderClass} p-1 col-span-4`}>
								{/* Session Block Content */}
								<div className="grid grid-rows-[1fr_auto] h-full gap-2 p-1">
									<div className="bg-gray-2 border border-gray-4 aspect-square w-full rounded-[0.125rem]"></div>
								</div>
							</div>
						);
					})}
				</div>

				{/* Fixed Bottom Button */}
				<div className="p-2 fixed bottom-0 left-0 right-0 bg-gray-2 border-t border-t-gray-6">
					<div className="bg-gray-2 border border-gray-4 h-10 w-full rounded-[0.125rem]"></div>
				</div>
			</div>
		</div>
	);
}
