// export { auth as middleware } from "@/auth"

import { auth } from '@/auth';
import { NextRequest, NextResponse } from 'next/server';
const protectRoutes = ['/middleware'];

export default async function middleware(request: NextRequest) {
	const session = await auth();

	const isProtected = protectRoutes.some((route) => request.nextUrl.pathname.startsWith(route));

	if (!session && isProtected) {
		const absoluteURL = new URL('/', request.nextUrl.origin);
		return NextResponse.redirect(absoluteURL.toString());
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
