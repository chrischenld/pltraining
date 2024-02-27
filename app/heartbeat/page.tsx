"use client";

import Image from "next/image";
import Link from "next/link";
import heartbeat01 from "@/public/heartbeat01.webp";
import heartbeat02 from "@/public/heartbeat02.gif";
import heartbeat03 from "@/public/heartbeat03.gif";
import heartbeat04 from "@/public/heartbeat04.webp";
import heartbeat05 from "@/public/heartbeat05.webp";
import heartbeat06 from "@/public/heartbeat06.webp";
import heartbeat07 from "@/public/heartbeat07.webp";
import home04 from "@/public/home04.webp";
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
							href="#what-is-heartbeat"
							className={
								activeLink === "what-is-heartbeat"
									? "text-neutral-300 activeLink"
									: ""
							}
						>
							what is heartbeat
						</Link>
					</li>
					<li>
						<Link
							href="#results"
							className={
								activeLink === "results" ? "text-neutral-300 activeLink" : ""
							}
						>
							results
						</Link>
					</li>
					<li>
						<Link
							href="#constraints"
							className={
								activeLink === "constraints"
									? "text-neutral-300 activeLink"
									: ""
							}
						>
							constraints
						</Link>
					</li>
					<li>
						<Link
							href="#challenges"
							className={
								activeLink === "challenges" ? "text-neutral-300 activeLink" : ""
							}
						>
							challenges
						</Link>
					</li>
					<li>
						<Link
							href="#documentation"
							className={
								activeLink === "documentation"
									? "text-neutral-300 activeLink"
									: ""
							}
						>
							documentation
						</Link>
					</li>
					<li>
						<Link
							href="#doc"
							className={
								activeLink === "doc" ? "text-neutral-300 activeLink" : ""
							}
						>
							figma complexity
						</Link>
					</li>
					<li>
						<Link
							href="#primitives"
							className={
								activeLink === "primitives" ? "text-neutral-300 activeLink" : ""
							}
						>
							primitives
						</Link>
					</li>
					<li>
						<Link
							href="#top-level-components"
							className={
								activeLink === "top-level-components"
									? "text-neutral-300 activeLink"
									: ""
							}
						>
							top level components
						</Link>
					</li>
					<li>
						<Link
							href="#subcomponents"
							className={
								activeLink === "subcomponents"
									? "text-neutral-300 activeLink"
									: ""
							}
						>
							subcomponents
						</Link>
					</li>
					<li>
						<Link
							href="#takeaway"
							className={
								activeLink === "takeaway" ? "text-neutral-300 activeLink" : ""
							}
						>
							takeaway
						</Link>
					</li>
				</ul>
			</div>
			<div className="flex flex-col gap-6 px-2 md:px-0 pt-4 md:pt-32 md:max-w-lg lg:max-w-xl xl:max-w-2xl items-center text-neutral-400 text-sm lowercase">
				<Image
					src={home04}
					alt="Sequence of many of the UI components used within Heartbeat"
					priority={false}
					className="xl:max-w-4xl my-6"
				></Image>
				<h1 className="text-neutral-100">heartbeat</h1>
				<h2 id="what-is-heartbeat">what is heartbeat?</h2>
				<p>
					Creators are often overwhelmed with starting and maintaining engaged
					communities for their cohort-based courses, hobby groups, or other
					online spaces.
				</p>
				<p>
					Heartbeat gives creators the tools to easily run personalized,
					monetized communities with conversations, events, and content.
				</p>
				<p>
					As the founding designer, I handled everything design. Heartbeat
					co-founder, Mayhul Arora, handles the engineering. The resulting
					component library is a result of our interwoven efforts.
				</p>
				<p>
					This was also a personal labor of love bringing Heartbeat closer to a
					systematic way of handling design.
				</p>
				<h2 id="results">results</h2>
				<p>
					Our component library enabled us to ship features and requests with
					speed and accuracy. These features ranged from hosting full courses to
					handling payments, all the way to creating and hosting events -
					everything budding community admins needed to get a community running,
					engaged, and monetized.
				</p>
				<Image
					src={heartbeat01}
					alt="A grid showcasing a list of all the features we shipped at Heartbeat. The full list: re-designed desktop experience, payments, mobile app, courses, groups, events, search, community customization, video calls, weekly digests, embeds, analytics, kickstart (onboarding), custom domains, upsells, invitations, chats, polls."
					priority={false}
					className="my-6"
				></Image>
				<p>
					These ultimately contributed to our company&apos;s growth by growing
					our community count by 40x and facilitating community payments.
				</p>
				<h2 id="constraints">constraints</h2>
				<p>
					Two foundational constraints shaped the look and feel of our design
					system: personalization and friendliness.
				</p>
				<p>
					Heartbeat aims to be a fully user-customized platform, with custom
					domains, branding, and colors. Primitives are often color agnostic and
					lack an opinionated Heartbeat branding, instead opting to emphasize
					each community&apos;s branding.
				</p>
				<Image
					src={heartbeat02}
					alt="Sequence of many of the UI components used within Heartbeat"
					priority={false}
					className="my-6"
				></Image>
				<p>
					Both community admins and their members prefer friendliness and ease
					of use over information density - as a result, our components are
					generally larger and rounder.
				</p>
				<h2 id="challenges">Challenges</h2>
				<p>
					A problem we faced early on was users getting confused with all the
					different tools and their own slightly different design patterns. Each
					section of our all-in-one product had different interaction and
					navigation patterns. This problem was only exacerbated by more
					disparate patterns on mobile.
				</p>
				<Image
					src={heartbeat03}
					alt="A sequence of the different navigation sidebars across product areas and device sizes"
					priority={false}
					className="my-6"
				></Image>
				<p>
					The component library standardized our different product sections.
					these included primitives themselves as well as patterns when creating
					entities like events, docs, or threads. The introduction of new embed
					components also helped users flow from one section of the product to
					another seamlessly.
				</p>
				<Image
					src={heartbeat04}
					alt="Showing the Heartbeat UI of the embed card across desktop and mobile"
					priority={false}
					className="my-6"
				></Image>
				<h2 id="documentation">Documentation</h2>
				<p>
					From pretty early on, I was interested in a written design history of
					an evolving system. I was learning a lot - mostly through failures,
					and it felt really important to record how I was changing how I
					thought about our design system.
				</p>
				<p>
					Below is an adapted internal doc written in early 2022, talking about
					strategies for how granular we get with components and their
					associated variants in Figma.
				</p>
				<h2 id="doc">avoiding figma complexity</h2>
				<p>
					In the process of building our component library, I&apos;ve found
					overly complex components and variants take more time to maintain and
					use. In time, these components stop being used and fall out of
					maintenance. This doc lists some general rules to avoid this situation
					to create tidy, efficient, and easy-to-maintain components.
				</p>
				<p>
					Before we even talk about the components themselves, it&apos;s
					important to note how components get used in figma (as opposed to how
					they might be used and configured in code.) I find figma is most
					efficient in a “top-down” style. Assuming you already have pre-made
					components, this means you generally configure from parent layers
					downwards until you get to the lowest layer objects. This is for
					several reasons:
				</p>
				<ol className="flex flex-col gap-4 list-decimal">
					<li>
						it&apos;s generally easier to select and manage parent layers than
						child layers
					</li>
					<li>
						lack of visibility into nested subcomponents and all their
						states/variants
					</li>
					<li>designers are more inclined to think this way</li>
				</ol>
				<p>
					Consider a standard workflow (given that you&apos;re using pre-made
					components): you insert a larger component, swap variants on the
					component, change variants on subcomponents to properly convey state,
					then modify text. I personally conceptualize this as three types of
					components:
				</p>
				<h2 id="primitives">primitives</h2>
				<p>
					Component primitives are the smallest atoms of our library and are
					essential for scaling updates and attaching interactions. examples of
					primitives, like buttons, input fields, or tags.
				</p>
				<Image
					src={heartbeat05}
					alt="Screen capture shows a pointer icon selects interacts and selects filters without any search terms being entered in through the keyboard, demonstrating the use of the search feature with only a mouse"
					priority={false}
					className="my-6"
				></Image>
				<p>
					while we generally want to avoid excessive variants on any component,
					it&apos;s better to do it on increasingly lower levels. this is
					because efficiently built higher-level components (collections of
					primitive components) use correct variant instances of primitives,
					capturing the majority of possible component states in a batched
					format.
				</p>
				<p>
					as primitives sit at the lowest levels, variant/property messes are
					mostly obscured in the actual use of the component. see our dropdown
					component: all of our variant complexity is baked within the dropdown
					item level, not the dropdown itself. this also makes prototype
					interactions much simpler to implement.
				</p>
				<h2 id="top-level-components">Top level components</h2>
				<p>
					Top level components are collections of larger subcomponents, like the
					thread component or the lesson component.
				</p>
				<Image
					src={heartbeat06}
					alt="Screen capture shows a user using search using keystrokes, with their keystrokes appearing with each key press"
					priority={false}
					className="my-6"
				></Image>
				<p>
					I generally try to be pretty sparse with variants here on this high of
					a level. it&apos;s generally pretty handy to have a couple of toggles,
					but try to avoid handling all component states on this high of a
					level.
				</p>
				<h2 id="subcomponents">Subcomponents</h2>
				<p>
					subcomponents are really useful because they allow for a simplistic
					variant structure at our top level component, while all possible
					states a component can be captured by subcomponents that are exactly
					one level under.
				</p>
				<Image
					src={heartbeat07}
					alt="A component that is overly complicated with intermediary components between the top level component and the atomic units below them"
					priority={false}
					className="my-6"
				></Image>
				<p>
					however, when we nest even further subcomponents into those, we may be
					causing ourselves more harm. see above for an example. the resulting
					nesting structure looks like lesson → assignment → submission, which
					leads to over-complication.
				</p>
				<p>
					it becomes confusing to figure out where the variant or state controls
					for a subcomponent are stored if there are multiple levels of control
					to a single one. this also makes updating subcomponents more
					complicated in the case of specific state changes.
				</p>
				<h2 id="takeaway">takeaway</h2>
				<p>
					set up your variants to be fully encompassing at the primitives level,
					then take care of component-specific states at the highest or
					second-highest levels. if you focus on these two first, you
					shouldn&apos;t need to create further subcomponents. the resulting
					components created should be cleaner, more understandable, more
					usable, and easier to maintain.
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
