import React from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function ContactPage() {
    return (
        <div>
            <PageHeader
                title="CONTACT"
                subtitle="無料体験・お問い合わせ"
            />

            <Section>
                <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
                    <Card className="text-center p-8">
                        <h3 className="text-xl font-bold mb-4">無料体験予約</h3>
                        <p className="mb-6 text-muted-foreground">
                            オンラインカレンダーから空き状況を確認し、<br />
                            その場で予約を完了できます。
                        </p>
                        <div className="space-y-4">
                            {/* Placeholder for Calendar Integration */}
                            <Button fullWidth variant="primary">Googleカレンダーで予約</Button>
                            <Button fullWidth variant="outline">Outlookカレンダーで予約</Button>
                        </div>
                    </Card>

                    <Card className="text-center p-8">
                        <h3 className="text-xl font-bold mb-4">お問い合わせ</h3>
                        <p className="mb-6 text-muted-foreground">
                            その他、カリキュラムや料金に関する<br />
                            ご質問はこちらからフォームでお送りください。
                        </p>
                        <Button fullWidth variant="secondary">お問い合わせフォームへ</Button>
                    </Card>
                </div>
            </Section>
        </div>
    );
}
