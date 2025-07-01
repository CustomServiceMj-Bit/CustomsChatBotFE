import { HEADER_TEXT, REFRESH_BUTTON } from "@/constants/texts";
import Icon from "./Icon";
import { Button } from "./ui/button";
import GovernmentIcon from "/public/img/gov_icon.svg";

const Header = () => {
  return (
    <div className="flex h-14 min-h-14 items-center justify-between bg-white px-4">
      <Icon src={GovernmentIcon} alt="gorvernment-icon" size="lg" />
      <h1 className="absolute left-1/2 -translate-x-1/2 text-center text-lg font-semibold">
        {HEADER_TEXT}
      </h1>
      <Button className="bg-navy-950" onClick={() => window.location.reload()}>
        {REFRESH_BUTTON}
      </Button>
    </div>
  );
};

export default Header;
