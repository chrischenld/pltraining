"use client";

import React from "react";
import Block from "../base/Block";
import { Session } from "@/app/types";
import {
	padSessionId,
	truncateLiftType,
	renderDate,
	getSessionStatus,
} from "@/app/util";

interface SessionBlockProps {
	session: Session;
	sessions: Session[];
	isSelected: boolean;
	onSelect: (sessionId: number) => void;
	isNewCyclePrompt?: boolean;
	className?: string;
	outerClassName?: string;
}

export default function SessionBlock({
	session,
	sessions,
	isSelected,
	onSelect,
	isNewCyclePrompt = false,
	className,
	outerClassName,
}: SessionBlockProps) {
	const { variant, textClass } = getSessionStatus(
		session,
		sessions,
		isSelected ? session.session_id : null
	);

	const handleSelect = () => {
		if (!session.completed && !isNewCyclePrompt) {
			onSelect(session.session_id);
		}
	};

	return (
		<Block
			variant={isSelected ? "selected" : variant}
			onSelect={handleSelect}
			isSelectable={!session.completed && !isNewCyclePrompt}
			className={className}
			outerClassName={outerClassName}
			paddingSize="p-2"
		>
			<p className={textClass}>{padSessionId(session.session_number)}</p>
			<p>
				{isNewCyclePrompt
					? "--"
					: `${truncateLiftType(session.primary_lift_type)}/${truncateLiftType(
							session.secondary_lift_type
					  )}`}
			</p>
			<p>{session.date ? renderDate(session.date) : "--"}</p>
		</Block>
	);
}
