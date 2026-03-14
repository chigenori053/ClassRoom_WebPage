'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import { gasCreateEvent, gasUpdateEvent, gasDeleteEvent } from '@/lib/gas';

/** datetime-local 入力値（ローカル時刻）を JST として Date に変換 */
function parseJST(str: string): Date {
  return new Date(str + ':00+09:00');
}

export async function createSchedule(formData: FormData) {
  const title = formData.get('title') as string;
  const startTime = formData.get('startTime') as string;
  const endTime = formData.get('endTime') as string;
  const description = (formData.get('description') as string) || null;
  const location = (formData.get('location') as string) || 'KuKKA プログラミング教室';

  const startDate = parseJST(startTime);
  const endDate = parseJST(endTime);

  const gasResult = await gasCreateEvent({
    title,
    startTime: startDate.toISOString(),
    endTime: endDate.toISOString(),
    description: description ?? undefined,
    location,
  });

  await prisma.schedule.create({
    data: {
      title,
      startTime: startDate,
      endTime: endDate,
      description,
      location,
      gasEventId: gasResult.success ? (gasResult.eventId ?? null) : null,
    },
  });

  revalidatePath('/schedules');
  redirect('/schedules');
}

export async function updateSchedule(id: number, formData: FormData) {
  const title = formData.get('title') as string;
  const startTime = formData.get('startTime') as string;
  const endTime = formData.get('endTime') as string;
  const description = (formData.get('description') as string) || null;
  const location = (formData.get('location') as string) || 'KuKKA プログラミング教室';

  const startDate = parseJST(startTime);
  const endDate = parseJST(endTime);

  const existing = await prisma.schedule.findUnique({ where: { id } });

  if (existing?.gasEventId) {
    await gasUpdateEvent(existing.gasEventId, {
      title,
      startTime: startDate.toISOString(),
      endTime: endDate.toISOString(),
      description: description ?? undefined,
      location,
    });
  } else {
    const gasResult = await gasCreateEvent({
      title,
      startTime: startDate.toISOString(),
      endTime: endDate.toISOString(),
      description: description ?? undefined,
      location,
    });
    if (gasResult.success && gasResult.eventId) {
      await prisma.schedule.update({ where: { id }, data: { gasEventId: gasResult.eventId } });
    }
  }

  await prisma.schedule.update({
    where: { id },
    data: { title, startTime: startDate, endTime: endDate, description, location },
  });

  revalidatePath('/schedules');
  redirect('/schedules');
}

export async function deleteSchedule(id: number) {
  const schedule = await prisma.schedule.findUnique({ where: { id } });

  if (schedule?.gasEventId) {
    await gasDeleteEvent(schedule.gasEventId);
  }

  await prisma.schedule.delete({ where: { id } });
  revalidatePath('/schedules');
}
