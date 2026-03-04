import React from 'react';
import styles from './Card.module.css';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    hoverEffect?: boolean;
    glass?: boolean;
}

export const Card = ({
    children,
    className = '',
    hoverEffect = false,
    glass = false,
}: CardProps) => {
    const rootClassName = [
        styles.card,
        glass ? styles.glass : styles.solid,
        hoverEffect ? styles.hoverEffect : '',
        className,
    ].filter(Boolean).join(' ');

    return (
        <div className={rootClassName}>
            {children}
        </div>
    );
};
