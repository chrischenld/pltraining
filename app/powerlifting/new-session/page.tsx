import { Suspense } from "react";
import { sql } from "@vercel/postgres";
import { z } from "zod";
import { Session, Set } from "@/app/types";
import NewSessionForm from "@/app/components/sections/NewSessionForm";

const SetSchema = z.object({
	set_id: z.coerce.number(),
	session_id: z.coerce.number(),
	lift_type: z.enum(["PRIMARY", "SECONDARY"]),
	set_number: z.coerce.number(),
	weight_percentage_programmed: z.coerce.number(),
	reps_programmed: z.coerce.number(),
	weight_programmed: z
		.union([z.coerce.number(), z.literal("NaN")])
		.transform((val) => (val === "NaN" ? null : val)),
	reps_performed: z.coerce.number().nullable(),
	weight_performed: z.coerce.number().nullable(),
	is_joker_set: z.coerce.boolean(),
	success: z.coerce.boolean().nullable(),
	created_at: z.coerce.date(),
	updated_at: z.coerce.date(),
	rate_perceived_exertion: z.coerce.number().nullable(),
	notes: z.string().nullable(),
});

async function fetchSessionData(sessionId: string) {
	const sessionData = await sql<Session>`
		SELECT * FROM Sessions WHERE session_id = ${sessionId}
	`;
	return sessionData.rows[0];
}

async function fetchSetData(sessionId: string): Promise<Set[]> {
	const setData = await sql`
		SELECT * FROM Sets WHERE session_id = ${sessionId}
	`;

	console.log("Raw set data:", setData.rows);

	return setData.rows.map((row) => {
		const parsedRow = SetSchema.parse(row);
		console.log("Parsed row:", parsedRow);
		return parsedRow;
	});
}

export default async function Page({
	searchParams,
}: {
	searchParams: { [key: string]: string | string[] | undefined };
}) {
	const sessionId = searchParams.sessionId as string;

	return (
		<div className="grid grid-cols-subgrid col-span-full grid-rows-[auto_1fr] gap-y-4">
			<div className="grid grid-cols-subgrid col-span-full">
				<h1 className="col-span-full">New Session</h1>
			</div>
			<Suspense
				fallback={
					<div>
						<p>Loading...</p>
					</div>
				}
			>
				{sessionId ? (
					<SessionDataWrapper sessionId={sessionId} />
				) : (
					<p>No session selected. Please go back and select a session.</p>
				)}
			</Suspense>
		</div>
	);
}

async function SessionDataWrapper({ sessionId }: { sessionId: string }) {
	const sessionData = await fetchSessionData(sessionId);
	const setData = await fetchSetData(sessionId);
	return <NewSessionForm sessionData={sessionData} setData={setData} />;
}
