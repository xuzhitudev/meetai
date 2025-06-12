import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

import { auth } from '@/lib/auth'
import { HomeView } from '@/modules/home/ui/views/page'

const Page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    return redirect('/sign-in')
  }

  return <HomeView />
}

export default Page
