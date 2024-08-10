import Image from "next/image";
import Link from "next/link";
import { Disclosure, Transition } from "@headlessui/react";
import { Container } from "./container";

export function FAQ() {
  return (
    <div id="faq">
      <Container>
        <div className="flex flex-col gap-12 lg:flex-row">
          <div className="text-center lg:w-5/12 lg:pl-12 lg:text-left">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white md:text-3xl lg:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              Find answers to some of the most commonly asked questions about
              our product.
            </p>
          </div>
          <div className="lg:w-7/12">
            <Disclosures />
          </div>
        </div>
      </Container>
    </div>
  );
}

export function Disclosures({ full = false }) {
  const faq = [
    {
      question: <>How is it so fast?</>,
      answer: (
        <>
          Our novel approach to virtual DOM optimization ensures high
          performance. Learn more about our{" "}
          <Link href="/blog/virtual-dom" className="text-primary-600 underline">
            virtual DOM
          </Link>
          and how it enables this speed. For additional details, check out our{" "}
          <Link
            href="/blog/behind-the-block"
            className="text-primary-600 underline"
          >
            block approach
          </Link>
          .
        </>
      ),
    },
    {
      question: <>How does it compare to other frameworks?</>,
      answer: (
        <>
          It depends on various factors. You can see our performance benchmarks
          at{" "}
          <a
            href="https://krausest.github.io/js-framework-benchmark/current.html"
            target="_blank"
            className="text-primary-600 underline"
          >
            JS Framework Benchmark
          </a>
          . Our framework is optimized for various use cases and delivers
          excellent performance.
        </>
      ),
    },
    {
      question: <>Does it work with my project?</>,
      answer: (
        <>
          Most likely! Check out our{" "}
          <Link href="/docs/install" className="text-primary-600 underline">
            installation guide
          </Link>{" "}
          to see how you can integrate it into your existing project.
        </>
      ),
    },
    {
      question: <>What are the limitations?</>,
      answer: (
        <>
          For a comprehensive list of limitations, refer to our{" "}
          <Link
            href="/docs/manual-mode/block#rules-of-blocks"
            className="text-primary-600 underline"
          >
            rules of blocks
          </Link>
          . We have also highlighted some important notes there.
        </>
      ),
    },
    {
      question: <>Is it memoized?</>,
      answer: (
        <>
          Yes, our framework uses memoization techniques to enhance performance.
          Read more about it in our{" "}
          <Link href="/blog/virtual-dom" className="text-primary-600 underline">
            virtual DOM
          </Link>{" "}
          article.
        </>
      ),
    },
    {
      question: <>What's the story behind the logo?</>,
      answer: (
        <>
          Our mascot is Mil the Lion, a friendly figure symbolizing strength and
          courage. He represents the robust nature of our framework. You can see
          him here:
          <Image
            src="./lion.svg"
            width={300}
            height={200}
            className="mt-5"
            alt="Mil the lion"
          />
        </>
      ),
    },
  ];

  return (
    <div className="divide-y divide-zinc-200 border-y border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">
      {faq.map((item, i) => (
        <Disclosure
          as="div"
          key={i}
          className={`mx-auto text-lg ${full ? "" : "max-w-2xl"}`}
        >
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full items-start justify-between py-6 text-left text-gray-400">
                <span className="font-medium text-gray-900 dark:text-white">
                  {item.question}
                </span>
                <span className="ml-6 flex h-7 items-center">
                  <svg
                    className={`arrow-down h-6 w-6 transform duration-300 ${open ? "rotate-180" : "rotate-0"}`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    ></path>
                  </svg>
                </span>
              </Disclosure.Button>
              <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Disclosure.Panel
                  className={`pr-12 duration-300 ease-in-out ${open ? "" : "hidden"}`}
                >
                  <p className="pb-6 text-base text-gray-600 dark:text-gray-400">
                    {item.answer}
                  </p>
                </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>
      ))}
    </div>
  );
}
