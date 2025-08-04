import { redirect } from 'next/navigation';

const config = {
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL,
}

export async function registerAction(formData: FormData) {
    const email = formData.get('email') as string;
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    const response = await fetch(`${config}/auth/registration`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, username, password }),
    });

    if (response.ok) {
        redirect('/auth/login')
    }

    const errorData = await response.json();
    return { error: errorData.message };
}
