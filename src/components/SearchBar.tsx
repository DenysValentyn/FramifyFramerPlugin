import { Search, Menu, X } from "lucide-react"; // Import X for the close icon
import { useState, ChangeEvent } from "react";

interface SearchBarProps {
  setSearchKey: (searchKey: string) => void;
}
const SearchBar: React.FC<SearchBarProps> = ({ setSearchKey }) => {
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
            placeholder="Search for Sections"
            className="w-[297px] bg-transparent framer-border !pl-[30px] h-8 mr-[5px] border border-solid rounded-[6px] focus:outline-none focus:shadow-none"
            onInput={inputChange}
          />
        </div>
        <button
          className="border border-solid framer-border rounded-[4px] flex justify-center items-center w-8 h-8 transition-transform duration-300"
          onClick={toggleDropdown}
        >
          {isDropdownOpen ? <X /> : <Menu />} {/* Change icon based on state */}
        </button>
      </div>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute right-0 z-10 w-48 mt-2 border rounded shadow-lg framer-bg framer-border">
          <ul className="py-2">
            <li className="px-4 py-2 cursor-pointer framer-hover">Option 1</li>
            <li className="px-4 py-2 cursor-pointer framer-hover">Option 2</li>
            <li className="px-4 py-2 cursor-pointer framer-hover">Option 3</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
