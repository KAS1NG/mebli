'use client';

import { useState } from 'react';
import { registerAction } from '@/app/actions/register';
import CustomSubmitBtn from '../utils/CustomSubmitBtn';
import { useRouter } from 'next/navigation';
export default function RegistrationForm() {

    const router = useRouter()
    const handleLoginRedirect = () => {
        // Перенаправляємо користувача на сторінку login
        router.push('/auth/login');
    };

    const [error] = useState<string | null>(null);

    return (
        <>
            <form action={registerAction} className="form">
                {error && <p className="error">{error}</p>}
                <div>
                    <label>Email</label>
                    <input name='email' type="email" className='input' required />
                </div>
                <div>
                    <label>Username</label>
                    <input name='username' type="text" className='input' required />
                </div>
                <div>
                    <label>Password</label>
                    <input name='password' type="password" className='input' required />
                </div>
                <CustomSubmitBtn text="Реєстрація" classN="button" />
            </form>
            {/* Перемикач між формами */}
            <p className="switchText">
                Маєте акаунт?{' '}
                <span
                    className="switchLink"
                    onClick={handleLoginRedirect}>
                    Вхід
                </span>
            </p>
        </>
    );
}
