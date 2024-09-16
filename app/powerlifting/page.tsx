import Link from "next/link";
import { sql } from "@vercel/postgres";
import Block, { BlockVariant } from "../components/base/Block";

const liftTypes = {
	SQUAT: "SQ",
	BENCH: "BN",
	DEADLIFT: "DL",
	OVERHEAD_PRESS: "OP",
} as const;

type LiftType = keyof typeof liftTypes;

// Types

interface Session {
	session_id: number;
	completed: boolean;
	primary_lift_type: LiftType;
	secondary_lift_type: LiftType;
	date: Date | null;
	session_number: number;
}

interface Cycle {
	cycle_id: number;
	user_id: number;
	completed: boolean;
	start_date: Date | null;
	end_date: Date | null;
}

// Functions

const padSessionId = (id: number) => {
	return id.toString().padStart(2, "0");
};

const truncateLiftType = (lift: LiftType) => {
	return liftTypes[lift] || "--";
};

const renderDate = (date: Date | null) => {
	if (!date) return "--";
	const dateObject = date instanceof Date ? date : new Date(date);
	const month = String(dateObject.getMonth() + 1).padStart(2, "0");
	const day = String(dateObject.getDate()).padStart(2, "0");
	return `${month}.${day}`;
};

const getSessionStatus = (
	session: Session,
	sessions: Session[]
): { variant: BlockVariant; textClass: string } => {
	if (session.completed) {
		return { variant: "completed", textClass: "text-fg-success" };
	} else if (
		session.session_number ===
		sessions.find((s) => !s.completed)?.session_number
	) {
		return { variant: "selected", textClass: "text-fg-default" };
	} else {
		return { variant: "default", textClass: "" };
	}
};

// Components

const SessionBlock = ({
	session,
	sessions,
}: {
	session: Session;
	sessions: Session[];
}) => {
	const { variant, textClass } = getSessionStatus(session, sessions);
	return (
		<Block key={session.session_id} variant={variant}>
			<p className={textClass}>{padSessionId(session.session_number)}</p>
			<p>
				{truncateLiftType(session.primary_lift_type)}/
				{truncateLiftType(session.secondary_lift_type)}
			</p>
			<p>{session.date ? renderDate(session.date) : "--"}</p>
		</Block>
	);
};

const SessionGrid = ({ sessions }: { sessions: Session[] }) => (
	<div className="grid grid-cols-4 gap-2">
		{sessions.length > 0
			? sessions.map((session) => (
					<SessionBlock
						key={session.session_id}
						session={session}
						sessions={sessions}
					/>
			  ))
			: Array.from({ length: 16 }, (_, index) => (
					<Block key={index} variant="empty">
						<p className="text-fg-disabled">{padSessionId(index + 1)}</p>
						<p className="text-fg-disabled">--</p>
						<p className="text-fg-disabled">--</p>
					</Block>
			  ))}
	</div>
);

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
			{/* <Link href="/powerlifting/new-cycle">
				<p>Start a new cycle</p>
				New cycle→
			</Link> */}
			<CycleTitle cycle={cycle} />
			<SessionGrid sessions={sessions} />
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
			{/* <Link href="/powerlifting/new-session">
				<p>Next session</p>
				Start session→
			</Link> */}
			<CycleTitle cycle={cycle} />
			<SessionGrid sessions={sessions} />
			<footer className="fixed bottom-0 left-0 right-0 bg-bg-base border-t border-t-border-default">
				<Link href="/powerlifting/new-session">
					<p className=" h-16 flex items-center justify-center text-fg-default">
						Next session →
					</p>
				</Link>
			</footer>
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
