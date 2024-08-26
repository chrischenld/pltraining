import Link from "next/link";
import { sql } from "@vercel/postgres";
import Block from "../components/Block";

export default async function Page() {
	const cycleData = await sql`
		SELECT *
		FROM CyclesOneRow
		ORDER BY CYCLE_ID DESC
		LIMIT 1;
	  `;

	const lastCycle = cycleData.rows[0];
	console.log(lastCycle);

	function NewCyclePrompt() {
		return (
			<div>
				<Link href="/powerlifting/new-cycle">
					<p>Start a new cycle</p>
					New cycle→
				</Link>
			</div>
		);
	}

	function NextSessionPrompt() {
		return (
			<div className="flex flex-col gap-8">
				<Link href="/powerlifting/new-session">
					<p>Next session</p>
					Create session→
				</Link>
				<div className="flex gap-2">
					<Block variant="completed">
						<p className="text-fg-success">W1D1</p>
						<p>SQ/DL</p>
						<p>08.11</p>
					</Block>
					<Block variant="selected">
						<p>W1D2</p>
						<p>BN/OP</p>
						<p>08.12</p>
					</Block>
					<Block>
						<p>W1D3</p>
						<p>DL/SQ</p>
						<p>--</p>
					</Block>
				</div>
			</div>
		);
	}

	return (
		<main className="flex flex-col px-4 py-8 gap-8">
			<h2>Powerlifting</h2>
			{!lastCycle || lastCycle.completed ? (
				<NewCyclePrompt />
			) : (
				<NextSessionPrompt />
			)}
		</main>
	);
}
