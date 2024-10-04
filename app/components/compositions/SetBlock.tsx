import Block from "@/app/components/base/Block";

interface SetBlockProps {
	className?: string;
	outerClassName?: string;
}

export default function SetBlock({ className, outerClassName }: SetBlockProps) {
	return (
		<div className={`grid col-span-1 gap-2`}>
			<Block
				paddingSize="p-1"
				className="w-full grid place-items-center"
				outerClassName={outerClassName}
			>
				<p>3</p>
			</Block>
			<div className="grid px-1">
				<p>SQ1</p>
				<p>265LB</p>
				<p>3R</p>
				<p>70%</p>
			</div>
		</div>
	);
}
