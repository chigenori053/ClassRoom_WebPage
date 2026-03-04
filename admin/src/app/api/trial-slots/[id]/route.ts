import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/db';
import { gasDeleteEvent } from '@/lib/gas';

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const cookieStore = await cookies();
  if (cookieStore.get('admin_auth')?.value !== 'true') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const slot = await prisma.trialSlot.findUnique({ where: { id: Number(id) } });

  if (!slot) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  if (slot.status === 'FULL') {
    return NextResponse.json({ error: '予約済みの枠は削除できません' }, { status: 400 });
  }

  if (slot.gasEventId) await gasDeleteEvent(slot.gasEventId);
  await prisma.trialSlot.delete({ where: { id: Number(id) } });

  return NextResponse.json({ success: true });
}
