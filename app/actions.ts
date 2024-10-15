"use server";

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { Set, SetSubmissionState } from "@/app/types";

const CycleSchema = z.object({
	squat: z.number().positive(),
	bench: z.number().positive(),
	deadlift: z.number().positive(),
	overheadPress: z.number().positive(),
});

type LiftType = "SQUAT" | "BENCH" | "DEADLIFT" | "OVERHEAD_PRESS";

const liftPattern: [LiftType, LiftType][] = [
	["SQUAT", "DEADLIFT"],
	["BENCH", "OVERHEAD_PRESS"],
	["DEADLIFT", "SQUAT"],
	["OVERHEAD_PRESS", "BENCH"],
];

export async function createNewCycle(
	prevState: { message: string; success: boolean },
	formData: FormData
) {
	const rawData = {
		squat: Number(formData.get("squat")),
		bench: Number(formData.get("bench")),
		deadlift: Number(formData.get("deadlift")),
		overheadPress: Number(formData.get("overheadPress")),
	};

	try {
		const validatedData = CycleSchema.parse(rawData);

		await sql`BEGIN`;

		try {
			const cycleResult = await sql`
          INSERT INTO Cycles (
            user_id, 
            start_date, 
            squat_training_max, 
            bench_training_max, 
            deadlift_training_max, 
            overhead_press_training_max, 
            completed
          ) VALUES (
            1, 
            CURRENT_DATE, 
            ${validatedData.squat}, 
            ${validatedData.bench}, 
            ${validatedData.deadlift}, 
            ${validatedData.overheadPress}, 
            false
        )
          RETURNING cycle_id
        `;

			const cycleId = cycleResult.rows[0].cycle_id;

			for (let i = 0; i < 16; i++) {
				const sessionNumber = i + 1;
				const patternIndex = i % 4;
				const [primaryLift, secondaryLift] = liftPattern[patternIndex];

				// Create Session
				const sessionResult = await sql`
          INSERT INTO Sessions (
            cycle_id,
            session_number,
            date,
            primary_lift_type,
            secondary_lift_type,
            completed,
            created_at,
            updated_at
          ) VALUES (
            ${cycleId},
            ${sessionNumber},
            NULL,
            ${primaryLift},
            ${secondaryLift},
            false,
            CURRENT_TIMESTAMP,
            CURRENT_TIMESTAMP
          )
          RETURNING session_id
        `;

				const sessionId = sessionResult.rows[0].session_id;

				try {
					// Create Sets for primary lift
					const primaryDetails = getSetDetails(sessionNumber, true);
					await createSetsForLift(
						sessionId,
						primaryLift,
						true,
						primaryDetails,
						validatedData
					);

					// Create Sets for secondary lift
					const secondaryDetails = getSetDetails(sessionNumber, false);
					await createSetsForLift(
						sessionId,
						secondaryLift,
						false,
						secondaryDetails,
						validatedData
					);

					// console.log(`Created Sets for Session ${sessionNumber}`);
				} catch (error) {
					console.error(
						`Error creating Sets for Session ${sessionNumber}:`,
						error
					);
					throw error; // Re-throw to trigger transaction rollback
				}
			}

			await sql`COMMIT`;

			revalidatePath("/powerlifting");
			return {
				message: "Created new Cycle, Sessions, and Sets",
				success: true,
			};
		} catch (error) {
			// If any error occurred, roll back the transaction
			await sql`ROLLBACK`;
			throw error; // Re-throw to be caught by the outer catch block
		}
	} catch (error) {
		if (error instanceof z.ZodError) {
			console.error("Validation error:", error.errors);
			return { message: "Invalid input data", success: false };
		}
		console.error("Failed to create new cycle:", error);
		return { message: "Failed to create new cycle", success: false };
	}
}

function getSetDetails(sessionNumber: number, isPrimary: boolean) {
	const weekNumber = Math.floor((sessionNumber - 1) / 4);
	const setCount = isPrimary ? 3 : 5;
	let reps: number[];
	let percentages: number[];

	switch (weekNumber) {
		case 0: // Sessions 1-4
			reps = isPrimary ? [3, 3, 3] : [3, 3, 3, 3, 3];
			percentages = isPrimary ? [70, 80, 90] : [90, 90, 90, 90, 90];
			break;
		case 1: // Sessions 5-8
			reps = isPrimary ? [5, 5, 5] : [5, 5, 5, 5, 5];
			percentages = isPrimary ? [65, 75, 85] : [80, 80, 80, 80, 80];
			break;
		case 2: // Sessions 9-12
			reps = isPrimary ? [5, 3, 1] : [3, 3, 3, 3, 3];
			percentages = isPrimary ? [75, 85, 95] : [90, 90, 90, 90, 90];
			break;
		case 3: // Sessions 13-16
			reps = isPrimary ? [3, 3, 3] : [3, 3, 3, 3, 3];
			percentages = isPrimary ? [40, 50, 60] : [60, 60, 60, 60, 60];
			break;
		default:
			throw new Error("Invalid session number");
	}

	return { setCount, reps, percentages };
}

