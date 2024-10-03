import Link from "next/link";
import { sql } from "@vercel/postgres";

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
		</main>
	);
}
