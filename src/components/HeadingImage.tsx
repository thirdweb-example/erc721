import { MediaRenderer } from "@thirdweb-dev/react";
import { DropSvg } from "./DropSvg";

interface HeadingImage { 
  src: string;
}

export const HeadingImage: React.FC<HeadingImage> = ({ src }) => {
  return (
    <div className="rounded-xl md:rounded-l-none overflow-hidden bg-white">
    <div>
      {src ? (
        <MediaRenderer
          src={src}
          width="100%"
          height="100%"
        />
      ) : (
        <DropSvg /* className="max-w-full max-h-full text-gray-400" */
        />
      )}
    </div>
  </div>
  )
}