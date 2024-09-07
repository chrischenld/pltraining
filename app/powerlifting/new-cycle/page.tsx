import NumberInput from "@/app/components/NumberInput";
import Button from "@/app/components/Button";

export default async function Page() {
	return (
		<div className="flex flex-col gap-4">
			<h2>New cycle</h2>
			<NumberInput label="Squat" defaultValue={315} min={0} />
			<NumberInput label="Bench" min={0} />
			<NumberInput label="Deadlift" min={0} />
			<NumberInput label="Overhead Press" min={0} />
			<Button label="Poopoo" />
		</div>
	);
}
