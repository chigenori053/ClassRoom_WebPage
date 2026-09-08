import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { Resend } from 'resend';
import { escapeHtml } from '@/lib/escapeHtml';

async function sendInquiryNotification(params: {
    parentName: string;
    childName: string;
    childAge: string;
    email: string;
    phone?: string;
    course?: string;
    preferredDates: string;
    message?: string;
}) {
    const parentName = escapeHtml(params.parentName);
    const childName = escapeHtml(params.childName);
    const childAge = escapeHtml(params.childAge);
    const email = escapeHtml(params.email);
    const phone = params.phone ? escapeHtml(params.phone) : params.phone;
    const course = params.course ? escapeHtml(params.course) : params.course;
    const preferredDates = escapeHtml(params.preferredDates);
    const message = params.message ? escapeHtml(params.message) : params.message;
    try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const { error } = await resend.emails.send({
            from: process.env.FROM_EMAIL ?? 'noreply@kukka.info',
            to: process.env.ADMIN_EMAIL ?? 'takahashi_s@kukka.info',
            subject: `【KuKKA】体験教室 お問い合わせ（${parentName}様）`,
            html: `
<!DOCTYPE html>
<html lang="ja">
<body style="font-family: sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <h2 style="color: #4a5568; border-bottom: 2px solid #e2e8f0; padding-bottom: 12px;">
    KuKKA 体験教室お問い合わせ
  </h2>
  <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
    <tr>
      <td style="padding: 10px; background: #f7fafc; font-weight: bold; width: 160px; border: 1px solid #e2e8f0;">保護者様のお名前</td>
      <td style="padding: 10px; border: 1px solid #e2e8f0;">${parentName}</td>
    </tr>
    <tr>
      <td style="padding: 10px; background: #f7fafc; font-weight: bold; border: 1px solid #e2e8f0;">お子様のお名前</td>
      <td style="padding: 10px; border: 1px solid #e2e8f0;">${childName}（${childAge}）</td>
    </tr>
    <tr>
      <td style="padding: 10px; background: #f7fafc; font-weight: bold; border: 1px solid #e2e8f0;">メールアドレス</td>
      <td style="padding: 10px; border: 1px solid #e2e8f0;"><a href="mailto:${email}">${email}</a></td>
    </tr>
    ${phone ? `
    <tr>
      <td style="padding: 10px; background: #f7fafc; font-weight: bold; border: 1px solid #e2e8f0;">電話番号</td>
      <td style="padding: 10px; border: 1px solid #e2e8f0;">${phone}</td>
    </tr>` : ''}
    ${course ? `
    <tr>
      <td style="padding: 10px; background: #f7fafc; font-weight: bold; border: 1px solid #e2e8f0;">希望コース</td>
      <td style="padding: 10px; border: 1px solid #e2e8f0;">${course}</td>
    </tr>` : ''}
    <tr>
      <td style="padding: 10px; background: #f7fafc; font-weight: bold; border: 1px solid #e2e8f0;">希望日時の候補</td>
      <td style="padding: 10px; border: 1px solid #e2e8f0; white-space: pre-wrap;">${preferredDates}</td>
    </tr>
    ${message ? `
    <tr>
      <td style="padding: 10px; background: #f7fafc; font-weight: bold; border: 1px solid #e2e8f0;">お問い合わせ内容</td>
      <td style="padding: 10px; border: 1px solid #e2e8f0; white-space: pre-wrap;">${message}</td>
    </tr>` : ''}
  </table>
  <p style="margin-top: 24px; font-size: 0.875rem; color: #718096;">
    管理ダッシュボードでも確認できます。<br />
    このメールは自動送信されています。
  </p>
</body>
</html>`,
        });
        if (error) {
            console.error('Contact notification email failed:', error);
        }
    } catch (error) {
        console.error('Contact notification email error (inquiry itself succeeded):', error);
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { parentName, childName, childAge, email, phone, course, preferredDates, message } = body;

        if (!parentName || !childName || !childAge || !email || !preferredDates) {
            return NextResponse.json({ error: '必須項目が入力されていません。' }, { status: 400 });
        }

        const inquiry = await prisma.inquiry.create({
            data: {
                parentName,
                childName,
                childAge,
                email,
                phone: phone || null,
                course: course || null,
                preferredDates,
                message: message || null,
            },
        });

        await sendInquiryNotification({ parentName, childName, childAge, email, phone, course, preferredDates, message });

        return NextResponse.json({ success: true, inquiry }, { status: 201 });
    } catch (error) {
        console.error('Contact inquiry error:', error);
        return NextResponse.json(
            { error: '送信に失敗しました。後でもう一度お試しください。' },
            { status: 500 }
        );
    }
}
