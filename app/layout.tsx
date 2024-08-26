import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Fragment_Mono } from "next/font/google";
import "./globals.css";

const fragmentMono = Fragment_Mono({
	subsets: ["latin"],
	weight: "400",
	display: "swap",
	variable: "--font-fragment-mono",
});

export const metadata: Metadata = {
	title: "Trainer",
	description: "Log and programming for training sessions",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={`${fragmentMono.variable} `}
			suppressHydrationWarning
		>
			<body>
				{children}
				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	);
}
