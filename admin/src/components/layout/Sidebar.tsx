'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { logout } from '@/app/actions';
import styles from './Sidebar.module.css';

type NavItem = {
    href: string;
    label: string;
    icon: string;
    badge?: number;
};

type SidebarProps = {
    pendingBookings: number;
    newInquiries: number;
};

export function Sidebar({ pendingBookings, newInquiries }: SidebarProps) {
    const pathname = usePathname();

    const navItems: NavItem[] = [
        { href: '/dashboard', label: 'ダッシュボード', icon: '🏠' },
        { href: '/bookings', label: '体験レッスン予約', icon: '📋', badge: pendingBookings },
        { href: '/calendar', label: 'カレンダー', icon: '🗓️' },
        { href: '/schedules', label: '授業スケジュール', icon: '📅' },
        { href: '/inquiries', label: '問い合わせ', icon: '📩', badge: newInquiries },
        { href: '/columns', label: 'コラム管理', icon: '✏️' },
    ];

    return (
        <aside className={styles.sidebar}>
            <div className={styles.brand}>
                <span className={styles.brandName}>KuKKA</span>
                <span className={styles.brandSub}>Admin</span>
            </div>

            <nav className={styles.nav} aria-label="管理メニュー">
                <ul className={styles.navList}>
                    {navItems.map((item) => {
                        const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
                                    aria-current={isActive ? 'page' : undefined}
                                >
                                    <span className={styles.navIcon} aria-hidden="true">{item.icon}</span>
                                    <span className={styles.navLabel}>{item.label}</span>
                                    {item.badge != null && item.badge > 0 && (
                                        <span className={styles.navBadge} aria-label={`${item.badge}件`}>
                                            {item.badge}
                                        </span>
                                    )}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            <div className={styles.footer}>
                <form action={logout}>
                    <button type="submit" className={styles.logoutBtn}>
                        <span aria-hidden="true">↩</span> ログアウト
                    </button>
                </form>
            </div>
        </aside>
    );
}
