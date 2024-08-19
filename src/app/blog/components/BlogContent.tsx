// /**..

import CodeHighlight from "@/components/ui/CodeHighlight/CodeHighlight";

const BlogContent: React.FC = () => {
  return (
    <article className="flex flex-col grow shrink pr-20 pb-20 border-solid border-r-[0.8px] border-r-zinc-800 min-w-[240px] w-[792px] max-md:max-w-full">
      <div className="flex flex-col py-1 w-full max-md:max-w-full">
        <p className="flex flex-wrap items-start w-full text-lg tracking-normal text-gray-200 max-md:max-w-full">
          In 2023, Vercel Functions added support for{" "}
          <a href="#" className="text-lg leading-loose text-blue-500">
            streaming HTTP responses
          </a>
          .
        </p>
        <p className="mt-7 mr-6 text-lg tracking-normal leading-7 text-gray-200 max-md:mr-2.5 max-md:max-w-full">
          This feature has been enabled for frameworks like Next.js (App
          Router), SvelteKit, Remix, and more. We've been progressively rolling
          out streaming to more frameworks over the past two years, and we're
          beginning to roll out streaming for{" "}
          <span className="z-10 self-center -mt-6 ml-20 text-lg tracking-normal leading-loose text-blue-500">
            all functions
          </span>
        </p>
        <h2 className="flex flex-col items-start pb-0.5 mt-16 w-full text-3xl font-bold tracking-tight leading-none text-gray-200 max-md:mt-10 max-md:max-w-full">
          What changes when streaming responses?
        </h2>
        <p className="mt-6 text-lg tracking-normal leading-7 text-gray-200 max-md:max-w-full">
          When your Vercel Functions stream responses instead of buffering, you
          can immediately return results to your visitors—either an API function
          response or a server-side template.
        </p>
        <h2 className="flex flex-col items-start pb-0.5 mt-14 w-full text-3xl font-bold tracking-tight leading-none text-gray-200 max-md:mt-10 max-md:max-w-full">
          Responses on runtime errors
        </h2>
        <p className="mt-6 text-lg tracking-normal leading-7 text-gray-200 max-md:max-w-full">
          When streaming, response headers are sent immediately with the initial
          stream. If there is a runtime error after the initial headers have
          been sent, the function closes the stream and logs an error to Vercel.
          For example:
        </p>
        <CodeHighlight
          title="api/index.js"
          language="js"
          code={`import { setTimeout } from "node:timers/promises";

export default async function (req, res) {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.write("Chunk 1");
  await setTimeout(1000);
  throw new Error("Oh no!");
}`}
        />
        <p className="pr-48 pl-48 mt-4 max-w-full text-sm leading-loose text-zinc-500 w-[775px] max-md:px-5">
          An example function that writes to the response with a delay.
        </p>
        <p className="mt-10 text-lg tracking-normal leading-7 text-gray-200 max-md:mt-10 max-md:max-w-full">
          When buffering a response and not streaming, this function would not
          respond for several seconds. Since the function throws an error before
          completion, it would respond with a{" "}
          <code className="self-start mt-8 text-base leading-loose text-white">
            500
          </code>{" "}
          error:
        </p>
        <CodeHighlight
          title="Response"
          >HTTP/2 500
cache-control: public, max-age=0, must-revalidate
content-type: text/plain; charset=utf-8
date: Mon, 24 Jun 2024 10:26:35 GMT
server: Vercel
strict-transport-security: max-age=63072000; includeSubDomains; preload
x-robots-tag: noindex
x-vercel-error: FUNCTION_INVOCATION_FAILED
x-vercel-id: cdg1::hgz6d-1719224792404-c4031128df3b
content-length: 56

A server error has occurred
FUNCTION_INVOCATION_FAILED`}
        />
        <p className="px-48 mt-4 max-w-full text-sm leading-loose text-zinc-500 w-[775px] max-md:px-5">
          An example of a 500 error response from a Vercel Function.
        </p>
        <p className="mt-12 mr-8 text-lg tracking-normal leading-7 text-gray-200 max-md:mt-10 max-md:mr-2.5 max-md:max-w-full">
          When streaming is enabled, the response status code and part of the
          body will have already been sent to the client. The stream will send
          the status code and part of the body before ending. For example, you
          would then see{" "}
          <code className="z-10 self-center mt-0 text-base tracking-normal leading-loose text-white">
            Oh no!
          </code>
        </p>
        <CodeHighlight>
          t="Streamed Response"
          code={`HTTP/2 200
age: 0
cache-control: public, max-age=0, must-revalidate
content-type: text/plain
date: Mon, 24 Jun 2024 10:29:58 GMT
server: Vercel
strict-transport-security: max-age=63072000; includeSubDomains; preload
x-robots-tag: noindex
x-vercel-cache: MISS
x-vercel-execution-region: iad1
x-vercel-id: cdg1::iad1::zclv9-1719224997952-452256b220b0

Chunk 1`}
        />
        <p className="pr-52 pl-52 mt-4 max-w-full text-sm leading-loose text-zinc-500 w-[775px] max-md:px-5">
          An example of a 200 response from a streamed function.
        </p>
        {/* Rest of the blog content... */}
      </div>
    </article>
  );
};

export default BlogContent;
