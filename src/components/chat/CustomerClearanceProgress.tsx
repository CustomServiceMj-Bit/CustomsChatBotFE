import { CustomsClearanceProgressProps } from "@/types/components/chat/types";

const CustomsClearanceProgress = ({ data }: CustomsClearanceProgressProps) => {
  return (
    <div className="relative ml-1 border-l-2 border-gray-300 p-2">
      {data.map((item, index) => (
        <div
          key={index}
          className={`${index === data.length - 1 ? "mb-0" : "mb-6"} flex flex-col gap-1`}
        >
          <div className="bg-navy-950 absolute top-[12px] left-[-6.5px] aspect-square h-3 w-3 rounded-full" />
          <p className="text-sm font-semibold">{item.status}</p>
          <p className="text-xs text-gray-600">{item.datetime}</p>
          {item.comment && (
            <p className="text-xs text-gray-500">{item.comment}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default CustomsClearanceProgress;
