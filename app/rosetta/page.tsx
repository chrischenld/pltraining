"use client";

import Image from "next/image";
import Link from "next/link";
import home02 from "@/public/home02.webp";
import rosetta01 from "@/public/rosetta01.png";
import rosetta02 from "@/public/rosetta02.png";
import rosetta03 from "@/public/rosetta03.png";
import rosetta04 from "@/public/rosetta04.png";
import rosetta05 from "@/public/rosetta05.png";
import rosetta06 from "@/public/rosetta06.png";
import rosetta07 from "@/public/rosetta07.png";
import rosetta08 from "@/public/rosetta08.gif";
import rosetta09 from "@/public/rosetta09.png";
import rosetta10 from "@/public/rosetta10.png";
import rosetta11 from "@/public/rosetta11.png";
import rosetta12 from "@/public/rosetta12.png";
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
							href="#pop-ups"
							className={
								activeLink === "pop-ups" ? "text-neutral-300 activeLink" : ""
							}
						>
							pop ups
						</Link>
					</li>
					<li>
						<Link
							href="#pop-ups-context"
							className={
								activeLink === "pop-ups-context"
									? "text-neutral-300 activeLink ml-4"
									: "ml-4"
							}
						>
							context
						</Link>
					</li>
					<li>
						<Link
							href="#pop-ups-analysis"
							className={
								activeLink === "pop-ups-analysis"
									? "text-neutral-300 activeLink ml-4"
									: "ml-4"
							}
						>
							analysis
						</Link>
					</li>
					<li>
						<Link
							href="#pop-ups-rollout"
							className={
								activeLink === "pop-ups-rollout"
									? "text-neutral-300 activeLink ml-4"
									: "ml-4"
							}
						>
							rollout
						</Link>
					</li>
					<li>
						<Link
							href="#pop-ups-impact"
							className={
								activeLink === "pop-ups-impact"
									? "text-neutral-300 activeLink ml-4"
									: "ml-4"
							}
						>
							impact
						</Link>
					</li>
					<li>
						<Link
							href="#text-field"
							className={
								activeLink === "text-field" ? "text-neutral-300 activeLink" : ""
							}
						>
							text field
						</Link>
					</li>
					<li>
						<Link
							href="#text-field-context"
							className={
								activeLink === "text-field-context"
									? "text-neutral-300 activeLink ml-4"
									: "ml-4"
							}
						>
							context
						</Link>
					</li>
					<li>
						<Link
							href="#text-field-design"
							className={
								activeLink === "text-field-design"
									? "text-neutral-300 activeLink ml-4"
									: "ml-4"
							}
						>
							design
						</Link>
					</li>
					<li>
						<Link
							href="#text-field-impact"
							className={
								activeLink === "text-field-impact"
									? "text-neutral-300 activeLink ml-4"
									: "ml-4"
							}
						>
							impact
						</Link>
					</li>
				</ul>
			</div>
			<div className="flex flex-col px-2 md:px-0 gap-6 pt-4 md:pt-32 md:max-w-lg lg:max-w-xl xl:max-w-2xl items-center text-neutral-400 text-sm lowercase">
				<Image
					src={home02}
					alt="Image of Squarespace's text field component overlaid on a background that resembles a blueprint with grids"
					priority={false}
					className="xl:max-w-4xl my-6"
				></Image>
				<h1 className="text-neutral-100">Squarespace Design Platform</h1>
				<p>
					I work on the Design Platform team at Squarespace. We maintain our
					design system (Rosetta), create guidance around its usage, and work on
					system-wide design projects.
				</p>
				<p>
					Before I had even joined the team, Rosetta was already a fully
					&quot;built&quot; design system with its components, being used by a
					large majority of product teams.
				</p>
				<div className="flex flex-col gap-3 mb-6 mt-6">
					<Image
						src={rosetta01}
						alt="A screenshot of our design system doc site"
						priority={false}
						className="xl:max-w-2xl mb-0"
					></Image>
					<p className="text-xs text-neutral-500 w-full text-left">
						Our (internal) design system docsite that hosts our guidance around
						components.
					</p>
				</div>
				<p>
					The main challenges my team and I face are less about building the
					system or increasing adoption but the nebulous next phase:
				</p>
				<ul className="flex flex-col list-disc gap-2">
					<li>
						create system improvements and pattern guidance to facilitate
						effective, accessible, and cohesive designs across product surfaces
					</li>
					<li>
						drive large-scale, cross-team improvements to the core experience
					</li>
				</ul>
				<p className="w-full">
					Here are two bite-sized examples that best highlight these challenges:
				</p>
				<hr></hr>
				<h2 id="pop-ups">pop ups</h2>
				<h3 id="pop-ups-context">Context</h3>
				<p>
					Over the years, Squarespace has widened its feature set for a whole
					range of different users and sellers. An unintended consequence of
					this growth is the build-up and reliance on modals to convey different
					messages.
				</p>
				<p>
					User research presented this incredibly frustrating UX when going
					through countless real recordings of users trying to onboard but
					getting disrupted by modal after modal. Even worse, many of these
					modals contained valuable content that only appeared there. That meant
					when annoyed users onboarded and immediately clicked through modals,
					they were locked out of information forever.
				</p>
				<div className="flex flex-col gap-3 mb-6 mt-6">
					<Image
						src={rosetta02}
						alt="A screenshot that is chaotically filled with different interfaces from the Squarespace product, each one depicting a pop up that has interrupted a user flow"
						priority={false}
						className="xl:max-w-2xl mb-0"
					></Image>
					<p className="text-xs text-neutral-500 w-full text-left">
						Just some of the disruptive pop ups that were degrading the core UX
						of the product.
					</p>
				</div>
				<p>
					I worked alongside Staff UX Content Strategist Laurah Mwirichia,
					Senior UX Research Manager Sudy Majd, and Staff Product Analyst Rob
					Bertorelli to untangle and solve this issue.
				</p>
				<h3 id="pop-ups-analysis">Analysis</h3>
				<p>
					First, we needed to account for everything we had. I audited the
					product for every modal we could find. With all of them collected, my
					teammate Laurah and I classified them based on factors like type,
					purpose, and content.
				</p>
				<Image
					src={rosetta03}
					alt="A screenshot from FigJam, with the canvas full of screenshots of pop ups, with sticky notes classifying them, overlaid on each"
					priority={false}
					className="xl:max-w-2xl mb-0"
				></Image>
				<p>
					With these classifications, Laurah mapped these pop ups into distinct
					categories.
				</p>
				<p>
					As one of Rosetta&apos;s designers, I provided a UI perspective into
					what kinds of messaging necessitated a modal - a disruptive design
					pattern.
				</p>
				<Image
					src={rosetta04}
					alt="A diagram with a horizontal line with two arrows on each end of the line: the left side of the line is labeled 'less disruptive' and the right side is labeled as 'more disruptive.' A list of different UI elements from our design system are listed. Modals are on the right."
					priority={false}
					className="xl:max-w-2xl mb-0"
				></Image>
				<p>
					At the same time, we had our UXR and Product Analytics teammates
					verify whether there was substantive proof that these surfaces made
					any to key metrics.
				</p>
				<p>
					We pulled all of our work together to determine the final mapping of
					modals throughout the product. Based on this map, we formed a final
					set of Keep, Edit, and Cut recommendations.
				</p>
				<h3 id="pop-ups-rollout">Rollout and implementation</h3>
				<p>
					We communicated our findings to product owners and our
					recommendations. We followed up with suggested alternative patterns
					that designers could use instead to communicate their messages.
				</p>
				<Image
					src={rosetta05}
					alt="Screenshot of a Reveal component, a UI component that expands or collapses content. Next to it, there's a description on what it can be used for."
					priority={false}
					className="xl:max-w-2xl mb-0"
				></Image>
				<p>
					As one of Rosetta&apos;s maintainers, I knew this was a failure of
					design guidance on our part. And while the steps above addressed the
					current issues, we had to make sure this wouldn&apos;t keep occurring.
				</p>
				<Image
					src={rosetta06}
					alt="Image labeled 'Should I use a pop' followed a quadrant to the right that acts as a 2x2 decision making matrix. Columns, left to right: 'Setup' and 'Data Collection'; Rows, top to bottom: 'Education' and 'Task.' Quadrants labeled clockwise, starting from top left: No, Yes, Maybe, Maybe"
					priority={false}
					className="xl:max-w-2xl mb-0"
				></Image>
				<p>
					We created a playbook, a durable set of guidance, around when and when
					not to use modals in the product. As part of this, I designed net new
					components and new variants to existing components to give more
					expressive capabilities to designers facing these challenges. These
					came with updating our existing documentation on our internal design
					system documentation site.
				</p>
				<Image
					src={rosetta07}
					alt="The same disruptive scale as depicted above, this time titled with 'Setup' above it. Some UI options are highlighted, indicating they should be used for this type of task"
					priority={false}
					className="xl:max-w-2xl mb-0"
				></Image>
				<h3 id="pop-ups-impact">Impact</h3>
				<p>
					We had tackled a known area of concern flagged by user research but
					had seemed daunting in its scale and ambiguity.
				</p>
				<p>
					In the end, our cross-disciplinary team cut 57% of pop ups occuring in
					the product. This improved the current UX, reducing the amount of
					disruption through the product, especially during critical onboarding
					stages, and placed that content into more retrievable surfaces.
				</p>
				<p>
					At the same time, our new guidance helped pave the road for a better
					design future where designers could be empowered to design with more
					options, without having to rely on modals as a crutch.
				</p>
				<h2 id="text-field">Text Field</h2>
				<h3 id="text-field-context">Context</h3>
				<p>
					The existing Text Input component had been built in a previous
					iteration of our design system and failed many of our a11y standards.
				</p>
				<div className="flex flex-col gap-3 mb-6 mt-6">
					<Image
						src={rosetta08}
						alt="Screen recording with the screen reader turned on, showing an suboptimal experience"
						priority={false}
						className="xl:max-w-2xl mb-0"
					></Image>
					<p className="text-xs text-neutral-500 w-full text-left">
						Our &quot;charming&quot; existing Text Input component with poor
						accessibility.
					</p>
				</div>
				<p>
					We felt the design/engineering debt here, as we couldn&apos;t update
					the component in place - it was such a fundamental change that it
					would break too many of our consumers&apos; implementation of the
					component.
				</p>
				<p>
					I worked with teammates and engineers Karl Rodulfo and Siddhanth Patel
					to create a new and improved Text Field component.
				</p>
				<h3 id="text-field-design">Design and rollout</h3>
				<p>
					From the very start, we weren&apos;t trying to reinvent the wheel. We
					wanted it to look almost entirely the same as the existing component,
					with several differences to meet the highest levels of accessibility:
				</p>
				<ul className="flex flex-col list-disc gap-2">
					<li>2px focus state borders</li>
					<li>Support full keyboard navigation</li>
					<li>Better communicate errors</li>
					<li>No placeholder text by default</li>
					<li>Required label (no placeholder as a label)</li>
					<li>Compliant contrast on any product surface</li>
				</ul>
				<Image
					src={rosetta09}
					alt="A handoff spec for the new Text Field component, detailing specific props and visual styling"
					priority={false}
					className="xl:max-w-2xl mb-0"
				></Image>
				<p>
					At the same time, we took small but measured design choices toward
					better patterns, like setting the new default to the encapsulated form
					of the component or moving the error below the field. These small
					shifts helped &quot;automatically opt-in&quot; users to best patterns
					within the API.
				</p>
				<Image
					src={rosetta11}
					alt="Another handoff spec, this time with labels pointing towards different props on the component"
					priority={false}
					className="xl:max-w-2xl mb-0"
				></Image>
				<p>
					Along with the updated component, we also prepared updated docs and
					Figma related resources. This was critical for understanding the API
					and best guidance around the use of the field.
				</p>
				<Image
					src={rosetta10}
					alt="A screenshot of the component page of Text Field on our docsite, focused on the guidance section"
					priority={false}
					className="xl:max-w-2xl mb-0"
				></Image>
				<p>
					We rolled out to consumers and product partners, including an
					internationalization team working to bring localized address forms.
				</p>
				<h3 id="text-field-impact">Impact</h3>
				<p>
					This was a significant win for accessibility for our product. An a11y
					team member estimated that if a product team were to simply use Text
					Field &quot;out of the box&quot; vs. our existing component, there
					would be an 11% reduction in total a11y issues across the entire flow.
				</p>
				<Image
					src={rosetta12}
					alt="Screenshot of a Slack message: Hi Design Platform! I'd like to share a piece of encouraging feedback with you. As you probably know,
					I did an audit of the [redacted] flows recently, and after analyzing the results, I realized that if the new Text Field component had been 
					available to the team building those UIs, there would likely have been ≈ 11% less issues (7 issues out of 65 would likely have been prevented
					by using Text Field over the old way of composing text inputs). So extrapolating these results, Text Field alone is likely to have a major positive
					impact on the accessibility of our products. Thanks for the great work!"
					priority={false}
					className="xl:max-w-2xl mb-0"
				></Image>
				<p>
					This major improvement in accessibility has cemented similar
					improvements across other legacy/inaccessible input components in the
					coming months.
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
