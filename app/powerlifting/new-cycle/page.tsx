import NumberInput from "@/app/components/NumberInput";

export default async function Page() {
	return (
		<div className="flex flex-col gap-4">
			<p>New cycle</p>
			<NumberInput label="Squat" />
			<NumberInput label="Bench" />
			<NumberInput label="Deadlift" />
			<NumberInput label="Overhead Press" />
		</div>
	);
}