async function createSetsForLift(
	sessionId: number,
	liftType: LiftType,
	isPrimary: boolean,
	details: { setCount: number; reps: number[]; percentages: number[] },
	trainingMaxes: {
		squat: number;
		bench: number;
		deadlift: number;
		overheadPress: number;
	}
) {
	const { setCount, reps, percentages } = details;
	const liftTypeKey =
		liftType === "OVERHEAD_PRESS" ? "overheadPress" : liftType.toLowerCase();
	const selectedTrainingMax =
		trainingMaxes[liftTypeKey as keyof typeof trainingMaxes];

	if (selectedTrainingMax === undefined) {
		console.error(`Training max not found for lift type: ${liftType}`);
		console.error("Available training maxes:", trainingMaxes);
		throw new Error(`Training max not found for lift type: ${liftType}`);
	}

	for (let i = 0; i < setCount; i++) {
		const weightPercentage = percentages[i];
		const repsProgram = reps[i];
		const weightProgrammed = Math.round(
			(selectedTrainingMax * weightPercentage) / 100
		);

		await sql`
      INSERT INTO Sets (
        SESSION_ID,
        LIFT_TYPE,
        SET_NUMBER,
        WEIGHT_PERCENTAGE_PROGRAMMED,
        REPS_PROGRAMMED,
        WEIGHT_PROGRAMMED,
        REPS_PERFORMED,
        WEIGHT_PERFORMED,
        IS_JOKER_SET,
        SUCCESS,
        CREATED_AT,
        UPDATED_AT
      ) VALUES (
        ${sessionId},
        ${isPrimary ? "PRIMARY" : "SECONDARY"},
        ${i + 1},
        ${weightPercentage},
        ${repsProgram},
        ${weightProgrammed},
        NULL,
        NULL,
        false,
        NULL,
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
      )
    `;
	}
}

export const submitSet = async (
	prevState: SetSubmissionState,
	formData: FormData
): Promise<SetSubmissionState> => {
	console.log("submitSet: Starting function");
	console.log("Form data:", Object.fromEntries(formData));

	const setId = formData.get("setId");
	const weightPerformed = Number(formData.get("weightPerformed"));
	const repsPerformed = Number(formData.get("repsPerformed"));
	const weightProgrammed = Number(formData.get("weightProgrammed"));
	const repsProgrammed = Number(formData.get("repsProgrammed"));
	const rpePerformed = Number(formData.get("rpePerformed"));
	const sessionId = Number(formData.get("sessionId")); // Add this line to get sessionId

	if (
		!setId ||
		isNaN(weightPerformed) ||
		isNaN(repsPerformed) ||
		isNaN(weightProgrammed) ||
		isNaN(repsProgrammed) ||
		isNaN(rpePerformed) ||
		isNaN(sessionId)
	) {
		console.log("submitSet: Missing or invalid required fields");
		return { message: "Missing or invalid required fields", success: false };
	}

	const success =
		weightPerformed >= weightProgrammed && repsPerformed >= repsProgrammed;

	const setData: Partial<Set> = {
		set_id: Number(setId),
		weight_performed: weightPerformed,
		reps_performed: repsPerformed,
		updated_at: new Date(),
		success: success,
		rate_perceived_exertion: rpePerformed,
	};

	try {
		await sql`BEGIN`;

		// Check if the set already has performed values
		const existingSet = await sql`
			SELECT WEIGHT_PERFORMED, REPS_PERFORMED
			FROM Sets
			WHERE SET_ID = ${setData.set_id}
		`;

		const isUpdate =
			existingSet.rows[0].weight_performed !== null &&
			existingSet.rows[0].reps_performed !== null;

		await sql`
			UPDATE Sets
			SET 
				WEIGHT_PERFORMED = ${setData.weight_performed},
				REPS_PERFORMED = ${setData.reps_performed},
				UPDATED_AT = CURRENT_TIMESTAMP,
				SUCCESS = ${setData.success},
				RATE_PERCEIVED_EXERTION = ${setData.rate_perceived_exertion}
			WHERE SET_ID = ${setData.set_id}
		`;

		// Check if all sets for the session are completed
		console.log(`Checking incomplete sets for session ${sessionId}`);
		const incompleteSets = await sql`
			SELECT COUNT(*) as count
			FROM Sets
			WHERE SESSION_ID = ${sessionId} AND SUCCESS IS NULL
		`;
		console.log("Incomplete sets query result:", incompleteSets.rows[0]);

		const incompleteCount = Number(incompleteSets.rows[0].count);

		if (incompleteCount === 0) {
			console.log(
				`All sets completed for session ${sessionId}, updating session status`
			);
			// All sets are completed, update the session
			await sql`
				UPDATE Sessions
				SET COMPLETED = true
				WHERE SESSION_ID = ${sessionId}
			`;
			console.log(`submitSet: Marked session ${sessionId} as completed`);
			revalidatePath("/powerlifting/new-session");
		} else {
			console.log(
				`Session ${sessionId} still has incomplete sets: ${incompleteCount}`
			);
		}

		await sql`COMMIT`;

		console.log(
			`submitSet: Successfully ${
				isUpdate ? "updated" : "created"
			} set_id ${setId}`
		);
		revalidatePath("/powerlifting/new-session");
		return {
			message: isUpdate
				? "Set updated successfully"
				: "Set created successfully",
			success: true,
			isUpdate: isUpdate,
		};
	} catch (error) {
		await sql`ROLLBACK`;
		console.error("Error in submitSet:", error);
		return { message: "Failed to update set", success: false };
	}
};

