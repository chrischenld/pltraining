import Link from "next/link";
import { sql } from "@vercel/postgres";
import Block, { BlockVariant } from "../components/Block";

export default async function Page() {
	const cycleData = await sql`
		SELECT *
		FROM Cycles
		ORDER BY CYCLE_ID DESC
		LIMIT 1;
	  `;
	const lastCycle = cycleData.rows[0];

	interface Session {
		session_id: number;
		completed: boolean;
		primary_lift_type: string;
		secondary_lift_type: string;
		date: Date | null;
	}

	let sessionDataRows: Session[] = [];

	if (lastCycle && !lastCycle.completed) {
		const sessionData = await sql`
			SELECT *
			FROM Sessions
			WHERE CYCLE_ID = ${lastCycle.cycle_id}
			ORDER BY SESSION_ID ASC
	`;
		sessionDataRows = sessionData.rows as Session[];
	}

	const getSessionStatus = (
		session: Session,
		index: number
	): { variant: BlockVariant; textClass: string } => {
		if (session.completed) {
			return { variant: "completed", textClass: "text-fg-success" };
		} else if (index === sessionDataRows.findIndex((s) => !s.completed)) {
			return { variant: "selected", textClass: "text-fg-default" };
		} else {
			return { variant: "default", textClass: "" };
		}
	};

	const padSessionId = (id: number) => {
		return id.toString().padStart(2, "0");
	};

	const truncateLiftType = (lift: string) => {
		if (lift === "SQUAT") {
			return "SQ";
		} else if (lift === "BENCH") {
			return "BN";
		} else if (lift === "DEADLIFT") {
			return "DL";
		} else if (lift === "OVERHEAD_PRESS") {
			return "OP";
		} else {
			return "--";
		}
	};

	const renderDate = (date: Date | null) => {
		if (!date) return "--";
		const dateObject = date instanceof Date ? date : new Date(date);
		const month = String(dateObject.getMonth() + 1).padStart(2, "0");
		const day = String(dateObject.getDate()).padStart(2, "0");
		return `${month}.${day}`;
	};

	const renderSessions = () => {
		return sessionDataRows.map((session, index) => {
			const { variant, textClass } = getSessionStatus(session, index);
			return (
				<Block key={session.session_id} variant={variant}>
					<p className={textClass}>{padSessionId(session.session_id)}</p>
					<p>
						{truncateLiftType(session.primary_lift_type)}/
						{truncateLiftType(session.secondary_lift_type)}
					</p>
					<p>{session.date ? renderDate(session.date) : "--"}</p>
				</Block>
			);
		});
	};

	const renderEmptySessions = () => {};

	function NewCyclePrompt() {
		return (
			<div className="flex flex-col gap-8">
				<Link href="/powerlifting/new-cycle">
					<p>Start a new cycle</p>
					New cycle→
				</Link>
				<div className="grid grid-cols-4 gap-2">
					<p>No active cycle - start a new one</p>
				</div>
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
				<div className="flex">
					<div className="grid grid-cols-4 gap-2">{renderSessions()}</div>
				</div>
			</div>
		);
	}

	function NoSessionsError() {
		return (
			<div className="text-red-500">
				<p>Error: no sessions found for the current cycle</p>
			</div>
		);
	}

	return (
		<main className="flex flex-col px-4 py-8 gap-8">
			<h2>Powerlifting</h2>
			{!lastCycle || lastCycle.completed ? (
				<NewCyclePrompt />
			) : sessionDataRows.length === 0 ? (
				<NoSessionsError />
			) : (
				<NextSessionPrompt />
			)}
		</main>
	);
}
