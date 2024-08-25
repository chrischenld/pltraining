import Link from "next/link";
import { Inter, Fragment_Mono } from "next/font/google";
import Pantasia from "next/font/local";
import "@/app/globals.css";

const inter = Inter({ subsets: ["latin"] });
const fragmentMono = Fragment_Mono({
	subsets: ["latin"],
	weight: "400",
	display: "swap",
	variable: "--font-fragment-mono",
});
const pantasia = Pantasia({
	src: "../../fonts/Pantasia-Regular.woff2",
	variable: "--font-pantasia",
});

export default function FormLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<main className="flex flex-col">
			<header>
				<Link href="/powerlifting">Back</Link>
			</header>
			<section className="flex flex-col px-4 py-8 gap-4">{children}</section>
		</main>
	);
}