//
//
//
//

// export async function createRows(prevState: any, formData: FormData) {
// 	try {
// 		await sql`
//             INSERT INTO Sets (set_id, lift_type, set_count, reps_programmed, weight_programmed_percentage, weight_programmed)
//             SELECT
//                 generate_series AS set_id,
//                 'SQUAT' AS lift_type,
//                 generate_series AS set_count,
//                 5 AS reps_programmed,
//                 CASE
//                     WHEN generate_series = 1 THEN 0.70
//                     WHEN generate_series = 2 THEN 0.80
//                     WHEN generate_series = 3 THEN 0.90
//                     WHEN generate_series = 4 THEN 0.80
//                     WHEN generate_series = 5 THEN 0.70
//                 END AS weight_programmed_percentage,
//                 CASE
//                     WHEN generate_series = 1 THEN 0.70 * 350
//                     WHEN generate_series = 2 THEN 0.80 * 350
//                     WHEN generate_series = 3 THEN 0.90 * 350
//                     WHEN generate_series = 4 THEN 0.80 * 350
//                     WHEN generate_series = 5 THEN 0.70 * 350
//                 END AS weight_programmed
//             FROM generate_series(1, 5)

//             UNION ALL

//             SELECT
//                 generate_series + 5 AS set_id,  -- Offset set_id by 5 for the second set of rows
//                 'DEADLIFT' AS lift_type,
//                 generate_series AS set_count,
//                 5 AS reps_programmed,
//                 CASE
//                     WHEN generate_series = 1 THEN 0.70
//                     WHEN generate_series = 2 THEN 0.80
//                     WHEN generate_series = 3 THEN 0.90
//                     WHEN generate_series = 4 THEN 0.80
//                     WHEN generate_series = 5 THEN 0.70
//                 END AS weight_programmed_percentage,
//                 CASE
//                     WHEN generate_series = 1 THEN 0.70 * 445
//                     WHEN generate_series = 2 THEN 0.80 * 445
//                     WHEN generate_series = 3 THEN 0.90 * 445
//                     WHEN generate_series = 4 THEN 0.80 * 445
//                     WHEN generate_series = 5 THEN 0.70 * 445
//                 END AS weight_programmed
//             FROM generate_series(1, 5);
//         `;

// 		revalidatePath("/");
// 		return { message: `added rows` };
// 	} catch (e) {
// 		return { message: `failed` };
// 	}
// }

// export async function markRowsWithDate(prevState: any, formData: FormData) {
// 	const date = new Date();
// 	let day = date.getDate();
// 	let month = date.getMonth() + 1;
// 	let year = date.getFullYear();

// 	let currentDate = `${year}.${month}.${day}`;

// 	const schema = z.object({
// 		setId: z.string().min(1),
// 	});

// 	const data = schema.parse({
// 		setId: formData.get("setId"),
// 	});

// 	try {
// 		await sql`
//             UPDATE Sets
//             SET date = ${currentDate}
//             WHERE set_id = ${data.setId};
//         `;

// 		revalidatePath("/");
// 		return {
// 			message: `Added date ${currentDate} for ${data.setId}`,
// 		};
// 	} catch (e) {
// 		return { message: `Failed to assign date` };
// 	}
// }

// export async function setRepsPerformed(prevState: any, formData: FormData) {
// 	console.log(formData);

// 	const schema = z.object({
// 		setId: z.string().min(1),
// 		reps: z.string().min(1),
// 	});

// 	const data = schema.parse({
// 		setId: formData.get("setId"),
// 		reps: formData.get("reps"),
// 	});

// 	try {
// 		await sql`
//             UPDATE Sets
//             SET reps_performed = ${data.reps}
//             WHERE set_id = ${data.setId};
//         `;

// 		revalidatePath("/");
// 		return {
// 			message: `Added ${data.reps} sets for ${data.setId}`,
// 		};
// 	} catch (e) {
// 		return { message: `Failed to assign date` };
// 	}
// }
