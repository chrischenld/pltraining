import { sql } from "@vercel/postgres";
import AddForm from "./AddForm";
import DeleteForm from "./DeleteForm";
import CreateRows from "./CreateRows";
import Link from "next/link";

export default async function Home() {
	let data = await sql`SELECT * FROM todos`;
	const { rows: todos } = data;

	return (
		<main className="flex flex-col p-16 gap-16">
			<Link href="/new-entry">new entry</Link>
			<h2>home</h2>
			<CreateRows />
			<AddForm />
			<ul>
				{todos.map((todo) => (
					<li
						key={todo.id}
						className="w-full flex flex-row items-center justify-between py-4 border-b border-neutral-800"
					>
						{todo.text}
						<DeleteForm id={todo.id} todo={todo.text} />
					</li>
				))}
			</ul>
		</main>
	);
}
