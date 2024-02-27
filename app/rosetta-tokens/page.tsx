"use client";

import Image from "next/image";
import Link from "next/link";
import home01 from "@/public/home01.webp";
import tokens01 from "@/public/tokens01.png";
import tokens02 from "@/public/tokens02.png";
import tokens03 from "@/public/tokens03.png";
import tokens04 from "@/public/tokens04.gif";
import tokens05 from "@/public/tokens05.png";
import tokens06 from "@/public/tokens06.png";
import tokens07 from "@/public/tokens07.gif";
import tokens08 from "@/public/tokens08.png";
import tokens09 from "@/public/tokens09.png";
import tokens10 from "@/public/tokens10.png";
import tokens11 from "@/public/tokens11.png";
import { useEffect, useState, useRef } from "react";

function useHighlighted() {
	const observer = useRef<IntersectionObserver | null>();
	const [activeId, setActiveId] = useState<string>("");

	useEffect(() => {
		const handleObserver = (sections: IntersectionObserverEntry[]) => {
			sections.forEach((section) => {
				if (section.isIntersecting) {
					setActiveId(section.target.id);
				}
			});
		};

		observer.current = new IntersectionObserver(handleObserver, {
			rootMargin: "0% 0% -45% 0px",
		});

		const headings = document.querySelectorAll("h1, h2, h3, h4");
		headings.forEach((heading) => {
			if (observer.current) {
				observer.current.observe(heading);
			}
		});

		return () => {
			if (observer.current) {
				observer.current.disconnect();
			}
		};
	}, []);

	return activeId;
}

