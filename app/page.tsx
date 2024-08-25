import Link from "next/link";
import { sql } from "@vercel/postgres";
import AddForm from "./AddForm";
import DeleteForm from "./DeleteForm";
import CreateRows from "./CreateRows";

export default async function Home() {
	return (
		<main className="flex flex-col px-4 py-8 gap-8">
			<h1>Trainer</h1>
			<Link href="/powerlifting" className="text-fg-default">
				<p className="text-fg-muted">Powerlifting</p>
				Start→
			</Link>
			<Link href="/" className="text-fg-muted">
				<p className="text-fg-muted">Calisthenics</p>
				Coming soon
			</Link>
			{/* <Link href="/new-entry">new entry</Link>
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
			</ul> */}
		</main>
	);
}
