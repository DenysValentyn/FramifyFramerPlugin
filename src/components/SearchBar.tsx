import { Search, Menu, X } from "lucide-react"; // Import X for the close icon
import { ChangeEvent } from "react";
import { House, LogOut, Settings, Headset, ShoppingBag } from "lucide-react";
import { useAppContext } from "../AppContext";

interface SearchBarProps {
  category: string;
  setSearchKey: (searchKey: string) => void;
  setValid: (valid: boolean) => void;
}

const iconMapping: { [key: string]: JSX.Element } = {
  VisitWebsite: <House className="w-3 h-4 mr-[5px]" />,
  AccountDetails: <Settings className="w-3 h-4 mr-[5px]" />,
  CustomerSupport: <Headset className="w-3 h-4 mr-[5px]" />,
  DealsDiscounts: <ShoppingBag className="w-3 h-4 mr-[5px]" />,
  Logout: <LogOut className="w-3 h-4 mr-[5px]" />,
};

const SearchBar: React.FC<SearchBarProps> = ({ setSearchKey, category, setValid }) => {
  const { isMenuOpen, setMenuOpen, setFilterOpen, setSectionsOpen } =
    useAppContext();

  const toggleDropdown = () => {
    setMenuOpen(!isMenuOpen);
    setFilterOpen(false);
    setSectionsOpen(false);
  };

  const inputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchKey(e.target.value);
  };

  const itemClicked = () => {
    setMenuOpen(false);
  };

  const handleSignOut = () => {
    setMenuOpen(false);
    localStorage.removeItem("loginData");
    setValid(false);
  };

  return (
    <div className="relative">
      <div className="flex my-2.5">
        <div className="relative flex-1">
          <Search className="absolute w-3 h-3 transform -translate-y-1/2 left-3 top-1/2" />
          <input
            type="text"
            placeholder={`Search for ${category}`}
            className="w-[297px] secondary-background framer-secondary-border !pl-[30px] h-8 mr-[5px] border border-solid rounded-[6px] focus:outline-none focus:shadow-none"
            onInput={inputChange}
          />
        </div>
        <button
          className={`relative border border-solid secondary-background framer-secondary-border rounded-[6px] flex justify-center items-center w-8 h-8 overflow-hidden transition-transform duration-300`}
          onClick={toggleDropdown}
        >
          <X
            className={`absolute transition-transform duration-500 w-[15px] ${
              isMenuOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"
            }`}
            style={{ width: "20px", height: "100%" }} // Ensures full width and height
          />
          <Menu
            className={`absolute transition-transform duration-500 ${
              isMenuOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"
            }`}
            style={{ width: "20px", height: "100%" }} // Ensures full width and height
          />
        </button>
      </div>
      <div
        className={`absolute h-fit animblock right-0 z-10 w-48 shadow-lg framer-bg framer-bg framer-border rounded mt-1 ${
          isMenuOpen ? "open" : ""
        }`}
      >
        <ul>
          <li>
            <a
              target="_blank"
              className="flex m-[3px] rounded-[5px] px-2 py-2 cursor-pointer framer-hover"
              href="https://framify.design/"
              onClick={itemClicked}
            >
              {iconMapping["VisitWebsite"]} Visit Website
            </a>
          </li>
          <li>
            <a
              target="_blank"
              className="flex m-[3px] rounded-[5px] px-2 py-2 cursor-pointer framer-hover"
              href="https://framify.design/my-account/account-details"
              onClick={itemClicked}
            >
              {iconMapping["AccountDetails"]} Account Details
            </a>
          </li>
          <li>
            <a
              target="_blank"
              className="flex m-[3px] rounded-[5px] px-2 py-2 cursor-pointer framer-hover"
              href="https://framify.design/my-account/customer-support"
              onClick={itemClicked}
            >
              {iconMapping["CustomerSupport"]} Customer Support
            </a>
          </li>
          <li>
            <a
              target="_blank"
              className="flex m-[3px] rounded-[5px] px-2 py-2 cursor-pointer framer-hover"
              href="https://framify.design/my-account/deals-discounts"
              onClick={itemClicked}
            >
              {iconMapping["DealsDiscounts"]} Deals & Discounts
            </a>
          </li>
          <li
            className="flex m-[3px] rounded-[5px] px-2 py-2 cursor-pointer framer-hover"
            onClick={handleSignOut}
          >
            {iconMapping["Logout"]} Sign Out
          </li>
        </ul>
      </div>
      {/* Dropdown Menu */}
    </div>
  );
};

export default SearchBar;
