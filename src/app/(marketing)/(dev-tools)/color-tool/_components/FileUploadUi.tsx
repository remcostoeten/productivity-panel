import { UploadIcon } from "lucide-react";

export default function FileUploadUi({
  handleFileUpload,
}: {
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className=" file-uploader group relative grid h-52 w-full cursor-pointer place-items-center rounded-lg border-2 border-dashed border-muted-foreground/25 px-5 py-2.5 text-center transition hover:bg-muted/25 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
      <label
        htmlFor="image-upload"
        className="flex flex-col items-center justify-center gap-2"
      >
        <UploadIcon className="w-8 h-8 text-muted-foreground" />
        <span className="text-muted-foreground">Upload Image</span>
      </label>
      <input
        id="image-upload"
        type="file"
        className="sr-only"
        onChange={handleFileUpload}
        accept="image/*"
      />
    </div>
  );
}
