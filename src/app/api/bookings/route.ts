import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { Resend } from 'resend';
import type { Booking, TrialSlot } from '@prisma/client';

function formatSlotDateTime(slot: TrialSlot) {
    const date = slot.startTime.toLocaleDateString('ja-JP', {
        timeZone: 'Asia/Tokyo', year: 'numeric', month: 'long', day: 'numeric', weekday: 'short',
    });
    const start = slot.startTime.toLocaleTimeString('ja-JP', {
        timeZone: 'Asia/Tokyo', hour: '2-digit', minute: '2-digit',
    });
    const end = slot.endTime.toLocaleTimeString('ja-JP', {
        timeZone: 'Asia/Tokyo', hour: '2-digit', minute: '2-digit',
    });
    return `${date} ${start}〜${end}`;
}

async function sendBookingEmails(booking: Booking, slot: TrialSlot) {
    try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const from = process.env.FROM_EMAIL ?? 'noreply@kukka.info';
        const adminEmail = process.env.ADMIN_EMAIL ?? 'takahashi_s@kukka.info';
        const when = formatSlotDateTime(slot);

        const parentResult = await resend.emails.send({
            from,
            to: booking.email,
            subject: '【KuKKA】体験レッスンのご予約を承りました',
            html: `
<!DOCTYPE html>
<html lang="ja">
<body style="font-family: sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <h2 style="color: #4a5568; border-bottom: 2px solid #e2e8f0; padding-bottom: 12px;">
    体験レッスンのご予約ありがとうございます
  </h2>
  <p>${booking.parentName} 様</p>
  <p>以下の内容で体験レッスンのご予約を承りました。当日、教室にてお待ちしております。</p>
  <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
    <tr>
      <td style="padding: 10px; background: #f7fafc; font-weight: bold; width: 160px; border: 1px solid #e2e8f0;">日時</td>
      <td style="padding: 10px; border: 1px solid #e2e8f0;">${when}</td>
    </tr>
    <tr>
      <td style="padding: 10px; background: #f7fafc; font-weight: bold; border: 1px solid #e2e8f0;">コース</td>
      <td style="padding: 10px; border: 1px solid #e2e8f0;">${booking.course}</td>
    </tr>
    <tr>
      <td style="padding: 10px; background: #f7fafc; font-weight: bold; border: 1px solid #e2e8f0;">お子様のお名前</td>
      <td style="padding: 10px; border: 1px solid #e2e8f0;">${booking.childName}（${booking.childAge}）</td>
    </tr>
  </table>
  <p style="margin-top: 24px; font-size: 0.875rem; color: #718096;">
    日程の変更・キャンセルをご希望の場合は、このメールにご返信いただくか、お問い合わせフォームよりご連絡ください。
  </p>
</body>
</html>`,
        });
        if (parentResult.error) {
            console.error('Booking confirmation email (to parent) failed:', parentResult.error);
        }

        const adminResult = await resend.emails.send({
            from,
            to: adminEmail,
            subject: `【KuKKA】新規予約（${booking.parentName}様 / ${when}）`,
            html: `
<!DOCTYPE html>
<html lang="ja">
<body style="font-family: sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <h2 style="color: #4a5568; border-bottom: 2px solid #e2e8f0; padding-bottom: 12px;">
    新規の体験レッスン予約
  </h2>
  <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
    <tr>
      <td style="padding: 10px; background: #f7fafc; font-weight: bold; width: 160px; border: 1px solid #e2e8f0;">日時</td>
      <td style="padding: 10px; border: 1px solid #e2e8f0;">${when}</td>
    </tr>
    <tr>
      <td style="padding: 10px; background: #f7fafc; font-weight: bold; border: 1px solid #e2e8f0;">保護者様のお名前</td>
      <td style="padding: 10px; border: 1px solid #e2e8f0;">${booking.parentName}</td>
    </tr>
    <tr>
      <td style="padding: 10px; background: #f7fafc; font-weight: bold; border: 1px solid #e2e8f0;">お子様のお名前</td>
      <td style="padding: 10px; border: 1px solid #e2e8f0;">${booking.childName}（${booking.childAge}）</td>
    </tr>
    <tr>
      <td style="padding: 10px; background: #f7fafc; font-weight: bold; border: 1px solid #e2e8f0;">メールアドレス</td>
      <td style="padding: 10px; border: 1px solid #e2e8f0;"><a href="mailto:${booking.email}">${booking.email}</a></td>
    </tr>
    ${booking.phone ? `
    <tr>
      <td style="padding: 10px; background: #f7fafc; font-weight: bold; border: 1px solid #e2e8f0;">電話番号</td>
      <td style="padding: 10px; border: 1px solid #e2e8f0;">${booking.phone}</td>
    </tr>` : ''}
    <tr>
      <td style="padding: 10px; background: #f7fafc; font-weight: bold; border: 1px solid #e2e8f0;">コース</td>
      <td style="padding: 10px; border: 1px solid #e2e8f0;">${booking.course}</td>
    </tr>
  </table>
  <p style="margin-top: 24px; font-size: 0.875rem; color: #718096;">
    管理ダッシュボードでも確認できます。
  </p>
</body>
</html>`,
        });
        if (adminResult.error) {
            console.error('Booking notification email (to admin) failed:', adminResult.error);
        }
    } catch (error) {
        console.error('Booking email error (booking itself succeeded):', error);
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { parentName, childName, childAge, email, phone, course, trialSlotId } = body;

        if (!parentName || !childName || !childAge || !email || !course || !trialSlotId) {
            return NextResponse.json({ error: '必須項目が入力されていません。' }, { status: 400 });
        }

        const slot = await prisma.trialSlot.findUnique({ where: { id: Number(trialSlotId) } });
        if (!slot || slot.status !== 'OPEN') {
            return NextResponse.json(
                { error: 'この枠はすでに予約済みです。別の日時をお選びください。' },
                { status: 409 }
            );
        }

        const [booking] = await prisma.$transaction([
            prisma.booking.create({
                data: {
                    parentName,
                    childName,
                    childAge,
                    email,
                    phone: phone || null,
                    course,
                    preferredDate: slot.startTime,
                    trialSlotId: slot.id,
                    status: 'PENDING',
                },
            }),
            prisma.trialSlot.update({
                where: { id: slot.id },
                data: { status: 'FULL' },
            }),
        ]);

        await sendBookingEmails(booking, slot);

        return NextResponse.json({ success: true, booking }, { status: 201 });
    } catch (error) {
        console.error('Booking error:', error);
        return NextResponse.json(
            { error: '予約の送信に失敗しました。後でもう一度お試しください。' },
            { status: 500 }
        );
    }
}
