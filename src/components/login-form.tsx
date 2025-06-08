'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { authClient } from '@/lib/auth-client'

export function LoginForm({ className, ...props }: React.ComponentProps<'div'>) {
  const { data: session } = authClient.useSession()

  const handleSignupSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('submit')
    const formData = new FormData(e.currentTarget)
    const name = formData.get('name')
    const email = formData.get('email')
    const password = formData.get('password')
    console.log(name, email, password)

    authClient.signUp.email(
      {
        name: name as string,
        email: email as string,
        password: password as string,
      },
      {
        onError: () => {
          console.log('Sign up failed')
        },
        onSuccess: () => {
          console.log('Sign up successful')
        },
      }
    )
  }

  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email')
    const password = formData.get('password')
    authClient.signIn.email(
      {
        email: email as string,
        password: password as string,
      },
      {
        onError: () => {
          console.log('Sign in failed')
        },
        onSuccess: () => {
          console.log('Sign in successful')
        },
      }
    )
  }

  if (!!session) {
    return (
      <div>
        <p>Logged in as {session.user.name}</p>
        <Button onClick={() => authClient.signOut()}>Sign out</Button>
      </div>
    )
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>Enter your email below to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLoginSubmit}>
            <div className="flex flex-col gap-6">
              {/* <div className="grid gap-3">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" type="text" placeholder="name" required />
              </div> */}
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="m@example.com" required />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a href="#" className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" name="password" type="password" required />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Login
                </Button>
                <Button variant="outline" className="w-full">
                  Login with Google
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{' '}
              <a href="#" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
