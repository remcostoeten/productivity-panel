import {
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    Input,
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { CopyIcon, EditIcon, MoveIcon, TrashIcon } from "lucide-react";
import { ColorFolderProps } from "../types.color-tool";

export default function ColorFolder({
  folder,
  deleteFolder,
  deleteColor,
  copyToClipboard,
  startEditingColor,
  editingColor,
  editedCssVar,
  setEditedCssVar,
  saveEditedColor,
  openMoveColorDialog,
}: ColorFolderProps) {
  return (
    <div key={folder.name} className="p-4 bg-[#161717] rounded-lg shadow-md">
      <div className="grid gap-4 w-full">
        <div className="p-4 !pb-0 vercel-card rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex flex-col">
              <h3 className="text-md font-bold">{folder.name}</h3>
              <p className="text-neutral-500 text-xs">{folder.description}</p>
            </div>
            <Tooltip delayDuration={55}>
              <TooltipTrigger>
                <Button
                  className="flex items-center justify-center group"
                  variant="outline"
                  size="icon"
                  onClick={() => deleteFolder(folder.name)}
                >
                  <TrashIcon className="w-4 h-4 text-gray-500 group-hover:text-red-500 transition-colors duration-200" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  Remove the folder <i>&apos;{folder.name}&apos;</i>
                </p>
              </TooltipContent>
            </Tooltip>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {folder.colors.map((colorItem) => (
              <div
                key={`${colorItem.color}-${colorItem.cssVar}`}
                className="relative bg-[var(--color-card)] p-2 rounded-lg flex flex-col items-center justify-center border"
              >
                <div
                  className="w-12 h-12 rounded-full"
                  style={{ backgroundColor: colorItem.color }}
                />
                <div className="relative text-xs mt-2 text-muted-foreground">
                  {editingColor === colorItem ? (
                    <Input
                      value={editedCssVar}
                      onChange={(e) => setEditedCssVar(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          saveEditedColor();
                        }
                      }}
                      className="w-24 text-xs px-2 py-1 rounded-md bg-dark-section--lighter text-muted-foreground"
                      autoFocus
                    />
                  ) : (
                    <>
                      <div>{colorItem.cssVar}</div>
                      <div className="text-xs">{colorItem.color}</div>
                    </>
                  )}
                </div>
                <div className="absolute top-0 right-0">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Button
                        className="bg-black bg-opacity-10 rounded-bl-full"
                        size="icon"
                        variant="ghost"
                      >
                        <DotsVerticalIcon />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Color operations</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => copyToClipboard(colorItem.cssVar)}
                        >
                          <CopyIcon width={16} />
                        </Button>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => startEditingColor(colorItem)}
                        >
                          <EditIcon width={16} />
                        </Button>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => openMoveColorDialog(colorItem)}
                        >
                          <MoveIcon width={16} />
                        </Button>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => deleteColor(folder.name, colorItem)}
                        >
                          <TrashIcon className="w-4 h-4 text-destructive" />
                        </Button>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
