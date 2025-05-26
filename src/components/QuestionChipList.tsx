import { QuestionChipListProps } from "@/types/components/types";
import Chip from "./Chip";
import React from "react";

const QuestionChipList = ({
  list,
  activeChip,
  onChipClick,
}: QuestionChipListProps) => {
  return (
    <div
      className="flex h-9 items-center gap-2 overflow-x-auto whitespace-nowrap"
      style={{ scrollbarWidth: "none" }}
    >
      {list.map((value, index) => {
        return (
          <div key={index}>
            <Chip
              text={value}
              isActive={activeChip === value}
              onClick={() => onChipClick(value)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default React.memo(QuestionChipList);
