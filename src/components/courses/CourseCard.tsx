import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './CourseCard.module.css';

export interface CourseCardProps {
    title: string;
    href: string;
    imageSrc: string;
    imageAlt: string;
    target: string;
    tools: string;
    aiStatus: 'forbidden' | 'partial' | 'full';
    description?: string;
}

const aiStatusConfig = {
    forbidden: {
        label: 'AI禁止',
        color: '#ef4444',
        bgColor: 'rgba(239, 68, 68, 0.1)',
    },
    partial: {
        label: 'AI一部解禁',
        color: '#f59e0b',
        bgColor: 'rgba(245, 158, 11, 0.1)',
    },
    full: {
        label: 'AI完全解禁',
        color: '#22c55e',
        bgColor: 'rgba(34, 197, 94, 0.1)',
    },
};

export function CourseCard({
    title,
    href,
    imageSrc,
    imageAlt,
    target,
    tools,
    aiStatus,
    description,
}: CourseCardProps) {
    const statusConfig = aiStatusConfig[aiStatus];

    return (
        <Link href={href} className={styles.cardLink}>
            <article className={styles.card}>
                <div className={styles.imageContainer}>
                    <Image
                        src={imageSrc}
                        alt={imageAlt}
                        fill
                        className={styles.image}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className={styles.imageOverlay} />
                </div>
                <div className={styles.content}>
                    <h3 className={styles.title}>{title}</h3>
                    {description && <p className={styles.description}>{description}</p>}
                    <div className={styles.details}>
                        <div className={styles.detailItem}>
                            <span className={styles.detailLabel}>対象・レベル</span>
                            <span className={styles.detailValue}>{target}</span>
                        </div>
                        <div className={styles.detailItem}>
                            <span className={styles.detailLabel}>主なツール・言語</span>
                            <span className={styles.detailValue}>{tools}</span>
                        </div>
                        <div className={styles.detailItem}>
                            <span className={styles.detailLabel}>AI利用</span>
                            <span
                                className={styles.aiBadge}
                                style={{
                                    '--badge-color': statusConfig.color,
                                    '--badge-bg': statusConfig.bgColor,
                                } as React.CSSProperties}
                            >
                                {statusConfig.label}
                            </span>
                        </div>
                    </div>
                    <div className={styles.cardFooter}>
                        <span className={styles.learnMore}>詳細を見る →</span>
                    </div>
                </div>
            </article>
        </Link>
    );
}
