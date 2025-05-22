import { ICON_SIZE_MAP } from "@/constants/components/constants";
import { IconProps } from "@/types/components/types";
import Image from "next/image";

const Icon = ({ src, alt, size, className }: IconProps) => {
  const pixelSize = ICON_SIZE_MAP[size];

  return (
    <Image
      src={src}
      alt={alt}
      width={pixelSize}
      height={pixelSize}
      className={className}
    />
  );
};

export default Icon;
