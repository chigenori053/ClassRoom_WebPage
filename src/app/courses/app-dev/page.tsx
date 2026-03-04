import React from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import styles from '../courses.module.css';

export default function AppDevCoursePage() {
    return (
        <div className={styles.page}>
            <PageHeader
                title="Bloom (旧 Application Dev) コース"
                subtitle="AI完全解禁。世界を変えるプロダクトを。"
            />

            <Section title="コース概要">
                <p className="text-center max-w-2xl mx-auto mb-8">
                    実際のアプリケーション開発を行う実践コースです。<br />
                    スマホアプリ、Webアプリ、Desktopアプリなど、作りたいものを形にします。<br />
                    AI（CodingAgent等）をフル活用し、要件定義から実装、リリースまでを経験します。
                </p>

                <div className={styles.featureGrid}>
                    <Card glass hoverEffect className={styles.featureCard}>
                        <span className={styles.icon}>📱</span>
                        <h3>Any Platform</h3>
                        <p>Web, iOS, Android, Desktop... 作りたいいプラットフォームを選んで開発。</p>
                    </Card>
                    <Card glass hoverEffect className={styles.featureCard}>
                        <span className={styles.icon}>🚀</span>
                        <h3>Project Based</h3>
                        <p>カリキュラム消化ではなく、自分のプロジェクトを進行。PM的な視点も養います。</p>
                    </Card>
                    <Card glass hoverEffect className={styles.featureCard}>
                        <span className={styles.icon}>⚡</span>
                        <h3>Full AI Support</h3>
                        <p>生成AIをコーディングパートナーとして最大限活用。高速な開発体験を提供します。</p>
                    </Card>
                </div>
            </Section>
        </div>
    );
}
