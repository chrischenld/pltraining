"use client";

import Image from "next/image";
import Link from "next/link";
import this01 from "@/public/this01.png";
import this02 from "@/public/this02.jpg";
import this03 from "@/public/this03.png";
import this04 from "@/public/this04.png";
import this05 from "@/public/this05.gif";
import this06 from "@/public/this06.gif";

export default function Home() {
	return (
		<main className="flex flex-col md:p-0 gap-4 min-h-screen items-center">
			<p className="w-full p-2 md:p-0 md:absolute lg:fixed md:left-6 md:top-0.75 text-neutral-600 hover:text-neutral-400 name">
				<Link href="/">chris chen</Link>
			</p>
			<div className="flex flex-col px-2 md:px-0 gap-6 pt-4 md:pt-32 md:max-w-lg lg:max-w-xl xl:max-w-2xl items-center text-neutral-400 text-sm lowercase">
				<h1 className="text-neutral-100">building this</h1>
				<p>
					hi! this is a little write-up while it&apos;s still fresh in my head
					about my foray into frontend, the implications of it as a designer,
					and all the fun and pain it was to get this deployed.
				</p>
				<div className="flex flex-col gap-3 mb-6 mt-6">
					<Image
						src={this01}
						alt="Vercel's dashboard. Notifications button is open and all of them are errors. Failed to deploy in the
                        Production environment."
						priority={false}
						className="xl:max-w-2xl mb-0"
					></Image>
					<p className="text-xs text-neutral-500 w-full text-left">
						expectations vs. reality
					</p>
				</div>
				<p>
					there&apos;s never been a more (ahem) interesting time as a designer
					learning frontend (this is not *that* discussion, i promise).
					we&apos;re in a limbo between today&apos;s incredible, but limited
					tools and the coming soon™ inevitable tomorrow where AI removes the
					technical barriers between design intent and execution.
				</p>
				<p>
					tools like framer and webflow are just so good, but fall distinctly
					within the domain of design tooling. even beyond this, i&apos;ve
					always appreciated when designers approach the design of software,
					with personal control, intentionality and, for lack of a better word,
					sincerity.
				</p>
				<p>
					growing up, software was most of my experience around design - if not
					a most of my experience of the world. the keyboard and mouse always
					felt more like an extension of me than anything else. i didn&apos;t
					know what good design looked like in cars, shoes, anything really -
					but i did know what it looked like in software. consquently, my
					journey into software design wasn&apos;t rooted in art or graphic
					design - that came after. i was always just interested in the design
					of something that was so core to my experience of the world.
				</p>
				<div className="flex flex-col gap-3 mb-6 mt-6">
					<Image
						src={this02}
						alt="The main menu from the 1998 game, Starcraft, which I played too much of growing up"
						priority={false}
						className="xl:max-w-2xl mb-0"
					></Image>
					<p className="text-xs text-neutral-500 w-full text-left">
						i spent many hours on this game in my childhood. i think about this
						UI a lot today.
					</p>
				</div>
				<p>
					because it was so special to me, i always had a soft spot for the
					craft of software and everything online. and not just what designers
					mean by craft regarding whatever hot new app launched. but craft like,
					a hand spun mug. and the difference between spinning your own
					imperfect mug and handing it to someone, rather than handing them a
					&quot;more flawless,&quot; mass produced mug. there is something nice
					to doing the challenging bits from start to finish, but also doing it
					your way, with full control.
				</p>
				<p>
					i&apos;ve always been interested in the design of tools but also the
					tradeoffs we concede to create more usable tools. intended or not, the
					tradeoffs directly affect the user&apos;s creative process and output.
					i thought about this with the idea of a website looking
					&quot;squarespace-y&quot; and what that implies. or recently, with
					framer&apos;s recent update to CMS, and how the previous model had
					shaped my own mental model around how blogs &quot;should be.&quot;
				</p>
				<Image
					src={this03}
					alt="The announcement of Framer's unified pages update"
					priority={false}
					className="xl:max-w-2xl mb-6 mt-6"
				></Image>
				<p>
					obviously these opinionated tools solve problems, at scale and with a
					high bar of effectiveness. but for me, or my little proverbial mug -
					there&apos;s something about the lack of guardrails or constraints
					when i start a nextjs project that&apos;s unlike anything in a
					constrained canvas, no matter how big that canvas is.
				</p>
				<p>
					all those thoughts above were reasons why i started down the road of
					trying to learn frontend, for a few months now. i really savor these
					weekend morning rituals of going to coffee shops around LA, thinking
					about what i wanted for lunch while drinking coffee, and just working
					on whatever i wanted to try out.
				</p>
				<Image
					src={this05}
					alt="Asking ChatGPT for a solution. Everything is blurred except two conversation titles on the sidebar. They're basically the same prompt."
					priority={false}
					className="xl:max-w-2xl mt-6"
				></Image>
				<Image
					src={this06}
					alt="Asking ChatGPT for a solution. Everything is blurred except two conversation titles on the sidebar. They're basically the same prompt."
					priority={false}
					className="xl:max-w-2xl mb-6"
				></Image>
				<p>
					a huge tool i used was chatgpt - and not just for the command c /
					command v, but actually learning. it can be a bit of a mixed bag for
					designers, but if you meet these caveats, i think it can make things
					so much easier:
				</p>
				<ul className="flex flex-col list-disc gap-2">
					<li>
						know how to talk about design, coding, or making websites or apps
					</li>
					<li>
						have some rudimentary experience about how to break down a software
						problem into chunks
					</li>
					<li>
						have a general sense of how you might do it (if only to sniff out
						when it&apos;s leading you to a dead end)
					</li>
					<li>know you will get a bunch of junk sometimes</li>
					<li>fall back on google</li>
				</ul>
				<div className="flex flex-col gap-3 mb-6 mt-6">
					<Image
						src={this04}
						alt="Asking ChatGPT for a solution. Everything is blurred except two conversation titles on the sidebar. They're basically the same prompt."
						priority={false}
						className="xl:max-w-2xl mb-0"
					></Image>
					<p className="text-xs text-neutral-500 w-full text-left">
						Two prompts i had to try to solve this issue. The first one utterly
						failed at solving the problem. On the second one, very minor changes
						in the actual copy led to a complete solve.
					</p>
				</div>
				<p>
					there were some very impressive things that chatgpt did help me with,
					specifically for implementing this site. password protecting pages was
					a headache, mostly because people building auth on nextjs project
					generally want something more robust. but there was one part of this,
					where i need a solution for redirections. i found one solution that
					look promising but used methods from the old pages router, and
					documentation from the nextjs site that used the right methods, but
					not quite my use case. i told chatgpt to basically do a kind of weird,
					code-based style transfer to use the syntax and methods from one
					solution but apply it in a way that matched the other one. and it did
					great. and i learned a ton about routing, web response api, and
					middleware.
				</p>
				<p>
					so what&apos;s next here? i like writing and i&apos;ve already built a
					bunch of protoypes of blogs. beyond that, i have this pipe dream of a
					portfolio site with no case studies, just full daily notes,
					screenshots, and other things i took note of each day until a project
					was done. i know it&apos;d be a nightmare to parse, but something
					about that just feels more real and sincere.
				</p>
				<p>
					short of that, i hope this all comes across kind of like a mug that i
					made. a kinda shitty mug.
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
