"use client";

import React, { useState, useEffect } from "react";
import SessionBlock from "../compositions/SessionBlock";
import { Session } from "@/app/types";
import { LiftType } from "@/app/types";
import Button from "@/app/components/base/Button";
import { padSessionId } from "@/app/util";

interface SessionGridProps {
	sessions: Session[];
	isNewCyclePrompt?: boolean;
}

export default function SessionGrid({
	sessions,
	isNewCyclePrompt = false,
}: SessionGridProps) {
	const [selectedSessionId, setSelectedSessionId] = useState<number | null>(
		null
	);
	const [selectedSessionNumber, setSelectedSessionNumber] = useState<
		string | null
	>(null);

	useEffect(() => {
		const firstIncompleteSession = sessions.find(
			(session) => !session.completed
		);
		if (firstIncompleteSession) {
			setSelectedSessionId(firstIncompleteSession.session_id);
			setSelectedSessionNumber(
				padSessionId(firstIncompleteSession.session_number)
			);
		}
	}, [sessions]);

	const handleSessionSelect = (sessionId: number) => {
		setSelectedSessionId(sessionId);
		const selectedSession = sessions.find(
			(session) => session.session_id === sessionId
		);
		if (selectedSession) {
			setSelectedSessionNumber(padSessionId(selectedSession.session_number));
		}
	};

	const buttonLabel = selectedSessionNumber
		? `Start Session ${selectedSessionNumber}`
		: "Select a Session";

	return (
		<form action="/powerlifting/new-session" method="get">
			<div className="grid grid-cols-4 gap-4 pb-24">
				{sessions.map((session) => (
					<SessionBlock
						key={session.session_id}
						session={session}
						sessions={sessions}
						isSelected={selectedSessionId === session.session_id}
						onSelect={handleSessionSelect}
						isNewCyclePrompt={isNewCyclePrompt}
					/>
				))}
			</div>
			<input type="hidden" name="sessionId" value={selectedSessionId || ""} />
			<div className="pt-5 pb-6 px-4 fixed bottom-0 left-0 right-0 bg-bg-base border-t border-t-border-default">
				<Button
					label={buttonLabel}
					loading="Loading..."
					completed="Started"
					className="w-full"
					disabled={!selectedSessionId}
				/>
			</div>
		</form>
	);
}
