"use server";

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { z } from "zod";

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

let isNewCycleSubmitting = false;

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

	if (isNewCycleSubmitting) {
		return { message: "A submission is already in progress", success: false };
	}

	isNewCycleSubmitting = true;

	try {
		const validatedData = CycleSchema.parse(rawData);

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

			await sql`
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
            `;
		}

		revalidatePath("/powerlifting");
		return { message: "Created new Cycle and 16 Sessions", success: true };
	} catch (error) {
		if (error instanceof z.ZodError) {
			console.error("Validation error:", error.errors);
			return { message: "Invalid input data", success: false };
		}
		console.error("Failed to create new cycle:", error);
		return { message: "Failed to create new cycle", success: false };
	} finally {
		isNewCycleSubmitting = false;
	}
}

//
//
//
//

export async function createRows(prevState: any, formData: FormData) {
	try {
		await sql`
            INSERT INTO Sets (set_id, lift_type, set_count, reps_programmed, weight_programmed_percentage, weight_programmed)
            SELECT
                generate_series AS set_id,
                'SQUAT' AS lift_type,
                generate_series AS set_count,
                5 AS reps_programmed,
                CASE
                    WHEN generate_series = 1 THEN 0.70
                    WHEN generate_series = 2 THEN 0.80
                    WHEN generate_series = 3 THEN 0.90
                    WHEN generate_series = 4 THEN 0.80
                    WHEN generate_series = 5 THEN 0.70
                END AS weight_programmed_percentage,
                CASE
                    WHEN generate_series = 1 THEN 0.70 * 350
                    WHEN generate_series = 2 THEN 0.80 * 350
                    WHEN generate_series = 3 THEN 0.90 * 350
                    WHEN generate_series = 4 THEN 0.80 * 350
                    WHEN generate_series = 5 THEN 0.70 * 350
                END AS weight_programmed
            FROM generate_series(1, 5)
            
            UNION ALL
            
            SELECT
                generate_series + 5 AS set_id,  -- Offset set_id by 5 for the second set of rows
                'DEADLIFT' AS lift_type,
                generate_series AS set_count,
                5 AS reps_programmed,
                CASE
                    WHEN generate_series = 1 THEN 0.70
                    WHEN generate_series = 2 THEN 0.80
                    WHEN generate_series = 3 THEN 0.90
                    WHEN generate_series = 4 THEN 0.80
                    WHEN generate_series = 5 THEN 0.70
                END AS weight_programmed_percentage,
                CASE
                    WHEN generate_series = 1 THEN 0.70 * 445
                    WHEN generate_series = 2 THEN 0.80 * 445
                    WHEN generate_series = 3 THEN 0.90 * 445
                    WHEN generate_series = 4 THEN 0.80 * 445
                    WHEN generate_series = 5 THEN 0.70 * 445
                END AS weight_programmed
            FROM generate_series(1, 5);
        `;

		revalidatePath("/");
		return { message: `added rows` };
	} catch (e) {
		return { message: `failed` };
	}
}

export async function markRowsWithDate(prevState: any, formData: FormData) {
	const date = new Date();
	let day = date.getDate();
	let month = date.getMonth() + 1;
	let year = date.getFullYear();

	let currentDate = `${year}.${month}.${day}`;

	const schema = z.object({
		setId: z.string().min(1),
	});

	const data = schema.parse({
		setId: formData.get("setId"),
	});

	try {
		await sql`
            UPDATE Sets
            SET date = ${currentDate}
            WHERE set_id = ${data.setId};
        `;

		revalidatePath("/");
		return {
			message: `Added date ${currentDate} for ${data.setId}`,
		};
	} catch (e) {
		return { message: `Failed to assign date` };
	}
}

export async function setRepsPerformed(prevState: any, formData: FormData) {
	console.log(formData);

	const schema = z.object({
		setId: z.string().min(1),
		reps: z.string().min(1),
	});

	const data = schema.parse({
		setId: formData.get("setId"),
		reps: formData.get("reps"),
	});

	try {
		await sql`
            UPDATE Sets
            SET reps_performed = ${data.reps}
            WHERE set_id = ${data.setId};
        `;

		revalidatePath("/");
		return {
			message: `Added ${data.reps} sets for ${data.setId}`,
		};
	} catch (e) {
		return { message: `Failed to assign date` };
	}
}

// export async function createTodo(
// 	prevState: { message: string; resetKey?: string },
// 	formData: FormData
// ) {
// 	const schema = z.object({
// 		todo: z.string().min(1),
// 	});
// 	const parse = schema.safeParse({
// 		todo: formData.get("todo"),
// 	});

// 	if (!parse.success) {
// 		return { message: "failed to create todo" };
// 	}

// 	const data = parse.data;

// 	try {
// 		await sql`
//         INSERT INTO todos (text)
//         VALUES (${data.todo})
//         `;

// 		revalidatePath("/");
// 		return {
// 			message: `Added todo ${data.todo}`,
// 			resetKey: Date.now().toString(),
// 		};
// 	} catch (e) {
// 		return { message: `Failed to create todo` };
// 	}
// }

// export async function deleteTodo(prevState: any, formData: FormData) {
// 	const schema = z.object({
// 		id: z.string().min(1),
// 		todo: z.string().min(1),
// 	});

// 	const data = schema.parse({
// 		id: formData.get("id"),
// 		todo: formData.get("todo"),
// 	});

// 	try {
// 		await sql`
//             DELETE FROM todos
//             WHERE id = ${data.id};
//         `;

// 		revalidatePath("/");
// 		return { message: `deleted todo ${data.todo}` };
// 	} catch (e) {
// 		return { message: `failed to delete` };
// 	}
// }
