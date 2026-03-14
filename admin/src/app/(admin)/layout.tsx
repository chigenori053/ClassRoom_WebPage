import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import { Sidebar } from '@/components/layout/Sidebar';
import styles from './layout.module.css';

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const cookieStore = await cookies();
    if (cookieStore.get('admin_auth')?.value !== 'true') redirect('/');

    const [pendingBookings, newInquiries] = await Promise.all([
        prisma.booking.count({ where: { status: 'PENDING' } }),
        prisma.inquiry.count({ where: { status: 'NEW' } }),
    ]);

    return (
        <div className={styles.shell}>
            <Sidebar pendingBookings={pendingBookings} newInquiries={newInquiries} />
            <main className={styles.main}>
                {children}
            </main>
        </div>
    );
}
