'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { requireAdminAuth } from '@/lib/auth';

export async function login(formData: FormData) {
    const password = formData.get('password');

    if (password === process.env.ADMIN_PASSWORD) {
        const cookieStore = await cookies();
        cookieStore.set('admin_auth', 'true', { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 60 * 60 * 24 });
        redirect('/dashboard');
    } else {
        return { error: 'パスワードが間違っています。' };
    }
}

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.delete('admin_auth');
    redirect('/');
}

export async function updateBookingStatus(id: number, status: string) {
    await requireAdminAuth();

    await prisma.booking.update({
        where: { id },
        data: { status }
    });

    revalidatePath('/bookings');
}

export async function updateInquiryStatus(id: number, status: string) {
    await requireAdminAuth();

    await prisma.inquiry.update({
        where: { id },
        data: { status },
    });

    revalidatePath('/inquiries');
}
