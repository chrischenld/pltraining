"use client";

import React, { useState, useEffect } from "react";
import SessionBlock from "../compositions/SessionBlock";
import Button from "@/app/components/base/Button";
import { Session } from "@/app/types";
import { padSessionId } from "@/app/util";
import Link from "next/link";

interface SessionGridProps {
	sessions: Session[];
	isNewCyclePrompt?: boolean;
	gridSpanClassName?: string;
	newSessionButton?: boolean;
}

export default function SessionGrid({
	sessions,
	isNewCyclePrompt = false,
	gridSpanClassName,
	newSessionButton = true,
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
		<form
			action="/powerlifting/new-session"
			method="get"
			className="grid grid-cols-subgrid col-span-full"
		>
			<div className="grid grid-cols-subgrid auto-rows-max col-span-full pb-24 md:pb-0">
				{sessions.map((session, index) => {
					let borderClass = "border";

					if (index % 2 !== 0) {
						borderClass += " border-l-0";
					}

					if (index >= 2) {
						borderClass += " border-t-0";
					}

					if (index >= 2 && index <= 5) {
						borderClass += " md:border-t";
					}

					if (index === 6 || index === 12) {
						borderClass += " md:border-l";
					}

					if (index >= 6) {
						borderClass += " md:border-t-0";
					}

					if ([2, 4, 8, 10, 14].includes(index)) {
						borderClass += " md:border-l-0";
					}

					return (
						<SessionBlock
							key={session.session_id}
							session={session}
							sessions={sessions}
							isSelected={selectedSessionId === session.session_id}
							onSelect={handleSessionSelect}
							isNewCyclePrompt={isNewCyclePrompt}
							outerClassName={`${borderClass} ${gridSpanClassName}`}
							className="col-span-4"
						/>
					);
				})}
			</div>
			<input type="hidden" name="sessionId" value={selectedSessionId || ""} />
			{newSessionButton ? (
				<div className="p-2 fixed bottom-0 left-0 right-0 bg-gray-2 border-t border-t-gray-6">
					<Button
						label={buttonLabel}
						loading="Loading..."
						completed="Started"
						className="w-full"
						disabled={!selectedSessionId}
					/>
				</div>
			) : (
				<div className="p-2 fixed bottom-0 left-0 right-0 bg-gray-2 border-t border-t-gray-6">
					<Link href="/powerlifting/new-cycle">
						<Button label="Start new cycle →" className="w-full" />
					</Link>
				</div>
			)}
		</form>
	);
}
