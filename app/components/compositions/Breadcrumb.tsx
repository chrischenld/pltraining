"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

// Define the mapping of pathnames to display names
const pathNameMap: Record<string, string> = {
	powerlifting: "PL",
	"new-cycle": "New Cycle",
	// Add more mappings as needed
};

export default function Breadcrumb() {
	const pathname = usePathname();
	const pathSegments = pathname.split("/").filter((segment) => segment);

	return (
		<header className="flex flex-row gap-2">
			<Link href="/" className="text-fg-disabled">
				Home
			</Link>
			{pathSegments.map((segment, index) => {
				const isLastSegment = index === pathSegments.length - 1;
				const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
				const displayName = pathNameMap[segment] || segment;

				return (
					<Fragment key={segment}>
						<p className="text-fg-disabled">/</p>
						<Link
							href={href}
							className={isLastSegment ? "text-fg-default" : "text-fg-disabled"}
						>
							{displayName}
						</Link>
					</Fragment>
				);
			})}
		</header>
	);
}
