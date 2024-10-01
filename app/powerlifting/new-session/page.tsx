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
		<div className="flex flex-col gap-6">
			<h1>New Session</h1>
			<Suspense fallback={<div>Loading...</div>}>
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
