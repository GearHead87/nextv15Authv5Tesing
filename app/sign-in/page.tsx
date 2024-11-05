'use client';
import { login } from '@/actions/auth';
import LoginForm from '@/components/LoginForm';
import React from 'react';

const SignIn = () => {
	return (
		<div className="h-full flex flex-col gap-2 items-center justify-center">
			<LoginForm />
			<div
				onClick={() => login('google')}
				className="bg-green-400 p-2 text-black w-40 rounded-xl"
			>
				Sign in with Google
			</div>
		</div>
	);
};

export default SignIn;
