import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Inter, Fragment_Mono } from "next/font/google";
import Pantasia from "next/font/local";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const fragmentMono = Fragment_Mono({
	subsets: ["latin"],
	weight: "400",
	display: "swap",
	variable: "--font-fragment-mono",
});
const pantasia = Pantasia({
	src: "./fonts/Pantasia-Regular.woff2",
	variable: "--font-pantasia",
});

export const metadata: Metadata = {
	title: "cc.cc",
	description: "design works",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={`${fragmentMono.variable} ${pantasia.variable}`}
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
