import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import { ChevronDown, Columns2, LayoutGrid, PanelsTopLeft } from "lucide-react";

interface FilterSectionProps {
  subCategories: string[];
  setCategory: (category: string) => void;
}
// Define a functional component
const FilterSection: React.FC<FilterSectionProps> = ({
  subCategories,
  setCategory,
}) => {
  const [isSectionsOpen, setSectionsOpen] = useState<boolean>(false);
  const sectionsRef = useRef<HTMLButtonElement | null>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (
        sectionsRef.current &&
        !sectionsRef.current.contains(event.target as Node)
      ) {
        setSectionsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const subcategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  return (
    <div>
      <div className="flex">
        <select
          id="countries"
          className="flex justify-between items-center w-[120px] px-2.5 h-[31px] mr-[5px] border border-solid framer-border framer-bg rounded-[4px]"
        >
          <option value="Sections">Sections</option>
          <option value="Components">Components</option>
          <option value="Pages">Pages</option>
          <option value="Templates">Templates</option>
        </select>

        <select
          id="subcategories"
          className="flex justify-between items-center w-[209px] px-2.5 h-[31px] border border-solid framer-border framer-bg rounded-[4px] text-purple-60"
          onChange={subcategoryChange}
        >
          {subCategories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Dropdown for Sections */}
      {isSectionsOpen && (
        <div
          className={`absolute framer-bg framer-border border w-[120px] rounded mt-1 z-10 transition-all duration-300 ease-in-out transform ${
            isSectionsOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-2"
          }`}
        >
          <ul className="py-2">
            <li className="flex px-4 py-2 cursor-pointer framer-hover">
              <Columns2 className="w-4 h-4 pr-[3px]" />
              <span className="text-2.5">Sections</span>
            </li>
            <li className="flex px-4 py-2 cursor-pointer framer-hover">
              <LayoutGrid className="w-4 h-4 pr-[3px]" />
              <span className="text-2.5">Components</span>
            </li>
            <li className="flex px-4 py-2 cursor-pointer framer-hover">
              <PanelsTopLeft className="w-4 h-4 pr-[3px]" />
              <span className="text-2.5">Pages</span>
            </li>
            <li className="flex px-4 py-2 cursor-pointer framer-hover">
              <img
                src="/category.svg"
                className="w-4 h-4 pr-[3px] framer-color-text"
              ></img>
              <span className="text-2.5">Templates</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default FilterSection;
