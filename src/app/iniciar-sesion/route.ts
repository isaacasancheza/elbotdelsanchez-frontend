import { cognito, signIn } from '@/auth'

export async function GET() {
  await signIn(cognito.id)
}
