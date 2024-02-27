// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const isPasswordEnabled = !!process.env.PAGE_PASSWORD;

export async function middleware(request: NextRequest) {
	const isLoggedIn = request.cookies.has(process.env.PASSWORD_COOKIE_NAME!);

	if (isPasswordEnabled && !isLoggedIn) {
		const requestPage = request.nextUrl.pathname;
		const redirectUrl = new URL("/password", request.url);
		redirectUrl.searchParams.set("requestPage", requestPage);

		return NextResponse.redirect(redirectUrl);
	}
	return NextResponse.next();
}

export const config = {
	matcher: ["/rosetta", "/rosetta-tokens"],
};
