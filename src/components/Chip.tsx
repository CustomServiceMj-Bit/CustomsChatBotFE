import { ChipProps } from "@/types/components/types";

const Chip = ({ text, isActive, onClick }: ChipProps) => {
  return (
    <span
      onClick={onClick}
      className={`inline-flex h-9 w-fit cursor-pointer items-center justify-center rounded-2xl border-[1.4px] px-3 transition duration-300 hover:border-blue-100 hover:bg-blue-100 ${isActive ? "border-blue-100 bg-blue-100" : "border-input bg-white"}`}
    >
      <p className="m-0 text-sm">{text}</p>
    </span>
  );
};

export default Chip;
