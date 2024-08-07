// import { SignUp } from '@clerk/nextjs';

// /**
//  * The Signup page component.
//  * @returns The signup page.
//  */
// export default function Page() {
//   return (
//     <main className="container mx-auto flex min-h-screen items-center justify-center">
//       <SignUp />
//     </main>
//   );
// }
'use client';

import { UserAuthForm } from '@/app/(marketing)/_components/user-auth-form';
import BrandLogo from '@/components/theme/BrandLogo';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/core/helpers/cn';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function SignUpPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute left-4 top-4 md:left-8 md:top-8',
        )}
      >
        <>
          <ChevronLeft className="mr-2 size-4" />
          Back
        </>
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center gap-6 sm:w-[350px]">
        <div className="flex flex-col gap-2 text-center">
          <BrandLogo />{' '}
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome to Remco`s panel.
          </h1>
          <p className="text-muted-foreground text-sm">
            Sign up for an account
          </p>
        </div>
        <UserAuthForm />
        <p className="text-muted-foreground px-8 text-center text-sm">
          <Link
            href="/signin"
            className="hover:text-brand underline underline-offset-4"
          >
            Already have an account? Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
