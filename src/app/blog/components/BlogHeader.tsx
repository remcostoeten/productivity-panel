/**
 * This code was generated by Builder.io.
 */

interface BlogHeaderProps {
  category: string;
  date: string;
  title: string;
  subtitle: string;
}

const BlogHeader: React.FC<BlogHeaderProps> = ({
  category,
  date,
  title,
  subtitle,
}) => {
  return (
    <div className="flex flex-col items-center pt-3 pr-20 pb-6 pl-20 w-full bg-[linear-gradient(0deg,#000_0%,rgba(255,255,255,0.00_100%),linear-gradient(90deg,rgba(0,112,243,0.20)_0%,rgba(248,28,229,0.20)_100%))] max-md:px-5 max-md:max-w-full">
      <div className="flex flex-col pb-8 max-w-full w-[1200px]">
        <div className="flex flex-col w-full text-sm text-zinc-500">
          <div className="flex flex-col items-start pt-2.5 pb-px w-full max-md:max-w-full">
            <a href="#" className="text-zinc-500 hover:text-zinc-400">
              ← Back to Blog
            </a>
          </div>
        </div>
        <div className="flex flex-col mt-16 max-w-[860px] w-[860px] max-md:mt-10 max-md:max-w-full">
          <div className="flex flex-wrap gap-3 items-center w-full text-sm max-md:max-w-full">
            <div className="flex self-stretch my-auto leading-none text-gray-200 whitespace-nowrap">
              <div className="flex flex-col">
                <div className="flex px-3 py-1.5 bg-[linear-gradient(108deg,rgba(0,112,243,0.30_0%,rgba(248,28,229,0.30)_100%))] rounded-[32px]">
                  <div>{category}</div>
                </div>
              </div>
            </div>
            <div className="self-stretch my-auto leading-none text-neutral-400">
              {date}
            </div>
          </div>
          <h1 className="mt-6 w-full text-5xl font-bold tracking-tighter text-white leading-[60px] max-md:max-w-full max-md:text-4xl max-md:leading-[56px]">
            {title}
          </h1>
          <p className="mt-6 w-full text-2xl tracking-tighter leading-loose text-zinc-500 max-md:max-w-full">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogHeader;
