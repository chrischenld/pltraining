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
		if (!isNewCyclePrompt) {
			onSelect(session.session_id);
		}
	};

	return (
		<Block
			variant={
				isSelected && session.completed
					? "completedSelected"
					: isSelected
					? "selected"
					: variant
			}
			onSelect={handleSelect}
			isSelectable={!isNewCyclePrompt}
			className={`${className} grid-rows-8 grid-cols-8`}
			outerClassName={outerClassName}
			paddingSize="p-2"
		>
			<p
				className={`row-start-2 col-start-2 text-2xl ${
					session.completed ? "text-fg-success" : ""
				} ${textClass}`}
			>
				{padSessionId(session.session_number)}
			</p>
			<div className="row-end-8 col-start-2 col-end-8 self-stretch flex flex-col gap-1 justify-end">
				<div className="flex flex-row justify-between">
					<p className="text-gray-6">LFT</p>
					<p>
						{isNewCyclePrompt
							? "--"
							: `${truncateLiftType(
									session.primary_lift_type
							  )}/${truncateLiftType(session.secondary_lift_type)}`}
					</p>
				</div>
				<div className="flex flex-row justify-between">
					<p className="text-gray-6">DAT</p>
					<p>{session.date ? renderDate(session.date) : "--"}</p>
				</div>
				{/* <p>70/80/90</p> */}
			</div>
		</Block>
	);
}
