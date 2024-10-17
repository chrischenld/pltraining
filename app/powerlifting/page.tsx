import Link from "next/link";
import { sql } from "@vercel/postgres";
import SessionGrid from "../components/sections/SessionGrid";
import { padSessionId } from "../util";
import { Cycle, Session } from "@/app/types";
import Button from "../components/base/Button";

export const revalidate = 5; // revalidate every 5 seconds

const CycleTitle = ({ cycle }: { cycle: Cycle | null }) => {
	if (!cycle) return <p className="col-span-full">No Cycle</p>;
	return (
		<p className={`col-span-full ${cycle.completed ? "text-fg-success" : ""}`}>
			Cycle {padSessionId(cycle.cycle_id)}
		</p>
	);
};

const NewCyclePrompt = ({ sessions }: { sessions: Session[] }) => {
	return (
		<>
			<div className="grid col-span-full grid-cols-subgrid ">
				<SessionGrid sessions={sessions} isNewCyclePrompt={true} />
			</div>
			<footer className="grid grid-cols-subgrid col-span-full p-2 fixed bottom-0 left-0 right-0 bg-gray-2 border-t border-t-gray-6">
				<Link href="/powerlifting/new-cycle">
					<Button className="w-full" label="Start new cycle →" />
				</Link>
			</footer>
		</>
	);
};

const NextSessionPrompt = ({ sessions }: { sessions: Session[] }) => {
	return (
		<>
			<div className="grid col-span-full grid-cols-subgrid ">
				<SessionGrid sessions={sessions} gridSpanClassName="col-span-4" />
			</div>
		</>
	);
};

const NoSessionsError = () => {
	return (
		<div className="text-fg-disabled">
			<p>Error: no sessions found for the current cycle</p>
		</div>
	);
};

export default async function Page() {
	const cycleData = await sql<Cycle>`
		SELECT *
		FROM Cycles
		ORDER BY CYCLE_ID DESC
		LIMIT 1;
	  `;

	const lastCycle = cycleData.rows[0];

	let sessionDataRows: Session[] = [];
	if (lastCycle) {
		const sessionData = await sql<Session>`
			SELECT *
			FROM Sessions
			WHERE CYCLE_ID = ${lastCycle.cycle_id}
			ORDER BY SESSION_ID ASC
		`;
		sessionDataRows = sessionData.rows;
	}

	return (
		<div className="grid grid-cols-subgrid col-span-full grid-rows-[auto_1fr] gap-y-4">
			<div className="grid grid-cols-subgrid col-span-full">
				<h1 className="col-span-full">Powerlifting</h1>
				<CycleTitle cycle={lastCycle} />
			</div>
			{!lastCycle || lastCycle.completed || lastCycle.end_date !== null ? (
				<NewCyclePrompt sessions={sessionDataRows} />
			) : sessionDataRows.length === 0 ? (
				<NoSessionsError />
			) : (
				<NextSessionPrompt sessions={sessionDataRows} />
			)}
		</div>
	);
}
