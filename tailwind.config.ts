import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		fontSize: {
			xxs: "0.5rem",
			xs: "0.75rem",
			sm: "0.875rem",
			base: "1rem",
			xl: "1.25rem",
			"3.5xl": "2rem",
			"5xl": "3rem",
		},
		borderRadius: {
			xs: "0.0625rem",
		},
		extend: {
			colors: {
				fg: {
					default: "#FAFAFA",
					muted: "#AAA",
					disabled: "#888",
					accent: "#8E60BB",
					success: "#1ab777",
					onStrong: "#222222",
					danger: "#fd7771",
				},
				bg: {
					base: "#222",
					default: "#303030",
					strong: "#FAFAFA",
				},
				border: {
					default: "#414141",
					semibold: "#CCCCCC",
					strong: "#FAFAFA",
				},
				unused: {
					inset: "#232329",
					fg: "#FAFAFA",
					border: "#29292F",
					muted: "#313139",
					accent: "#8E60BB",
				},
			},
			height: {
				"112": "28rem",
				"128": "32rem",
				"136": "34rem",
				"144": "36rem",
			},
			width: {
				"112": "28rem",
				"128": "32rem",
				"136": "34rem",
				"144": "36rem",
			},
			inset: {
				"0.75": "0.1875rem",
			},
			fontFamily: {
				fragmentMono: ["var(--font-fragment-mono)"],
				pantasia: ["var(--font-pantasia)"],
			},
		},
		screens: {
			sm: "300px",
			// => @media (min-width: 640px) { ... }

			md: "496px",
			// => @media (min-width: 768px) { ... }

			lg: "1072px",
			// => @media (min-width: 1024px) { ... }

			xl: "1600px",
			// => @media (min-width: 1280px) { ... }

			// "2xl": "1536px",
			// => @media (min-width: 1536px) { ... }
		},
	},
	plugins: [],
};
export default config;
