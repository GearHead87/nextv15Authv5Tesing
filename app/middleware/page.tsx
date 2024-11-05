import { auth } from '@/auth';
import React from 'react';

const Middleware = async () => {
	const session = await auth();
	return (
		<div className="flex h-full items-center justify-center flex-col gap-2">
			<h2 className="text-3xl">Middleware page</h2>
			<p className="tex-lg">{session?.user?.email}</p>
		</div>
	);
};

export default Middleware;
