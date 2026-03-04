import React from 'react';
import styles from './PageHeader.module.css';

interface PageHeaderProps {
    title: string;
    subtitle?: string;
    className?: string;
}

export const PageHeader = ({
    title,
    subtitle,
    className = '',
}: PageHeaderProps) => {
    return (
        <div className={`${styles.wrapper} ${className}`}>
            <div className="container">
                <div className={styles.content}>
                    <h1 className={styles.title}>{title}</h1>
                    {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
                </div>
            </div>
            <div className={styles.background} />
        </div>
    );
};
