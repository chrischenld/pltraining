export default function Loading() {
	return (
		<div className="flex flex-col gap-6">
			<div className="flex flex-col gap-4 pb-24">
				{/* Skeleton for each NumberInput */}
				{[...Array(4)].map((_, index) => (
					<div key={index} className="relative animate-pulse">
						<div className="border border-border-default rounded-[0.125rem] h-[7.25rem] w-full"></div>
						<div className="absolute text-sm left-4 top-4 bg-bg-default h-4 w-20 rounded-[0.125rem]"></div>
					</div>
				))}
				{/* Skeleton for the button */}
				<div className="pt-5 pb-6 px-4 fixed bottom-0 left-0 right-0 bg-bg-base border-t border-t-border-default">
					<div className="border border-border-default h-16 w-full rounded-[0.125rem] animate-pulse"></div>
				</div>
			</div>
		</div>
	);
}
