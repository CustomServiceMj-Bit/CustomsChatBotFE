import { useFontSizeStore } from "@/store/useStore";
import { Button } from "./ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import {
  FONT_SIZE_BUTTON,
  FONT_SIZE_BUTTON_TEXT,
  FONT_SIZE_DESCRIPTION,
} from "@/constants/texts";
import Icon from "./Icon";
import CloseIcon from "/public/icon/close.png";

const FontSizeDrawer = () => {
  const { fontSize, setFontSize } = useFontSizeStore();

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-full font-bold">
          {FONT_SIZE_BUTTON_TEXT}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="mx-auto flex w-full max-w-[430px] min-w-[330px] flex-col items-center justify-center gap-4 pt-4 pb-8">
        <DrawerClose asChild>
          <Button
            variant="ghost"
            className="absolute top-2 right-2 p-2 opacity-20 hover:bg-transparent hover:opacity-60"
          >
            <Icon src={CloseIcon as any} alt="close-button" size="lg" />
          </Button>
        </DrawerClose>
        <DrawerHeader className="gap-3">
          <DrawerTitle>{FONT_SIZE_BUTTON}</DrawerTitle>
          <DrawerDescription>{FONT_SIZE_DESCRIPTION}</DrawerDescription>
        </DrawerHeader>

        <div className="flex justify-center gap-5">
          <Button
            variant={fontSize === "sm" ? "default" : "outline"}
            className={`text-sm ${fontSize === "sm" ? "bg-blue-950" : ""}`}
            onClick={() => setFontSize("sm")}
          >
            {FONT_SIZE_BUTTON_TEXT}
          </Button>
          <Button
            variant={fontSize === "xl" ? "default" : "outline"}
            className={`text-xl ${fontSize === "xl" ? "bg-blue-950" : ""}`}
            onClick={() => setFontSize("xl")}
          >
            {FONT_SIZE_BUTTON_TEXT}
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default FontSizeDrawer;
