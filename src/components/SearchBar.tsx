import { Search, Menu, X } from "lucide-react"; // Import X for the close icon
import { useState, ChangeEvent } from "react";

interface SearchBarProps {
  category: string;
  setSearchKey: (searchKey: string) => void;
}
const SearchBar: React.FC<SearchBarProps> = ({ setSearchKey, category }) => {
  const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const inputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchKey(e.target.value);
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
          className={`relative border border-solid secondary-background framer-secondary-border rounded-[4px] flex justify-center items-center w-8 h-8 overflow-hidden transition-transform duration-300`}
          onClick={toggleDropdown}
        >
          <X
            className={`absolute transition-transform duration-500 w-[15px] ${
              isDropdownOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"
            }`}
            style={{ width: "20px", height: "100%" }} // Ensures full width and height
          />
          <Menu
            className={`absolute transition-transform duration-500 ${
              isDropdownOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"
            }`}
            style={{ width: "20px", height: "100%" }} // Ensures full width and height
          />
        </button>
      </div>

      <div
        className={`absolute h-fit right-0 z-10 w-48 shadow-lg framer-bg framer-bg framer-border rounded mt-1 transition-all duration-250 ease-in-out transform ${
          isDropdownOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-2"
        }`}
      >
        <ul className="py-2">
          <li className="px-4 py-2 cursor-pointer framer-hover">Option 1</li>
          <li className="px-4 py-2 cursor-pointer framer-hover">Option 2</li>
          <li className="px-4 py-2 cursor-pointer framer-hover">Option 3</li>
        </ul>
      </div>
      {/* Dropdown Menu */}
    </div>
  );
};

export default SearchBar;
