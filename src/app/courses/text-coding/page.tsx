import React from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { PricingTable } from '@/components/courses/PricingTable';
import styles from '../courses.module.css';

export default function TextCodingCoursePage() {
    const pricingPlans = [
        {
            duration: 'Grow (旧 TextCoding) コース',
            description: '月2回 各90分 / 少人数制サポート / 振替あり',
            plans: [
                { frequency: '月2回', monthlyPrice: '13,200', timePerSession: '90分' },
            ],
        },
    ];

    return (
        <div className={styles.page}>
            <PageHeader
                title="Grow (旧 TextCoding) コース"
                subtitle="AIを相棒に、本物のコードで世界を解き明かす"
            />

            <Section title="コース概要">
                <p className="text-center max-w-2xl mx-auto mb-12" style={{ fontSize: '1.05rem', lineHeight: '1.8', color: 'rgba(255, 255, 255, 0.85)' }}>
                    ブロックプログラミングを卒業し、PythonやSwiftを用いた「実践的な開発」と「AI活用」を習得するコースです。
                </p>

                <h3 className="text-center text-2xl font-bold mb-8 text-white">KuKKA流・自走型学習サイクル</h3>
                <div className={styles.featureGrid}>
                    <Card glass hoverEffect className={styles.featureCard}>
                        <span className={styles.icon}>🤔</span>
                        <h3>思考（Logic First）</h3>
                        <p>まずは自力で解決策を考え、プログラムの構成を組み立てます。</p>
                    </Card>
                    <Card glass hoverEffect className={styles.featureCard}>
                        <span className={styles.icon}>💻</span>
                        <h3>実装（Coding）</h3>
                        <p>Pythonなどでコードを書き、シミュレーションやゲームを形にします。</p>
                    </Card>
                    <Card glass hoverEffect className={styles.featureCard}>
                        <span className={styles.icon}>🚀</span>
                        <h3>深化（AI Support）</h3>
                        <p>知識の補完やエラーの解説に<strong>生成AI（ChatGPT/Gemini）</strong>を活用し、理解を深めます。</p>
                    </Card>
                </div>
            </Section>

            <Section title="料金プラン">
                <PricingTable plans={pricingPlans} />
            </Section>

            <Section title="よくあるご質問（Q&A）" background="muted">
                <div className="max-w-4xl mx-auto space-y-6">
                    <Card glass className="p-6">
                        <h4 className="font-bold text-lg mb-2 text-white">Q. 生成AIを授業で使うと、考える力が落ちませんか？</h4>
                        <p className="text-gray-300 leading-relaxed">A. むしろ逆です。KuKKAでは「最初に自分で構成を考える」プロセスを最重視しています。AIは答えを丸写しするためではなく、新しい知識の解説を聞いたり、自分のロジックを補強する「家庭教師」として活用します。AIへの適切な「問い方」を学ぶことは、これからの時代に最も必要な論理的思考力を育てます。</p>
                    </Card>
                    <Card glass className="p-6">
                        <h4 className="font-bold text-lg mb-2 text-white">Q. なぜGrowコースには60分プランがないのですか？</h4>
                        <p className="text-gray-300 leading-relaxed">A. テキストコーディングやAIを使った深い探究には、「構成→実装→検証（AIとの対話）」という一連のサイクルが必要です。このプロセスを妥協せず、高い達成感を得るためには90分が最適であると判断し、専門コースとして設定しています。</p>
                    </Card>
                    <Card glass className="p-6">
                        <h4 className="font-bold text-lg mb-2 text-white">Q. 文系（数学が苦手）な子供でも大丈夫ですか？</h4>
                        <p className="text-gray-300 leading-relaxed">A. はい。例えば円周率（π）の算出シミュレーションなど、数式だけでは理解しにくい概念も、プログラミングで「視覚化」することで直感的に理解できるようになります。AIのサポートを受けながら自分のペースで進められるので、数学への興味が湧くきっかけにもなります。</p>
                    </Card>
                </div>
            </Section>
        </div>
    );
}
