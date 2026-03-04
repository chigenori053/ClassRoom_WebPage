'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import styles from './booking.module.css';

export default function BookingPage() {
    const [formData, setFormData] = useState({
        parentName: '',
        childName: '',
        childAge: '',
        email: '',
        phone: '',
        course: 'Sprout (旧 Basic) コース',
        preferredDate: '',
        notes: '',
    });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            const res = await fetch('/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setStatus('success');
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <div className={styles.page}>
                <Section className={styles.centerSection}>
                    <Card className={styles.successCard}>
                        <h2 className={styles.successTitle}>ご予約ありがとうございます。</h2>
                        <p className={styles.successMessage}>
                            体験レッスンの受付が完了しました。<br />
                            ご入力いただいたメールアドレス宛に、担当者から日程確定のご連絡を差し上げます。
                        </p>
                        <Button variant="outline" onClick={() => window.location.href = '/'}>トップページへ戻る</Button>
                    </Card>
                </Section>
            </div>
        );
    }

    return (
        <div className={styles.page}>
            <PageHeader
                title="TRIAL LESSON"
                subtitle="体験レッスンのお申し込み"
            />

            <Section>
                <div className={styles.container}>
                    <div className={styles.policyText}>
                        KuKKAのページをお読みいただきありがとうございます。<br />
                        まずは実際の教室の雰囲気や、私たちの指導方針をご体験ください。<br />
                        無理な勧誘は一切行いませんので、ご安心くださいませ。
                    </div>

                    <Card className={styles.formCard}>
                        <form onSubmit={handleSubmit} className={styles.form}>
                            <div className={styles.formGroup}>
                                <label htmlFor="parentName">保護者様のお名前 <span className={styles.required}>必須</span></label>
                                <input required type="text" id="parentName" name="parentName" className={styles.input} value={formData.parentName} onChange={handleChange} placeholder="例: 群馬 太郎" />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="childName">お子様のお名前 <span className={styles.required}>必須</span></label>
                                <input required type="text" id="childName" name="childName" className={styles.input} value={formData.childName} onChange={handleChange} placeholder="例: 群馬 一郎" />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="childAge">お子様のご年齢（学年） <span className={styles.required}>必須</span></label>
                                <input required type="text" id="childAge" name="childAge" className={styles.input} value={formData.childAge} onChange={handleChange} placeholder="例: 小学5年生" />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="email">メールアドレス <span className={styles.required}>必須</span></label>
                                <input required type="email" id="email" name="email" className={styles.input} value={formData.email} onChange={handleChange} placeholder="例: example@kukka.jp" />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="phone">お電話番号</label>
                                <input type="tel" id="phone" name="phone" className={styles.input} value={formData.phone} onChange={handleChange} placeholder="例: 090-0000-0000" />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="course">ご希望のコース <span className={styles.required}>必須</span></label>
                                <select id="course" name="course" className={styles.input} value={formData.course} onChange={handleChange}>
                                    <option value="Sprout (旧 Basic) コース">Sprout (旧 Basic) コース（Scratch・マイクラ 等）</option>
                                    <option value="Grow (旧 TextCoding) コース">Grow (旧 TextCoding) コース（Python・JS 等）</option>
                                    <option value="Bloom (旧 Application Dev) コース">Bloom (旧 Application Dev) コース（アプリ開発 等）</option>
                                    <option value="未定（相談して決めたい）">未定（相談して決めたい）</option>
                                </select>
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="preferredDate">ご希望の日時 <span className={styles.required}>必須</span></label>
                                <input required type="date" id="preferredDate" name="preferredDate" className={styles.input} value={formData.preferredDate} onChange={handleChange} />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="notes">その他・ご質問など</label>
                                <textarea id="notes" name="notes" rows={4} className={styles.input} value={formData.notes} onChange={handleChange} placeholder="ご不安な点や事前に伝えておきたいことがあればご記入ください。" />
                            </div>

                            {status === 'error' && (
                                <div className={styles.errorMessage}>
                                    エラーが発生しました。入力内容をご確認の上、再度お試しください。
                                </div>
                            )}

                            <div className={styles.submitSection}>
                                <Button type="submit" size="lg" variant="primary" disabled={status === 'submitting'}>
                                    {status === 'submitting' ? '送信中...' : '申し込む'}
                                </Button>
                            </div>
                        </form>
                    </Card>
                </div>
            </Section >
        </div >
    );
}
