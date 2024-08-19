"use client";

import { Folder } from "@/core/server/db/schema/notes";
import { getFolders } from "@server/server-actions/folder-actions";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import IconButton from "./IconButton";
import SidebarItem from "./SidebarItem";

const Sidebar: React.FC = () => {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [activeFolder, setActiveFolder] = useState<string | null>(null);

  useEffect(() => {
    const loadFolders = async () => {
      const loadedFolders = await getFolders();
      setFolders(loadedFolders);
    };
    loadFolders();
  }, []);

  return (
    <nav className="flex flex-col pt-1 pr-4 pb-2 pl-4 border-solid border-r-[0.8px] border-r-neutral-800 min-w-[240px]">
      <div className="flex flex-col justify-center w-full">
        <div className="flex flex-col flex-1 w-full bg-black max-w-[400px] min-w-[232px]">
          <header className="flex flex-col pt-3 pb-2 w-full">
            <div className="flex gap-10 justify-between items-center px-4 w-full">
              <h2 className="self-stretch my-auto text-sm font-medium whitespace-nowrap text-stone-300">
                Explore
              </h2>
              <IconButton
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/28b672ca92dd569ba8e350a87c1469198034aca2938d0a5be86ed26fa657cafc?placeholderIfAbsent=true&apiKey=3cf1db2ab1694ce4be6d4ee2ec473197"
                alt="Explore icon"
                className="w-[23px]"
              />
            </div>
          </header>
          <div className="flex overflow-hidden flex-col justify-center pt-2 w-full min-h-[188px]">
            <div className="flex flex-col w-full min-h-[180px]">
              <div className="flex flex-col pb-1 w-full">
                <div className="flex gap-10 justify-between items-center px-3 w-full">
                  <div className="flex flex-col self-stretch pt-0.5 pb-px my-auto text-sm font-medium leading-none text-center text-neutral-400">
                    <div className="p-1 rounded-md">All blocks</div>
                  </div>
                  <IconButton
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/4da4ada8ebedffd8ce45d3de3b512a6ea02ea82093037c1b1fefe7b4e113a34f?placeholderIfAbsent=true&apiKey=3cf1db2ab1694ce4be6d4ee2ec473197"
                    alt="All blocks icon"
                    className="w-7 pr-2.5"
                  />
                </div>
              </div>
              <div className="flex flex-col flex-1 justify-center px-3.5 py-px w-full">
                <div className="flex flex-col w-full">
                  <AnimatePresence>
                    {folders.map((folder) => (
                      <motion.div
                        key={folder.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <SidebarItem
                          icon="https://cdn.builder.io/api/v1/image/assets/TEMP/85323b590c5498020da251a0a30971fa2d9f73e826d6247fd1eee3926ed3dd57?placeholderIfAbsent=true&apiKey=3cf1db2ab1694ce4be6d4ee2ec473197"
                          text={folder.name}
                          isActive={activeFolder === folder.id}
                          onClick={() => setActiveFolder(folder.id)}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
