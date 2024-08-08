import { Button } from '@/components/ui';
import Particles from '@/components/ui/particles';
import { SignIn } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';

export default function SignUpPage() {
  return (
    <>
      <Particles
        className="absolute  inset-0 pointer-events-none
         opacity-50 z-10"
        quantity={50}
        ease={702}
        size={0.5}
        staticity={2}
        color="#FFFFFF"
      />
      <div className="auth !max-h-screen relative">
        <Button className="z-50 underlie opacity-30 hover:opacity-100 transition-all duration-500 text-white absolute top-4 left-4">
          <Link href="/">Back home </Link>
        </Button>
        <div className="scroll-container">
          <div className="auth-bg inset-0 relative">
            <Image
              className="effect radius absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              width={555}
              height={753}
              src="/effect.png"
              alt=""
            />
          </div>
          <div className='z-50'>
              <SignIn />
          </div>
        </div>
      </div>
    </>
  );
}
