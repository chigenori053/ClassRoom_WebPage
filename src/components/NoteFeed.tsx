import React from 'react';
import { Card } from '@/components/ui/Card';
import Link from 'next/link';
import { fetchNoteArticles } from '@/lib/rss';

export async function NoteFeed() {
    const articles = await fetchNoteArticles();

    if (!articles || articles.length === 0) {
        return (
            <div style={{ textAlign: 'center', color: 'var(--muted-foreground)' }}>
                <p>記事の読み込みに失敗しました、またはまだ記事がありません。</p>
            </div>
        );
    }

    return (
        <>
            {articles.map((article, index) => {
                const dateObj = new Date(article.pubDate);
                const formattedDate = isNaN(dateObj.getTime())
                    ? article.pubDate
                    : `${dateObj.getFullYear()}.${String(dateObj.getMonth() + 1).padStart(2, '0')}.${String(dateObj.getDate()).padStart(2, '0')}`;

                return (
                    <Card key={index}>
                        <div style={{ padding: '2rem' }}>
                            <p style={{ fontSize: '0.85rem', color: 'var(--muted-foreground)', marginBottom: '0.5rem' }}>
                                {formattedDate}
                            </p>
                            <h4 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', lineHeight: 1.5 }}>
                                {article.title}
                            </h4>
                            <a href={article.link} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none', borderBottom: '1px solid transparent', transition: 'border-color 0.2s' }} onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--primary)')} onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'transparent')}>
                                noteを読む &rarr;
                            </a>
                        </div>
                    </Card>
                );
            })}
        </>
    );
}
