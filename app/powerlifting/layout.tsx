import Link from "next/link";
import { Fragment_Mono } from "next/font/google";
import "@/app/globals.css";
import { Metadata } from "next";
import Breadcrumb from "@/app/components/compositions/Breadcrumb";

const fragmentMono = Fragment_Mono({
	subsets: ["latin"],
	weight: "400",
	display: "swap",
	variable: "--font-fragment-mono",
});

export const metadata: Metadata = {
	title: "Powerlifting",
	description: "Powerlifting section",
};

export default function PageLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<main>
			<Breadcrumb />
			<div className="GridLayout">{children}</div>
		</main>
	);
}
