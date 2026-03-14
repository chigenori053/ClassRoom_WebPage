import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.headerContainer}>
                <Link href="/" className={styles.logo}>
                    KuKKA
                </Link>
                <nav>
                    <ul className={styles.navList}>
                        <li><Link href="/">HOME</Link></li>
                        <li><Link href="/courses">COURSES</Link></li>
                        <li><Link href="/access">ACCESS</Link></li>
                        <li><Link href="/column">COLUMN</Link></li>
                        <li><Link href="/faq">FAQ</Link></li>
                        <li><Link href="/contact" className={styles.navContact}>CONTACT</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
