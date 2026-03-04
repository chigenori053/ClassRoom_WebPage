import type { Metadata } from 'next';
import { Noto_Sans_JP, Noto_Serif_JP } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { websiteSchema, localBusinessSchema } from '@/lib/json-ld';
import './globals.css';

const notoSansJP = Noto_Sans_JP({ subsets: ['latin'], weight: ['400', '500', '700'], variable: '--font-sans' });
const notoSerifJP = Noto_Serif_JP({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-serif' });

export const metadata: Metadata = {
  title: 'KuKKA - Fun and Growth | AI時代のプログラミングスクール',
  description: 'AIと人間が共創する社会へ。KuKKAプログラミングスクールは、2026年の子供たちに必要な「思考の筋力」と「AI活用力」を段階的に育みます。',
  other: {
    'supervised-by': 'CodingAgent Dev Team',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" suppressHydrationWarning className={`${notoSansJP.variable} ${notoSerifJP.variable}`}>
      <body suppressHydrationWarning style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        {/* AIO Optimization: Summary of sequential programming education */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              "name": "KuKKA Programming School",
              "description": "AI時代における段階的プログラミング教育。最初はAIを制限し思考力を鍛え、段階的にAIを解禁することで、真のAI活用能力を育成します。",
              "knowsAbout": ["Programming", "AI", "Computational Thinking"]
            })
          }}
        />
        <Header />
        <main style={{ flex: 1 }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
