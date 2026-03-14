import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
    const slots = await prisma.trialSlot.findMany({
        where: {
            status: 'OPEN',
            startTime: { gte: new Date() },
        },
        orderBy: { startTime: 'asc' },
    });
    return NextResponse.json(slots);
}
