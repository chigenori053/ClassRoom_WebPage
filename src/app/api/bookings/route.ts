import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { parentName, childName, childAge, email, phone, course, preferredDate, notes } = body;

        if (!parentName || !childName || !childAge || !email || !course || !preferredDate) {
            return NextResponse.json({ error: '必須項目が入力されていません。' }, { status: 400 });
        }

        const booking = await prisma.booking.create({
            data: {
                parentName,
                childName,
                childAge,
                email,
                phone,
                course,
                preferredDate: new Date(preferredDate),
                notes,
            },
        });

        return NextResponse.json({ success: true, booking }, { status: 201 });
    } catch (error) {
        console.error('Booking Creation Error:', error);
        return NextResponse.json({ error: '予約の送信に失敗しました。後でもう一度お試しください。' }, { status: 500 });
    }
}
