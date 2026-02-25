import { cookies } from 'next/headers'

export async function getHasToken() {
  return !!(await cookies()).get('prod')?.value
}