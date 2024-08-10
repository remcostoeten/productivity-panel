import { Container } from "lucide-react";
import Link from "next/link";
import Blur from "./Blur";

export function CTA() {
  return (
    <div className="relative">
      <Blur />
      <Container>
        <div className="relative">
          <div className="mt-48 m-auto space-y-6 md:w-8/12 lg:w-7/12">
            <h1 className="text-center text-4xl font-bold text-gray-800 dark:text-white md:text-5xl">
              Get Started in Seconds
            </h1>
            <p className="mt-3 text-center text-zinc-600 dark:text-zinc-300 md:text-md lg:text-lg">
              Welcome to a new way to build fast, modern web applications.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link href="/docs/introduction" className="h-12 w-full sm:w-max">
                bbb
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
