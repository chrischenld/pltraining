import Link from "next/link";
import { sql } from "@vercel/postgres";
import Block from "../components/Block";

export default async function Page() {
	const cycleData = await sql`
		SELECT *
		FROM CyclesTestData
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
			FROM SessionsTestData
			WHERE CYCLE_ID = ${lastCycle.cycle_id}
			ORDER BY SESSION_ID ASC
	`;
		sessionDataRows = sessionData.rows as Session[];
	}

	const getSessionStatus = (
		session: Session,
		index: number
	): { variant: "completed" | "selected" | "default"; textClass: string } => {
		if (session.completed) {
			return { variant: "completed", textClass: "text-fg-success" };
		} else if (index === sessionDataRows.findIndex((s) => !s.completed)) {
			return { variant: "selected", textClass: "text-fg-default" };
		} else {
			return { variant: "default", textClass: "" };
		}
	};

	const truncateLiftType = (lift: string) => {
		return lift.slice(0, 2);
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
					<p className={textClass}>{session.session_id}</p>
					<p className={textClass}>
						{truncateLiftType(session.primary_lift_type)}/
						{truncateLiftType(session.secondary_lift_type)}
					</p>
					<p>{session.date ? renderDate(session.date) : "--"}</p>
				</Block>
			);
		});
	};

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
				<div className="grid grid-cols-4 gap-2">{renderSessions()}</div>
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
