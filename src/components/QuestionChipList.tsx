import { QuestionChipListProps } from "@/types/components/types";
import Chip from "./Chip";
import React from "react";

const QuestionChipList = ({ list, onChipClick }: QuestionChipListProps) => {
  return (
    <div className="mt-1 ml-12 flex w-[290px] flex-wrap gap-2 self-start rounded-lg py-2">
      {list.map((value, index) => {
        return (
          <div key={index}>
            <Chip text={value} onClick={() => onChipClick(value)} />
          </div>
        );
      })}
    </div>
  );
};

export default React.memo(QuestionChipList);
