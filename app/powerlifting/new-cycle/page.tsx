import NewCycleForm from "@/app/components/sections/NewCycleForm";

export default async function Page() {
	return (
		<div className="grid grid-cols-subgrid col-span-full grid-rows-[auto_1fr] gap-y-4">
			<h1 className="col-span-full">New Cycle</h1>
			<NewCycleForm />
		</div>
	);
}
