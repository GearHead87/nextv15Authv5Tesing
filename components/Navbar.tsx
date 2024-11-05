import { auth } from '@/auth';
import Link from 'next/link';
import React from 'react';
import Logout from './Logout';
import Image from 'next/image';

const Navbar = async () => {
	const session = await auth();
	console.log(session);

	return (
		<div className="flex gap-2">
			<Link className="p-2 bg-gray-600" href="/">
				Home
			</Link>
			<Link className="p-2 bg-gray-600" href="/middleware">
				Middleware
			</Link>
			<Link className="p-2 bg-gray-600" href="/server">
				Server
			</Link>
			{!session?.user ? (
				<Link className="p-2 bg-gray-600" href="/sign-in">
					Login
				</Link>
			) : (
				<div className="flex  items-center justify-center">
					{session?.user?.name}
					{session?.user?.image && (
						<Image
							className="rounded-full"
							width={30}
							height={30}
							alt="user image"
							src={session?.user?.image}
						/>
					)}
					<Logout />
				</div>
			)}
		</div>
	);
};

export default Navbar;
