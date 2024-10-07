import { BlockVariant } from "./components/base/Block";
import { Session } from "./types";
import { LiftType } from "./types";
import { Set } from "@/app/types";

export const getLiftTypeCode = (liftType: LiftType): string => {
	switch (liftType) {
		case LiftType.SQUAT:
			return "SQ";
		case LiftType.BENCH:
			return "BN";
		case LiftType.DEADLIFT:
			return "DL";
		case LiftType.OVERHEAD_PRESS:
			return "OP";
	}
};

export const padSessionId = (id: number) => {
	return id.toString().padStart(2, "0");
};

export const truncateLiftType = (lift: LiftType) => {
	const liftTypes = {
		SQUAT: "SQ",
		BENCH: "BN",
		DEADLIFT: "DL",
		OVERHEAD_PRESS: "OP",
	};
	return liftTypes[lift] || "--";
};

export const renderDate = (date: Date | null) => {
	if (!date) return "--";
	const dateObject = date instanceof Date ? date : new Date(date);
	const month = String(dateObject.getMonth() + 1).padStart(2, "0");
	const day = String(dateObject.getDate()).padStart(2, "0");
	return `${month}.${day}`;
};

export const getSessionStatus = (
	session: Session,
	sessions: Session[],
	selectedSessionId: number | null
): { variant: BlockVariant; textClass: string } => {
	if (session.completed) {
		return { variant: "completed", textClass: "text-fg-success" };
	} else if (session.session_id === selectedSessionId) {
		return { variant: "selected", textClass: "text-fg-default" };
	} else if (
		session.session_number ===
		sessions.find((s) => !s.completed)?.session_number
	) {
		return { variant: "default", textClass: "text-fg-muted" };
	} else {
		return { variant: "default", textClass: "" };
	}
};

export function getSetStatus(set: Set, isSelected: boolean) {
	if (set.success) {
		return { variant: "completed", textClass: "text-fg-default" };
	}
	if (isSelected) {
		return { variant: "selected", textClass: "text-fg-onStrong" };
	} else {
		return { variant: "default", textClass: "text-fg-default" };
	}
}

// export type FormState = {
// 	status: "UNSET" | "SUCCESS" | "ERROR";
// 	message: string;
// 	fieldErrors: Record<string, string[] | undefined>;
// 	timestamp: number;
// };

// export const EMPTY_FORM_STATE: FormState = {
// 	status: "UNSET" as const,
// 	message: "",
// 	fieldErrors: {},
// 	timestamp: Date.now(),
// };

// export function fromErrorToFormState(error: unknown) {
// 	if (error instanceof ZodError) {
// 		return {
// 			status: "ERROR" as const,
// 			message: "",
// 			fieldErrors: error.flatten().fieldErrors,
// 			timestamp: Date.now(),
// 		};
// 	} else if (error instanceof Error) {
// 		return {
// 			status: "ERROR" as const,
// 			message: error.message,
// 			fieldErrors: {},
// 			timestamp: Date.now(),
// 		};
// 	} else {
// 		return {
// 			status: "ERROR" as const,
// 			message: "Unknown error occurred",
// 			fieldErrors: {},
// 			timestamp: Date.now(),
// 		};
// 	}
// }

// export function toFormState(status: FormState["status"], message: string) {
// 	return {
// 		status,
// 		message,
// 		fieldErrors: {},
// 		timestamp: Date.now(),
// 	};
// }
