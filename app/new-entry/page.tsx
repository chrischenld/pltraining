import { sql } from "@vercel/postgres";
import CreateRows from "../CreateRows";
import Link from "next/link";
import SetRepsPerformedForm from "../SetRepsPerformedForm";

export default async function Home() {
	let data = await sql`SELECT *
        FROM Sets
        WHERE date IS NULL
        ORDER BY set_id
        LIMIT 5
        OFFSET 0;`;
	const { rows: Sets } = data;

	return (
		<main className="flex flex-col p-16 gap-16">
			<Link href="/">home</Link>
			<h2>new entry</h2>
			<ul>
				{Sets.map((set) => (
					<li
						key={set.set_id}
						className="w-full flex flex-row items-center justify-between py-4 border-b border-neutral-800"
					>
						SET ID: {set.set_id}, LIFT: {set.lift_type}, REPS_PERFORMED:{" "}
						{set.reps_performed}
						<SetRepsPerformedForm setId={set.set_id} />
					</li>
				))}
			</ul>
			<CreateRows />
		</main>
	);
}
