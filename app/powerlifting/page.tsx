import Link from "next/link";
import { sql } from "@vercel/postgres";

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
				<p>Start a new cycle</p>
				<Link href="/powerlifting/new-cycle">New cycle→</Link>
			</div>
		);
	}

	function NextSessionPrompt() {
		return (
			<div>
				<p>Next session</p>
				<Link href="/powerlifting/new-session">Create session→</Link>
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
