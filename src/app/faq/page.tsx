import type { Metadata } from 'next';
import { PageHeader } from '@/components/ui/PageHeader';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import styles from './faq.module.css';

export const metadata: Metadata = {
    title: 'よくある質問 | KuKKA',
    description: 'プログラミング未経験の方、パソコンの持ち込み、振替、コース選びなど、KuKKAプログラミング教室によくいただくご質問にお答えします。',
};

export default function FAQPage() {
    const faqs = [
        { q: 'プログラミング未経験ですが大丈夫ですか？', a: 'はい、大丈夫です。Sproutコースでは直感的なツールから始めるので、楽しく学べます。' },
        { q: 'パソコンは必要ですか？', a: '教室のパソコンを使用できますが、ご自身のノートPCを持ち込んでいただくことも可能です。' },
        { q: 'AIを使うと自分で考えなくなるのでは？', a: 'KuKKAではあえて「基礎期におけるAI利用制限」のフェーズを明確に設けています。自分の頭で考える力（思考の筋力）がついてから段階的にAIを解禁するため、思考力を損なうことはありません。' },
        { q: '振替授業はできますか？', a: 'はい、前日までにご連絡いただければ振替可能です。' },
        { q: '(Grow) 生成AIを授業で使うと、考える力が落ちませんか？', a: 'むしろ逆です。KuKKAでは「最初に自分で構成を考える」プロセスを最重視しています。AIは答えを丸写しするためではなく、新しい知識の解説を聞いたり、自分のロジックを補強する「家庭教師」として活用します。AIへの適切な「問い方」を学ぶことは、これからの時代に最も必要な論理的思考力を育てます。' },
        { q: '(Grow) なぜGrowコースには60分プランがないのですか？', a: 'テキストコーディングやAIを使った深い探究には、「構成→実装→検証（AIとの対話）」という一連のサイクルが必要です。このプロセスを妥協せず、高い達成感を得るためには90分が最適であると判断し、専門コースとして設定しています。' },
        { q: '(Grow) 文系（数学が苦手）な子供でも大丈夫ですか？', a: 'はい。例えば円周率（π）の算出シミュレーションなど、数式だけでは理解しにくい概念も、プログラミングで「視覚化」することで直感的に理解できるようになります。AIのサポートを受けながら自分のペースで進められるので、数学への興味が湧くきっかけにもなります。' },
    ];

    return (
        <div className={styles.page}>
            <PageHeader
                title="FAQ"
                subtitle="よくある質問とシステム"
            />

            <Section>
                <div className={styles.faqContainer}>
                    {faqs.map((faq, i) => (
                        <Card key={i} className={styles.faqCard}>
                            <h3 className={styles.question}>Q. {faq.q}</h3>
                            <p className={styles.answer}>A. {faq.a}</p>
                        </Card>
                    ))}
                </div>
            </Section>
        </div>
    );
}
