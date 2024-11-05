'use server';
import { signIn, signOut } from '@/auth';
import { revalidatePath } from 'next/cache';

export const login = async (provider: string) => {
	await signIn(provider, { redirectTo: '/' });
	revalidatePath('/');
};

export const logout = async () => {
	await signOut({ redirectTo: '/' });
	revalidatePath('/');
};

export const loginWithCreds = async (formData: FormData) => {
	const rawFormData = {
		email: formData.get('email') as string,
		password: formData.get('password') as string,
		role: 'ADMIN',
		redirectTo: '/',
	};

	try {
		await signIn('credentials', rawFormData);
	} catch (error) {
		console.log(error);
	}
	revalidatePath('/');
};
