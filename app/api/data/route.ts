import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export const GET = auth(function GET(req) {
	if (req.auth) return NextResponse.json(req.auth);
	return NextResponse.json({ message: 'not authenticated' }, { status: 401 });
});
