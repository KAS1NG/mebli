import Link from 'next/link';
import Image from 'next/image';
import styles from '../../styles/Header.module.scss';
import { getServerSession } from 'next-auth/next';
import type { Session } from 'next-auth';
import { categories } from '@/app/lib/constants';
import authOptions from '@/app/utils/authOptions';
import HeaderClient from './Header.client';
import logoPic from '@/app/public/logo.svg'
import { Сategories } from './Сategories';


export default async function Header() {
    const session = (await getServerSession(authOptions)) as Session | null;
    // const role = (session?.user as any)?.role;
    const role = (session?.user as unknown as { role?: string })?.role;
    const isAdmin = role === 'ROLE_ADMIN';

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.left}>
                    <Link href="/" className={styles.logo__container}>
                        {/* import from /public for simpler static usage */}
                        <Image src={logoPic} width={40} height={40} alt="Меблі Ромни" className={styles.logo} />
                        <span className={styles.brand}>Меблі Ромни</span>
                    </Link>
                </div>
                <HeaderClient session={session} isAdmin={isAdmin} categories={categories} />
            </div>
            <Сategories />
        </header>
    );
}