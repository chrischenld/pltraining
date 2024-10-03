export default function Loading() {
	return (
		<>
			<h2>Powerlifting</h2>
			<div className="GridLayout">
				<div className="col-span-full grid grid-cols-subgrid grid-rows-[auto_1fr] gap-y-4">
					<div className="col-span-full animate-pulse">
						<div className="h-4 border-border-default rounded-[0.125rem] w-1/4 mb-8"></div>
					</div>
					<div className="grid col-span-full grid-cols-subgrid">
						<div className="grid grid-cols-4 gap-2">
							{[...Array(16)].map((_, i) => (
								<div
									key={i}
									className="w-16 h-16 border-border-default rounded-[0.125rem] animate-pulse"
								></div>
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
