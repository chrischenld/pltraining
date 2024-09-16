import Link from "next/link";
import { Fragment_Mono } from "next/font/google";
import "@/app/globals.css";

const fragmentMono = Fragment_Mono({
	subsets: ["latin"],
	weight: "400",
	display: "swap",
	variable: "--font-fragment-mono",
});

export default function FormLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<main className="flex flex-col">
			<header className="flex flex-row gap-2 text-fg-disabled">
				<Link href="/">Home</Link>
				<p>/</p>
				<Link href="/powerlifting">PL</Link>
				<p>/</p>
				<p className="text-fg-default">New Cycle</p>
			</header>
			<section className="flex flex-col px-4 py-8 gap-4">{children}</section>
		</main>
	);
}
