import { ChipProps } from "@/types/components/types";

const Chip = ({ text, onClick }: ChipProps) => {
  return (
    <span
      onClick={onClick}
      className={
        "border-input inline-flex h-9 w-fit cursor-pointer items-center justify-center rounded-2xl border-[1.4px] bg-white px-3 transition duration-300 hover:border-blue-300 hover:bg-blue-100"
      }
    >
      <p className="m-0 text-sm">{text}</p>
    </span>
  );
};

export default Chip;
