import Link from "next/link";

export default async function Page() {
	return (
		<main className="flex flex-col px-4 py-8 gap-8">
			<h2>Powerlifting</h2>
			<Link href="/powerlifting/new-session">New session</Link>
		</main>
	);
}