export default function Home() {
	const activeLink = useHighlighted();

	return (
		<main className="flex flex-col md:p-0 gap-4 min-h-screen items-center">
			<p className="w-full p-2 md:p-0 md:absolute lg:fixed md:left-6 md:top-0.75 text-neutral-600 hover:text-neutral-400 name">
				<Link href="/">chris chen</Link>
			</p>
			<div className="md:fixed hidden lg:block min-w-16 inset-y-32 lg:right-12 text-xs text-neutral-600">
				<ul className="flex flex-col gap-1">
					<li>
						<Link
							href="#background"
							className={
								activeLink === "background" ? "text-neutral-300 activeLink" : ""
							}
						>
							background
						</Link>
					</li>
					<li>
						<Link
							href="#research"
							className={
								activeLink === "research" ? "text-neutral-300 activeLink" : ""
							}
						>
							research
						</Link>
					</li>
					<li>
						<Link
							href="#creating-the-colors"
							className={
								activeLink === "creating-the-colors"
									? "text-neutral-300 activeLink"
									: ""
							}
						>
							creating the colors
						</Link>
					</li>
					<li>
						<Link
							href="#testing-and-feedback"
							className={
								activeLink === "testing-and-feedback"
									? "text-neutral-300 activeLink"
									: ""
							}
						>
							testing and feedback
						</Link>
					</li>
					<li>
						<Link
							href="#final-design"
							className={
								activeLink === "final-design"
									? "text-neutral-300 activeLink"
									: ""
							}
						>
							final design
						</Link>
					</li>
					<li>
						<Link
							href="#retrospective"
							className={
								activeLink === "retrospective"
									? "text-neutral-300 activeLink"
									: ""
							}
						>
							retrospective
						</Link>
					</li>
				</ul>
			</div>
			<div className="flex flex-col gap-6 px-2 md:px-0 pt-4 md:pt-32 md:max-w-lg lg:max-w-xl xl:max-w-2xl items-center text-neutral-400 text-sm lowercase">
				<Image
					src={home01}
					alt="Two images showing the light and dark theme full color palettes for Squarespace's design system"
					priority={false}
					className="xl:max-w-4xl my-6"
				></Image>
				<h1 className="text-neutral-100">Squarespace Color Tokens</h1>
				<p>
					Squarespace has grown from being just a website builder into a
					platform to sell anything. But the existing colors from our design
					system, Rosetta, didn&apos;t support new patterns and features.
				</p>
				<p>
					I led the design of the new and current color token system for
					Rosetta, SQSP&apos;s design system.
				</p>
				<p>
					My engineering partner Faustine Pollet worked on implementation.
					Teammates on Design Platform provided critical feedback to ship this
					project, including my design manager John Meguerian and staff designer
					John Voss.
				</p>
				<h2 id="background">Background</h2>
				<p>
					Historically, when SQSP just built websites, the design language
					leaned on a monochromatic palette and dull colors. This shifted focus
					away from the app chrome and onto user websites and content.
				</p>
				<div className="flex flex-col gap-3 mb-6 mt-6">
					<Image
						src={tokens01}
						alt="A side-by-side of Squarespace's drag-and-drop smart guides around a user image, the one on the left using the old color tokens, the one on the right using the new color tokens. The one on the right stands out more against the user's image"
						priority={false}
						className="xl:max-w-2xl mb-0"
					></Image>
					<p className="text-xs text-neutral-500 w-full text-left">
						(Left) the existing color tokens being used as a smart guide, but
						gets lost in different user content. (Right) New, one-off color
						exploration for a brighter color that better fits UI usage.
					</p>
				</div>
				<p>
					However, new features and patterns in the product like Fluid Engine
					(drag and drop editor) and data-heavy interfaces like payments,
					campaigns, and invoicing required &quot;bright&quot; colors that stand
					out from user-generated content.
				</p>
				<p>
					Product partners requested &quot;bright&quot; colors but these updates
					risked disrupting the existing color system. This resulted in one-off
					color assignments, which degraded the utility of Rosetta.
				</p>
				<div className="flex flex-col gap-3 mb-6 mt-6">
					<Image
						src={tokens02}
						alt="A side-by-side of two color palettes, red, green, blue, orange, and pink color ramps. The right one has only adjusted the blue ramp, and it doesn't visually match the rest of the palette"
						priority={false}
						className="xl:max-w-2xl"
					></Image>
					<p className="text-xs text-neutral-500 w-full text-left">
						(Left) Existing color ramps (Right) Tweaking just individual color
						ramps to satisfy consumer requests would disrupt the larger system.
					</p>
				</div>
				<p>
					As we started to investigate the problem, we started to think about
					better design futures and raising the bar, beyond just changing color
					values:
				</p>
				<ul className="flex flex-col list-disc gap-2">
					<li>
						how could we use semantic naming to make color use more intuitive?
					</li>
					<li>how do we make a cohesive scale of colors?</li>
					<li>how could we improve consumer workflows?</li>
				</ul>
				<h2 id="research">Research</h2>
				<p>
					First, we audited different design systems - in particular, we were
					interested in how teams handled semantic naming for clear
					communication and ease of use for designers and engineers. From this,
					we learned schemas that primarily grouped around the type of UI
					element that would have color applied to it.
				</p>
				<p>
					Next, we researched human perception of colors and perceptually
					uniform color spaces to systemically compose our color ramps. Through
					this, we learned using LCH (and OKLCH) would minimize perceived
					brightness differences but preserve contrast when adjusting hue.
				</p>
				<Image
					src={tokens03}
					alt="Not perceptually uniform: RGB, HSL. Perceptually uniform: LCH"
					priority={false}
					className="xl:max-w-2xl mb-6 mt-6"
				></Image>
				<p>
					Finally, we examined our designers and engineers&apos; workflows and
					how they used colors. We did a lit review of old dusty files from past
					design system teammates. We knew we had to meet designers where they
					were to reduce confusion with the new color rollouts as we were
					directly affecting their workflows.
				</p>
				<h2 id="creating-the-colors">Creating the colors</h2>
				<p>
					When creating colors, contrast targets were our foundation and primary
					constraints for creating colors. We complied with our a11y team and
					WCAG&apos;s specs.
				</p>
				<p>
					We started with grays. We knew we had some locked-in colors because of
					their prominent roles in the product as the primary brand color. From
					there, we could start to fill in the ramp.
				</p>
				<Image
					src={tokens04}
					alt="Animated GIF showing the gray ramp being 'filled in' by a couple of values at a time"
					priority={false}
					className="xl:max-w-2xl mb-6 mt-6"
				></Image>
				<p>
					Steps on the ramp were based on both contrast against our lightest
					background, but also relative contrast against other steps on the
					ramp. This coincided with the designation of certain stops for select
					types of UI elements.
				</p>
				<p>
					Color ramps were handled slightly differently. With fewer constraints,
					we could increase the apparent &quot;brightness&quot; of our colors to
					meet designer needs. Again, we start with critical UI roles (text,
					backgrounds, borders) and use the same stops to fit color contrast
					needs.
				</p>
				<Image
					src={tokens05}
					alt="A very small, zoomed-out spec of all of the colors and color roles"
					priority={false}
					className="xl:max-w-2xl mb-6 mt-6"
				></Image>
				<p>
					We also added more colors beyond the main semantic colors for data
					visualization (charts in analytics) or differentiation (different
					colored Chips). This helped build for the future, giving us more
					colors knowing there were always possibilities for novel color uses.
				</p>
				<p>
					Even in the old color system, we supported a dark theme, though it has
					few uses in the product. We lowered the Lightness of colors, as they
					led to halation and visual fatigue. But we still maintained our
					highest levels of accessibility.
				</p>
				<Image
					src={tokens11}
					alt="Light and dark theme palettes, completed"
					priority={false}
					className="xl:max-w-2xl mb-6 mt-6"
				></Image>
				<p>
					Next was rigorously testing these colors against existing and future
					designs to ensure colors met every need. Prototyping helped me
					maintain sanity and move forward, as colors didn&apos;t have as much
					of a definitive &quot;correct&quot; design solution.
				</p>
				<Image
					src={tokens07}
					alt="Animated GIF of colored UI elements and surfaces getting overlaid on top of each other chaotically and rotated askew"
					priority={false}
					className="xl:max-w-2xl mb-6 mt-6"
				></Image>
				<p>
					We explored different naming schemas to find one that best sorted and
					implied their intended use. We knew these tokens would be critical if
					we wanted to prioritize maintainability, future-proofing, and quick
					adoption. This included prototyping Figma styles to best fit within
					designer workflows. (Unfortunately, we released our new colors about a
					month before the variable feature release in Figma, which we later got
					back and adopted.)
				</p>
				<Image
					src={tokens06}
					alt="A diagram showing the possible values from the naming schema for color tokens. Each slot in the schema is labeled: Role, Sentiment, Prominence"
					priority={false}
					className="xl:max-w-2xl mb-6 mt-6"
				></Image>
				<h2 id="testing-and-feedback">Testing and feedback</h2>
				<p>
					As part of the rollout, we updated our documentation on colors and
					usage guidelines. We then tested our system with a Beta flag for
					engineers and designers.
				</p>
				<Image
					src={tokens08}
					alt="Image of the Beta that was shown to designers"
					priority={false}
					className="xl:max-w-2xl mb-6 mt-6"
				></Image>
				<p>
					We asked consumers to review the updated documentation, use the colors
					in their explorations or new projects, and gave them a few weeks to
					test out the system. At the end of the Beta, we asked consumers to
					fill out a form that asked:
				</p>
				<ol className="flex flex-col list-decimal gap-2">
					<li>how does using this system feel vs the previous system?</li>
					<li>are the documentation and usage guidelines clear?</li>
					<li>was the organization of color in Figma or in code?</li>
					<li>
						would these colors meet the needs of upcoming and future designs
					</li>
				</ol>
				<p>
					Based on feedback, we created more guidance on the use of color on
					certain system messaging components and where to use the new expanded
					colors.
				</p>
				<Image
					src={tokens09}
					alt="Screenshot of the color documentation found on our docsite"
					priority={false}
					className="xl:max-w-2xl mb-6 mt-6"
				></Image>
				<h2 id="final-design">Final design</h2>
				<p>
					We ultimately ended up shipping this project in early 2023 as a major
					version bump. These color tokens are now in use across major SQSP
					surfaces for all of our consumers.
				</p>
				<Image
					src={tokens10}
					alt="Positive comments left by consumers regarding the release of the new colors"
					priority={false}
					className="xl:max-w-2xl mb-6 mt-6"
				></Image>
				<p>
					We received positive feedback from designers and engineers alike,
					supporting more expressive features and design patterns as SQSP
					continues to grow in depth and complexity of its offerings.
				</p>
				<h2 id="retrospective">Retrospective</h2>
				<p>
					This was far from the perfect rollout. I learned a lot about the value
					of communication, documentation and guidance, partnerships with our
					consumers, and adjusting for consumer workflows. These are critical
					steps I take, as half the challenge of any impactful release for
					platform teams is the release planning and communication.
				</p>
				<p>
					As for this project, we&apos;ve continued to monitor responses from
					consumers around color. We get a few technical questions, but still
					receive some around the usage of color.
				</p>
				<p>
					Several months after our initial release, our initial bets on building
					for the future seem to have paid off, as new work from designers
					further utilizes the framework of color we&apos;ve provided.
				</p>
			</div>
			<footer className="pb-56 w-full md:max-w-lg lg:max-w-xl xl:max-w-2xl ">
				<p>
					<Link href="/" className="w-full hover:underline">
						← back
					</Link>
				</p>
			</footer>
		</main>
	);
}
