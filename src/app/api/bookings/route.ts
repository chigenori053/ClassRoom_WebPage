import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

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

        return NextResponse.json({ success: true, booking }, { status: 201 });
    } catch (error) {
        console.error('Booking error:', error);
        return NextResponse.json(
            { error: '予約の送信に失敗しました。後でもう一度お試しください。' },
            { status: 500 }
        );
    }
}
