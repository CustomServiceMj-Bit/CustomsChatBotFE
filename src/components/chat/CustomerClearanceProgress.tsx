import { useFontSizeStore } from "@/store/useStore";
import { CustomsClearanceProgressProps } from "@/types/components/chat/types";

const CustomsClearanceProgress = ({ data }: CustomsClearanceProgressProps) => {
  const { fontSize } = useFontSizeStore();

  return (
    <div className="relative ml-1 border-l-2 border-gray-300 p-2">
      {data.map((item, index) => (
        <div
          key={index}
          className={`${index === data.length - 1 ? "mb-0" : "mb-6"} flex flex-col gap-1`}
        >
          <div className="bg-navy-950 absolute top-[12px] left-[-6.5px] aspect-square h-3 w-3 rounded-full" />
          <p
            className={`font-semibold ${fontSize === "xl" ? "text-xl" : "text-sm"}`}
          >
            {item.status}
          </p>
          <p
            className={`text-gray-600 ${fontSize === "xl" ? "text-lg" : "text-sm"}`}
          >
            {item.datetime}
          </p>
          {item.comment && (
            <p
              className={`${fontSize === "xl" ? "text-md" : "text-xs"} text-gray-500`}
            >
              {item.comment}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default CustomsClearanceProgress;
