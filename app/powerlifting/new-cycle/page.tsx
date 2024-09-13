import NewCycleForm from "@/app/components/sections/NewCycleForm";

export default async function Page() {
	return (
		<div className="flex flex-col gap-6">
			<h2>New cycle</h2>
			<NewCycleForm />
		</div>
	);
}
