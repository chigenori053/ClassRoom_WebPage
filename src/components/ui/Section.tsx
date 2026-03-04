import React from 'react';
import styles from './Section.module.css';

interface SectionProps {
    id?: string;
    title?: string;
    subtitle?: string;
    children: React.ReactNode;
    className?: string;
    background?: 'default' | 'muted' | 'none';
}

export const Section = ({
    id,
    title,
    subtitle,
    children,
    className = '',
    background = 'default',
}: SectionProps) => {
    const rootClassName = [
        styles.section,
        styles[background],
        className,
    ].filter(Boolean).join(' ');

    return (
        <section id={id} className={rootClassName}>
            <div className="container">
                {(title || subtitle) && (
                    <div className={styles.header}>
                        {title && <h2 className={styles.title}>{title}</h2>}
                        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
                    </div>
                )}
                <div className={styles.content}>
                    {children}
                </div>
            </div>
        </section>
    );
};
