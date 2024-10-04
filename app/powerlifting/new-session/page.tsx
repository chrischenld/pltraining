import { Suspense } from "react";
import { sql } from "@vercel/postgres";
import NewSessionForm from "@/app/components/sections/NewSessionForm";
import { Session } from "@/app/types";

async function fetchSessionData(sessionId: string) {
	const sessionData = await sql<Session>`
		SELECT * FROM Sessions WHERE session_id = ${sessionId}
	`;
	return sessionData.rows[0];
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
	return <NewSessionForm sessionData={sessionData} />;
}
