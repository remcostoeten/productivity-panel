import { useEffect } from "react";
import FileUploadUi from "./FileUploadUi";

interface ImageUploaderProps {
  imageSrc: string | null;
  setImageSrc: React.Dispatch<React.SetStateAction<string | null>>;
  pickingColor: boolean;
  color: string | null;
  handleColorPick: (event: React.MouseEvent<HTMLImageElement>) => void;
  handleMouseMove: (event: React.MouseEvent<HTMLImageElement>) => void;
  imgRef: React.RefObject<HTMLImageElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

export default function ImageUploader({
  imageSrc,
  setImageSrc,
  pickingColor,
  color,
  handleColorPick,
  handleMouseMove,
  imgRef,
  canvasRef,
}: ImageUploaderProps) {
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImageSrc(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const handlePaste = (event: ClipboardEvent) => {
      const items = event.clipboardData?.items;
      if (items) {
        for (let i = 0; i < items.length; i++) {
          if (items[i].type.indexOf("image") !== -1) {
            const blob = items[i].getAsFile();
            if (blob) {
              const reader = new FileReader();
              reader.onload = (e) => setImageSrc(e.target?.result as string);
              reader.readAsDataURL(blob);
            }
          }
        }
      }
    };

    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, [setImageSrc]);

  return (
    <div className="bg-card p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">Upload Image</h2>
      {imageSrc ? (
        <div className="relative">
          <img
            src={imageSrc}
            alt="Uploaded"
            ref={imgRef}
            className="w-full rounded-lg cursor-crosshair"
            onClick={handleColorPick}
            onMouseMove={handleMouseMove}
          />
          <canvas
            ref={canvasRef}
            className="hidden"
            width={imgRef.current?.width}
            height={imgRef.current?.height}
          />
          {pickingColor && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Last Picked Color</h3>
              {color && (
                <div className="flex items-center space-x-2">
                  <div
                    className="w-8 h-8 rounded-full border border-gray-300"
                    style={{ backgroundColor: color }}
                  ></div>
                  <span>{color}</span>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <FileUploadUi handleFileUpload={handleFileUpload} />
      )}
    </div>
  );
}
