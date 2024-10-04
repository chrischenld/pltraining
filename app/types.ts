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

export interface Set {
	set_id: number;
	session_id: number;
	lift_type: "PRIMARY" | "SECONDARY";
	set_number: number;
	weight_percentage_programmed: number;
	reps_programmed: number;
	weight_programmed: number | null;
	reps_performed: number | null;
	weight_performed: number | null;
	is_joker_set: boolean;
	success: boolean | null;
	created_at: Date;
	updated_at: Date;
	rate_perceived_exertion: number | null;
	notes: string | null;
}

export enum LiftType {
	SQUAT = "SQUAT",
	BENCH = "BENCH",
	DEADLIFT = "DEADLIFT",
	OVERHEAD_PRESS = "OVERHEAD_PRESS",
}
