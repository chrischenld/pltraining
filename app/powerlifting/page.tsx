import Link from "next/link";
import { sql } from "@vercel/postgres";
import SessionGrid from "../components/sections/SessionGrid";
import { padSessionId } from "../util";
import { Cycle, Session } from "@/app/types";

const CycleTitle = ({ cycle }: { cycle: Cycle | null }) => {
	if (!cycle) return <p>No Cycle</p>;
	return (
		<p className={cycle.completed ? "text-fg-success" : ""}>
			Cycle {padSessionId(cycle.cycle_id)}
		</p>
	);
};

const NewCyclePrompt = ({
	cycle,
	sessions,
}: {
	cycle: Cycle | null;
	sessions: Session[];
}) => {
	return (
		<div className="flex flex-col gap-8">
			<CycleTitle cycle={cycle} />
			<SessionGrid sessions={sessions} isNewCyclePrompt={true} />
			<footer className="fixed bottom-0 left-0 right-0 bg-bg-base border-t border-t-border-default">
				<Link href="/powerlifting/new-cycle">
					<p className=" h-16 flex items-center justify-center text-fg-default">
						Start new cycle →
					</p>
				</Link>
			</footer>
		</div>
	);
};

const NextSessionPrompt = ({
	cycle,
	sessions,
}: {
	cycle: Cycle | null;
	sessions: Session[];
}) => {
	return (
		<div className="flex flex-col gap-8">
			<CycleTitle cycle={cycle} />
			<SessionGrid sessions={sessions} />
		</div>
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
		<main className="flex flex-col px-4 py-8 gap-8">
			<h2>Powerlifting</h2>
			<div className="flex">
				{!lastCycle || lastCycle.completed ? (
					<NewCyclePrompt cycle={lastCycle} sessions={sessionDataRows} />
				) : sessionDataRows.length === 0 ? (
					<NoSessionsError />
				) : (
					<NextSessionPrompt cycle={lastCycle} sessions={sessionDataRows} />
				)}
			</div>
		</main>
	);
}
