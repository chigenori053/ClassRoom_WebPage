import type { Metadata } from 'next';
import ContactForm from './ContactForm';

export const metadata: Metadata = {
    title: 'お問い合わせ | KuKKA',
    description: '掲載日程以外での体験教室のご希望や、その他ご質問はこちらのお問い合わせフォームからご連絡ください。',
};

export default function ContactPage() {
    return <ContactForm />;
}
