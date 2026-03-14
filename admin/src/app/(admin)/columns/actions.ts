'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import { generateSlug } from '@/lib/slug';

export async function createArticle(formData: FormData) {
  const title = formData.get('title') as string;
  const summary = formData.get('summary') as string;
  const body = formData.get('body') as string;
  const thumbnail = (formData.get('thumbnail') as string) || null;
  const category = (formData.get('category') as string) || null;
  const tags = (formData.get('tags') as string) || '';
  const metaDesc = (formData.get('metaDesc') as string) || null;
  const slugInput = (formData.get('slug') as string).trim();
  const slug = slugInput || generateSlug(title);

  await prisma.article.create({
    data: { slug, title, summary, body, thumbnail, category, tags, metaDesc },
  });

  revalidatePath('/columns');
  redirect('/columns');
}

export async function updateArticle(id: number, formData: FormData) {
  const title = formData.get('title') as string;
  const summary = formData.get('summary') as string;
  const body = formData.get('body') as string;
  const thumbnail = (formData.get('thumbnail') as string) || null;
  const category = (formData.get('category') as string) || null;
  const tags = (formData.get('tags') as string) || '';
  const metaDesc = (formData.get('metaDesc') as string) || null;
  const slugInput = (formData.get('slug') as string).trim();
  const slug = slugInput || generateSlug(title);

  await prisma.article.update({
    where: { id },
    data: { slug, title, summary, body, thumbnail, category, tags, metaDesc },
  });

  revalidatePath('/columns');
  redirect('/columns');
}

export async function publishArticle(id: number) {
  await prisma.article.update({
    where: { id },
    data: { status: 'PUBLISHED', publishedAt: new Date() },
  });
  revalidatePath('/columns');
}

export async function unpublishArticle(id: number) {
  await prisma.article.update({
    where: { id },
    data: { status: 'DRAFT', publishedAt: null },
  });
  revalidatePath('/columns');
}

export async function deleteArticle(id: number) {
  await prisma.article.delete({ where: { id } });
  revalidatePath('/columns');
}
