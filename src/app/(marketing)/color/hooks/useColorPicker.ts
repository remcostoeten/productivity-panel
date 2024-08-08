// src/app/ColorPicker/hooks/useColorPicker.ts

import { useCallback, useRef, useState } from 'react';
import { ColorItem, Folder } from '../_components/types.colors';
import { generateColorName } from '../utils/color-utils';

export function useColorPicker(
  folders: Folder[],
  activeFolder: string,
  setFolders: React.Dispatch<React.SetStateAction<Folder[]>>,
) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [color, setColor] = useState<string | null>(null);
  const [pickingColor, setPickingColor] = useState<boolean>(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleColorPick = useCallback(
    (event: React.MouseEvent<HTMLImageElement>) => {
      if (pickingColor && imgRef.current && canvasRef.current) {
        const rect = imgRef.current.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(imgRef.current, 0, 0, canvas.width, canvas.height);
          const pixelData = ctx.getImageData(x, y, 1, 1).data;
          const pickedColor = `#${pixelData[0].toString(16).padStart(2, '0')}${pixelData[1]
            .toString(16)
            .padStart(2, '0')}${pixelData[2].toString(16).padStart(2, '0')}`;

          const cssVarName = `--picker-${generateColorName(pickedColor)}`;
          const newColorItem: ColorItem = {
            color: pickedColor,
            cssVar: cssVarName,
          };

          setFolders((prevFolders) =>
            prevFolders.map((folder) =>
              folder.name === activeFolder
                ? { ...folder, colors: [...folder.colors, newColorItem] }
                : folder,
            ),
          );

          setColor(pickedColor);
        }
      }
    },
    [pickingColor, activeFolder, setFolders],
  );

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLImageElement>) => {
      if (pickingColor && imgRef.current && canvasRef.current) {
        const rect = imgRef.current.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(imgRef.current, 0, 0, canvas.width, canvas.height);
          const pixelData = ctx.getImageData(x, y, 1, 1).data;
          const hoverColor = `rgb(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]})`;

          event.currentTarget.style.cursor = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><circle cx="16" cy="16" r="14" fill="${hoverColor}" stroke="white" stroke-width="4"/></svg>') 16 16, auto`;
        }
      }
    },
    [pickingColor],
  );

  return {
    imageSrc,
    setImageSrc,
    color,
    pickingColor,
    setPickingColor,
    handleColorPick,
    handleMouseMove,
    imgRef,
    canvasRef,
  };
}
