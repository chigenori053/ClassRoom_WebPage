import Link from 'next/link';

export default function Header() {
    return (
        <header className="header">
            <div className="container header-container">
                <Link href="/" className="header-logo">
                    KuKKA
                </Link>
                <nav className="nav">
                    <ul className="nav-list">
                        <li><Link href="/">HOME</Link></li>
                        <li><Link href="/courses">COURSES</Link></li>
                        <li><Link href="/access">ACCESS</Link></li>
                        <li><Link href="/column">COLUMN</Link></li>
                        <li><Link href="/faq">FAQ</Link></li>
                        <li><Link href="/contact" className="nav-link-contact">CONTACT</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
