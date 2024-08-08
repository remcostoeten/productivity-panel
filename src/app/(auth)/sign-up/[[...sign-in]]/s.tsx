import { Button, Input } from '@/components/ui/';
import { siteConfig } from '@/core/data/site-config';
import { DotsVerticalIcon } from '@radix-ui/react-icons';
import { ChromeIcon } from 'lucide-react';

export default function SignUpPage() {
  return (
    <div className="auth">
      <div className="scroll-conttainer ">
        <div className="left">
          <div className="auth-bg">
            <img src="/effect.png" alt="" />
          </div>
          {/* <div className="flex flex-col justify-center w-full max-w-md p-8 space-y-6 bg-gradient-to-b from-black to-purple-900 text-white"> */}
          <div className="text-center">
            <h1 className="text-4xl font-bold">{siteConfig.lastName}</h1>
            <h2 className="mt-2 text-lg">
              Create your {siteConfig.companyName[0]} account
            </h2>
          </div>
          <div className="space-y-4">
            <Button className="w-full bg-white text-black">
              <ChromeIcon className="mr-2" />
              Continue with Google
            </Button>
            <Button className="w-full bg-white text-black">
              <AppleIcon className="mr-2" />
              Continue with Apple
            </Button>
            <div className="flex items-center justify-center space-x-2">
              <span className="block w-full border-t border-gray-600" />
              <span className="text-sm">OR</span>
              <span className="block w-full border-t border-gray-600" />
            </div>
            <Input
              type="email"
              placeholder="Enter your email"
              className="w-full"
            />
            <Button className="w-full bg-white text-black">
              Continue with email
            </Button>
          </div>
          <div className="text-center">
            <p className="text-sm">
              Already have a Clay account?{' '}
              <a href="#" className="underline">
                Sign in
              </a>
            </p>
          </div>
          <div className="text-center text-sm space-x-4">
            <a href="#" className="underline">
              Help
            </a>
            <a href="#" className="underline">
              Terms
            </a>
            <a href="#" className="underline">
              Privacy
            </a>
          </div>
        </div>
      </div>
      <div className="right">
        <DotsVerticalIcon width={200} />
      </div>
      {/* <div className="flex flex-col items-center justify-center w-full  text-white">
                <div className="flex flex-col items-center space-y-4">
                    <div className="relative w-40 h-40">
                        <ShapesIcon className="w-full h-full" />
                    </div>
                    <h1 className="text-4xl font-bold">Clay</h1>
                    <p className="text-center">Welcome</p>
                    <p className="text-center max-w-sm">
                        Clay is the most powerful way to remember who you've met and what matters to them.
                    </p>
                    <div className="flex space-x-2">
                        <span className="block w-2 h-2 bg-white rounded-full" />
                        <span className="block w-2 h-2 bg-gray-500 rounded-full" />
                        <span className="block w-2 h-2 bg-gray-500 rounded-full" />
                    </div>
                </div>
            </div> */}
    </div>
  );
}

function AppleIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z" />
      <path d="M10 2c1 .5 2 2 2 5" />
    </svg>
  );
}

function ChromeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <line x1="21.17" x2="12" y1="8" y2="8" />
      <line x1="3.95" x2="8.54" y1="6.06" y2="14" />
      <line x1="10.88" x2="15.46" y1="21.94" y2="14" />
    </svg>
  );
}

function ShapesIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8.3 10a.7.7 0 0 1-.626-1.079L11.4 3a.7.7 0 0 1 1.198-.043L16.3 8.9a.7.7 0 0 1-.572 1.1Z" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <circle cx="17.5" cy="17.5" r="3.5" />
    </svg>
  );
}
