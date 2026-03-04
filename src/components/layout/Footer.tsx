import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    <div>
                        <h3>KuKKA Programming School</h3>
                        <p>Fun and Growth in AI Era</p>
                    </div>
                    <div>
                        <h4>Sitemap</h4>
                        <ul className="footer-links">
                            <li><Link href="/">HOME</Link></li>
                            <li><Link href="/courses">COURSES</Link></li>
                            <li><Link href="/access">ACCESS</Link></li>
                            <li><Link href="/column">COLUMN</Link></li>
                            <li><Link href="/faq">FAQ</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4>Contact</h4>
                        <ul className="footer-links">
                            <li><Link href="/contact">Free Trial / Inquiry</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="footer-copyright">
                    &copy; {new Date().getFullYear()} KuKKA Programming School. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
