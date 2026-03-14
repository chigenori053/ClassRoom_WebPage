'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import styles from './contact.module.css';

type FormData = {
    parentName: string;
    childName: string;
    childAge: string;
    email: string;
    phone: string;
    course: string;
    preferredDates: string;
    message: string;
};

export default function ContactPage() {
    const [formData, setFormData] = useState<FormData>({
        parentName: '',
        childName: '',
        childAge: '',
        email: '',
        phone: '',
        course: '',
        preferredDates: '',
        message: '',
    });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            setStatus(res.ok ? 'success' : 'error');
        } catch {
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <div className={styles.page}>
                <Section className={styles.centerSection}>
                    <Card className={styles.successCard}>
                        <p className={styles.successTitle}>お問い合わせを受け付けました。</p>
                        <p className={styles.successDesc}>
                            内容を確認の上、担当者から2〜3営業日以内にご連絡いたします。<br />
                            しばらくお待ちください。
                        </p>
                        <Link href="/">
                            <Button variant="outline">トップページへ戻る</Button>
                        </Link>
                    </Card>
                </Section>
            </div>
        );
    }

    return (
        <div className={styles.page}>
            <PageHeader
                title="CONTACT"
                subtitle="スケジュール外の体験教室をご希望の方へ"
            />

            <Section>
                <div className={styles.container}>
                    <div className={styles.notice}>
                        <p>
                            公開中の体験枠をご利用の方は
                            <Link href="/booking" className={styles.noticeLink}>体験レッスン予約ページ</Link>
                            からご予約ください。<br />
                            こちらのフォームは、<strong>掲載日程以外での体験教室をご希望の方</strong>向けのお問い合わせ窓口です。
                        </p>
                    </div>

                    <Card className={styles.formCard}>
                        <form onSubmit={handleSubmit} className={styles.form}>
                            <div className={styles.formGrid}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="parentName">保護者様のお名前 <span className={styles.required}>必須</span></label>
                                    <input required id="parentName" name="parentName" type="text" className={styles.input} value={formData.parentName} onChange={handleChange} placeholder="例：山田 花子" />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="childName">お子様のお名前 <span className={styles.required}>必須</span></label>
                                    <input required id="childName" name="childName" type="text" className={styles.input} value={formData.childName} onChange={handleChange} placeholder="例：山田 太郎" />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="childAge">お子様の学年 <span className={styles.required}>必須</span></label>
                                    <input required id="childAge" name="childAge" type="text" className={styles.input} value={formData.childAge} onChange={handleChange} placeholder="例：小学3年生" />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="email">メールアドレス <span className={styles.required}>必須</span></label>
                                    <input required id="email" name="email" type="email" className={styles.input} value={formData.email} onChange={handleChange} placeholder="例：example@email.com" />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="phone">電話番号</label>
                                    <input id="phone" name="phone" type="tel" className={styles.input} value={formData.phone} onChange={handleChange} placeholder="例：090-0000-0000" />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="course">ご興味のあるコース</label>
                                    <select id="course" name="course" className={styles.input} value={formData.course} onChange={handleChange}>
                                        <option value="">未定（相談したい）</option>
                                        <option value="Sproutコース">Sproutコース（Scratch・マイクラ）</option>
                                        <option value="Growコース">Growコース（Python・JavaScript）</option>
                                        <option value="Bloomコース">Bloomコース（アプリ開発）</option>
                                    </select>
                                </div>
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="preferredDates">ご希望の日時の候補 <span className={styles.required}>必須</span></label>
                                <textarea
                                    required
                                    id="preferredDates"
                                    name="preferredDates"
                                    rows={3}
                                    className={styles.input}
                                    value={formData.preferredDates}
                                    onChange={handleChange}
                                    placeholder="例：平日16時〜18時、土曜日の午前中 など、ご都合の良い日程・時間帯をご記入ください。"
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="message">その他・ご質問など</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={4}
                                    className={styles.input}
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="プログラミング経験の有無、お子様の興味・関心など、何でもお気軽にどうぞ。"
                                />
                            </div>

                            {status === 'error' && (
                                <p className={styles.errorMessage}>
                                    エラーが発生しました。入力内容をご確認の上、再度お試しください。
                                </p>
                            )}

                            <div className={styles.submitSection}>
                                <Button type="submit" size="lg" variant="primary" disabled={status === 'submitting'}>
                                    {status === 'submitting' ? '送信中...' : '問い合わせを送信する'}
                                </Button>
                            </div>
                        </form>
                    </Card>
                </div>
            </Section>
        </div>
    );
}
