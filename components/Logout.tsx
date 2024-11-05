'use client';
import { logout } from '@/actions/auth';
import React from 'react';

const Logout = () => {
	return (
		<div className="p-2 bg-gray-600" onClick={() => logout()}>
			Logout
		</div>
	);
};

export default Logout;
