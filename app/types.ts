export interface Cycle {
	cycle_id: number;
	user_id: number;
	completed: boolean;
	start_date: Date | null;
	end_date: Date | null;
}

export interface Session {
	session_id: number;
	session_number: number;
	completed: boolean;
	primary_lift_type: LiftType;
	secondary_lift_type: LiftType;
	date: Date | null;
}

export enum LiftType {
	SQUAT = "SQUAT",
	BENCH = "BENCH",
	DEADLIFT = "DEADLIFT",
	OVERHEAD_PRESS = "OVERHEAD_PRESS",
}
