import Button from "@/app/components/base/Button";
import NewCycleForm from "@/app/components/sections/NewCycleForm";

export default async function Page() {
	return (
		<>
			<div className="flex flex-col gap-6">
				<h2>New cycle</h2>
				<NewCycleForm />
			</div>
			<footer className="fixed bottom-0 left-0 right-0 bg-bg-base border-t border-t-border-default">
				<Button label="Create cycle" form="new-cycle" className="w-full" />
			</footer>
		</>
	);
}
