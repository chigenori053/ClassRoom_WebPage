'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './LearningCard.module.css';

interface LearningCardProps {
    emoji: string;
    title: string;
    titleJa: string;
    imageSrc: string;
    imageAlt: string;
    description: string;
    fitFor: string[];
    themes: string[];
    layout?: 'top' | 'left' | 'right';
}

export const LearningCard = ({
    emoji,
    title,
    titleJa,
    imageSrc,
    imageAlt,
    description,
    fitFor,
    themes,
    layout = 'top',
}: LearningCardProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={[
            styles.card,
            styles[layout],
            isOpen ? styles.open : '',
        ].filter(Boolean).join(' ')}>

            {/* 画像 + 本文の横並び領域 */}
            <div className={styles.cardMain}>
                <div className={styles.imageWrapper}>
                    <Image
                        src={imageSrc}
                        alt={imageAlt}
                        fill
                        className={styles.image}
                    />
                </div>

                <div className={styles.body}>
                    <h3 className={styles.title}>
                        {emoji} {title}
                        <span className={styles.titleJa}>{titleJa}</span>
                    </h3>
                    <p className={styles.description}>{description}</p>

                    <button
                        className={styles.toggle}
                        onClick={() => setIsOpen((prev) => !prev)}
                        aria-expanded={isOpen}
                        aria-label={`${title}の詳細を${isOpen ? '閉じる' : '見る'}`}
                    >
                        {isOpen ? '閉じる' : '詳しく見る'}
                        <span className={`${styles.chevron} ${isOpen ? styles.chevronUp : ''}`}>
                            ▾
                        </span>
                    </button>
                </div>
            </div>

            {/* アコーディオン（常にカード幅いっぱい） */}
            <div className={`${styles.accordionBody} ${isOpen ? styles.accordionOpen : ''}`}>
                <div className={styles.accordionInner}>
                    <div className={styles.accordionContent}>
                        <div className={styles.accordionSection}>
                            <p className={styles.accordionLabel}>こんな子に向いている</p>
                            <div className={styles.tagList}>
                                {fitFor.map((tag) => (
                                    <span key={tag} className={styles.tag}>{tag}</span>
                                ))}
                            </div>
                        </div>
                        <div className={styles.accordionSection}>
                            <p className={styles.accordionLabel}>学習テーマ例</p>
                            <ul className={styles.themeList}>
                                {themes.map((theme) => (
                                    <li key={theme} className={styles.themeItem}>{theme}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
