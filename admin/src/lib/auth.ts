import { cookies } from 'next/headers';

export async function requireAdminAuth() {
  const cookieStore = await cookies();
  if (cookieStore.get('admin_auth')?.value !== 'true') {
    throw new Error('Unauthorized');
  }
}
