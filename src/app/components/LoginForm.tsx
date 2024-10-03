'use client'
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import CustomSubmitBtn from '../utils/CustomSubmitBtn';
export default function LoginForm() {

    const [error] = useState<string | null>(null);

    const router = useRouter()

    const handleRegistrationRedirect = () => {
        // Перенаправляємо користувача на сторінку register
        router.push('/auth/register');
    };

    const credentialsAction = async (formData: FormData) => {

        const data: { [key: string]: string } = {};
        formData.forEach((value, key) => {
            data[key] = value.toString(); // Перетворюємо значення в рядок
        });

        const credentials = await signIn('credentials', {
            redirect: false,
            ...data
        });

        if (credentials?.status === 200) {
            router.push('/products?page=1')
        }
    }

    return (
        <>
            <form action={credentialsAction} className="form">
                {error && <p className="error">{error}</p>}
                <div>
                    <label>Username</label>
                    <input name='username' type="text" className='input' required />
                </div>
                <div>
                    <label>Password</label>
                    <input name='password' type="password" className='input' required />
                </div>
                <CustomSubmitBtn text="Вхід" classN="button" />
            </form>
            {/* Перемикач між формами */}
            <p className="switchText">
                Не маєте акаунту?{' '}
                <span
                    className="switchLink"
                    onClick={handleRegistrationRedirect}>
                    Реєстрація
                </span>
            </p>
        </>
    );
}
