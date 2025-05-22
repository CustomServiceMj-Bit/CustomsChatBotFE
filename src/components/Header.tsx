import Icon from "./Icon";
import { Button } from "./ui/button";
import GovernmentIcon from "/public/img/gov_icon.svg";

const Header = () => {
  return (
    <div className="flex h-14 min-h-14 items-center justify-between bg-white px-4">
      <Icon src={GovernmentIcon} alt="gorvernment-icon" size="lg" />
      <h1 className="absolute left-1/2 -translate-x-1/2 text-center text-lg font-semibold">
        국민비서 민서
      </h1>
      <Button className="bg-navy-950" onClick={() => window.location.reload()}>
        새로고침
      </Button>
    </div>
  );
};

export default Header;
