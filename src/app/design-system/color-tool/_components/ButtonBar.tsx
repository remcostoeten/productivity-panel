import NativeSwitch from "@/components/ui/NativeSwitch";
import { Button, Tooltip, TooltipContent, TooltipTrigger } from "@c/ui";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import { ButtonBarProps } from "../types.color-tool";

export default function ButtonBar({
  pickingColor,
  setPickingColor,
  handleClearLocalStorage,
  setIsAddFolderDialogOpen,
  generateCode,
  useCssVariables,
  setUseCssVariables,
}: ButtonBarProps) {
  return (
    <div className="flex items-end gap-2 flex-wrap">
      <Button variant="outline" onClick={handleClearLocalStorage}>
        Clear Local Storage
      </Button>
      <Button
        variant={pickingColor ? "destructive" : "outline"}
        onClick={() => setPickingColor(!pickingColor)}
      >
        {pickingColor ? "Cancel" : "Pick Color"}
      </Button>
      <Button variant="outline" onClick={() => setIsAddFolderDialogOpen(true)}>
        Add Folder
      </Button>
      <Button variant="outline" onClick={generateCode}>
        Generate Code
      </Button>
      <div className="flex flex-row-reverse items-center gap-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground">
            {useCssVariables === true ? "CSS vars" : "HEX value"}
          </span>
          <Tooltip delayDuration={55}>
            <TooltipTrigger asChild>
              <QuestionMarkCircledIcon className="w-5 h-5 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <p>
                {useCssVariables === true ? (
                  <>
                    Use CSS variables for Tailwind config creation e.g.: <br />
                    <code>colorPicked: &#39;(var(--variableName))&#39;,</code>
                  </>
                ) : (
                  <>
                    Use HEX values for Tailwind config creation e.g.: <br />
                    <code>colorPicked: &#39;#FEFEFE&#39;,</code>
                  </>
                )}
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
        <NativeSwitch
          className="-translate-y-2"
          size="m"
          defaultChecked={useCssVariables}
          onChange={(value) => setUseCssVariables(value)}
        />
      </div>
    </div>
  );
}
