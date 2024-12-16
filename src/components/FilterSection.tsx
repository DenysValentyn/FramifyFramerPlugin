import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import { Columns2, LayoutGrid, PanelsTopLeft, ChevronDown } from "lucide-react";

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
  const [isFitlerOpen, setFilterOpen] = useState<boolean>(false);
  const [selectedfilter, setFilterCaption] = useState<string>("Sections");
  const [slectedCategory, setSelectedCategory] =
    useState<string>("Select Subcategory");
  useState<string>("Select Subcategory");
  const sectionsRef = useRef<HTMLDivElement | null>(null);

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

  const handleSubcategoryClick = (category: string) => {
    setCategory(category);
    setSelectedCategory(
      category.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())
    );
    setSectionsOpen(false); // Close dropdown after selection
  };

  return (
    <div>
      <div className="flex">
        {/* Dropdown for Sections */}
        <div
          className="relative w-[120px]  h-[31px]"
          onClick={() => {
            setFilterOpen(!isFitlerOpen);
            setSectionsOpen(false);
          }}
        >
          <button
            className={`flex w-[120px] justify-between items-center px-2.5 h-[31px] mr-[5px] transition-all duration-250 ease-in-out transform border border-solid framer-border framer-bg rounded-[4px] hover:bg-transparent active:bg-transparent focus:bg-transparent 
            }`}
          >
            {selectedfilter}
            <ChevronDown className="w-[12px]"></ChevronDown>
          </button>

          {/* Dropdown for Sections */}
          <div
            className={`absolute h-[250px] h-fit  framer-bg framer-border rounded mt-1 z-10 shadow-md transition-all duration-250 ease-in-out transform ${
              isFitlerOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-2"
            }`}
          >
            <ul className="w-[120px] py-2 h-fit">
              <li
                className="flex px-4 py-2 cursor-pointer framer-hover"
                onClick={() => handleSubcategoryClick("test")}
              >
                <span className="text-2.5">test</span>
              </li>
            </ul>
          </div>
        </div>
        <div
          className="relative w-[209px] pl-2.5 h-[31px]"
          onClick={() => {
            setSectionsOpen(!isSectionsOpen);
            setFilterOpen(false);
          }}
        >
          <button
            className={`flex justify-between items-center border framer-border w-[209] px-2.5 h-[31px] mr-[5px] transition-all duration-250 ease-in-out transform border border-solid  framer-bg rounded-[4px] hover:bg-transparent active:bg-transparent focus:bg-transparent 
            }}`}
          >
            {slectedCategory}
            <ChevronDown className="w-[12px]"></ChevronDown>
          </button>
          {/* Dropdown for Sections */}
          <div
            className={`absolute h-[250px] overflow-y-scroll framer-bg framer-border rounded mt-1 z-10 shadow-md transition-all duration-250 ease-in-out transform ${
              isSectionsOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-2"
            }`}
            style={{
              scrollbarWidth: "none",
            }}
          >
            <ul
              className={`w-[189px] py-2 ${
                isSectionsOpen ? "block" : "hidden"
              }`}
            >
              {subCategories.map((category, index) => (
                <li
                  key={index}
                  className="flex px-4 py-2 cursor-pointer framer-hover"
                  onClick={() => handleSubcategoryClick(category)}
                >
                  <span className="text-2.5">
                    {category
                      .replace(/-/g, " ")
                      .replace(/\b\w/g, (char) => char.toUpperCase())}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
