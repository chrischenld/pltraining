export default function Loading() {
	return (
		<div className="flex flex-col px-4 py-8 gap-8">
			<h2>Powerlifting</h2>
			<div className="animate-pulse">
				<div className="h-4 border border-border-default rounded-[0.125rem] w-1/4 mb-8"></div>
				<div className="flex">
					<div className="grid grid-cols-4 gap-2">
						{[...Array(16)].map((_, i) => (
							<div
								key={i}
								className="w-16 h-16 border border-border-default rounded-[0.125rem]"
							></div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
