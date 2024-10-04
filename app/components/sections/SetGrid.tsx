import SetBlock from "../compositions/SetBlock";

export default function SetGrid() {
	return (
		<div className="grid grid-cols-5 col-span-full">
			<SetBlock />
			<SetBlock outerClassName="border-l-0" />
			<SetBlock outerClassName="border-l-0" />
			<SetBlock outerClassName="border-l-0" />
			<SetBlock outerClassName="border-l-0" />
		</div>
	);
}
