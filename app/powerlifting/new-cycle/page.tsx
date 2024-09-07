import NumberInput from "@/app/components/NumberInput";
import Button from "@/app/components/Button";

export default async function Page() {
	return (
		<>
			<div className="flex flex-col gap-6 pb-24">
				<h2>New cycle</h2>
				<form id="new-cycle" className="flex flex-col gap-4">
					<NumberInput label="Squat" defaultValue={315} min={0} />
					<NumberInput label="Bench" min={0} />
					<NumberInput label="Deadlift" min={0} />
					<NumberInput label="Overhead Press" min={0} />
				</form>
			</div>
			<footer className="fixed bottom-0 left-0 right-0 bg-bg-base border-y border-y-border-default">
				<Button label="Submit" form="new-cycle" className="w-full" />
			</footer>
		</>
	);
}
