import Image from "next/image";
import Link from "next/link";
import Wyze from "@/../public/15.png";
import HackClub from "@/../public/15.png";;
import DonaAI from "@/../public/15.png";;
import LLMReport from "@/../public/15.png";;
import Texts from "@/../public/15.png";;
import Container from "./container";

const entries = [
  {
    image: Wyze,
    name: "Wyze",
    url: "wyze.com",
  },
  {
    image: HackClub,
    name: "Hack Club",
    url: "hackclub.com",
  },
  {
    image: DonaAI,
    name: "Dona AI",
    url: "dona.ai",
  },
  {
    image: LLMReport,
    name: "LLM Report",
    url: "llm.report",
  },
  {
    image: Texts,
    name: "Texts",
    url: "texts.com",
  },
];

export function Showcase() {
  return (
    <div className="my-42 relative">
      <Container>
        <div className="mb-16">
          <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 dark:text-white md:text-4xl">
            Showcase
          </h2>
          <p className="mt-3 text-center text-zinc-600 dark:text-zinc-300 md:text-md lg:text-lg">
            Check out some of the amazing projects built using our technology.
          </p>
        </div>

        <ShowcaseSlider />

        <div className="flex flex-wrap justify-center gap-6 mt-8 items-center">
          <Link
            href="/showcase"
            className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:bg-purple-600/10 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 dark:before:border-zinc-700 dark:before:bg-zinc-800 sm:w-max"
          >
            <span className="relative text-base font-semibold text-purple-600 dark:text-white">
              View More
            </span>
          </Link>
        </div>
      </Container>
    </div>
  );
}

export const ShowcaseSlider = () => {
  return (
    <div className="slider">
      <div className="slide-track-10 hover:pause mt-6 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5">
        {[...entries, ...entries, ...entries].map(({ image, name, url }, i) => (
          <a
            key={name}
            href={`https://${url}`}
            target="_blank"
            rel="noopener noreferrer"
            className="pr-10 space-y-6 text-center w-[24rem] relative grayscale-[50%] opacity-90 hover:opacity-100 transition duration-200 hover:grayscale-0"
          >
           
            <div>
              <h4 className="text-2xl text-gray-700 dark:text-white">{name}</h4>
              <span className="block text-sm text-gray-500">{url}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
