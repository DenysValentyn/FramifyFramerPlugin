import React, { useState, useEffect, useRef } from "react";
import { Columns2, LayoutGrid, PanelsTopLeft, ChevronDown } from "lucide-react";
import { CategoryKey } from "../App";

interface FilterSectionProps {
  subCategories: string[];
  setCategory: (category: CategoryKey) => void;
  setSubCategory: (category: string) => void;
}
// Define a functional component
const FilterSection: React.FC<FilterSectionProps> = ({
  subCategories,
  setSubCategory,
  setCategory,
}) => {
  const [isSectionsOpen, setSectionsOpen] = useState<boolean>(false);
  const [isFitlerOpen, setFilterOpen] = useState<boolean>(false);
  const [selectedfilter, setFilterCaption] = useState<string>("Sections");
  const [slectedCategory, setSelectedCategory] =
    useState<string>("Select Subcategory");
  const sectionsRef = useRef<HTMLDivElement | null>(null);
  const FilterCategories: CategoryKey[] = [
    "Sections",
    "Components",
    "Websites",
  ];

  const iconMapping: { [key: string]: JSX.Element } = {
    Sections: <Columns2 className="w-3 h-4 mr-2" />,
    Components: <LayoutGrid className="w-3 h-4 mr-2" />,
    Websites: <PanelsTopLeft className="w-3 h-4 mr-2" />,
  };
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

  useEffect(() => {
    if (subCategories.length) {
      setSubCategory(subCategories[0]);
      setSelectedCategory(
        subCategories[0]
          .replace(/-/g, " ")
          .replace(/\b\w/g, (char) => char.toUpperCase())
      );
    }
  }, [subCategories]);

  const handleSubcategoryClick = (category: string) => {
    setSubCategory(category);
    setSelectedCategory(
      category.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())
    );
    setSectionsOpen(false); // Close dropdown after selection
  };

  const handleCategoryClick = (category: CategoryKey) => {
    setCategory(category);
    setFilterCaption(category);
  };

  return (
    <div>
      <div className="flex">
        {/* Dropdown for Sections */}
        <div
          className="relative w-[175px]  h-[31px]"
          onClick={() => {
            setFilterOpen(!isFitlerOpen);
            setSectionsOpen(false);
          }}
        >
          <button
            className={`flex w-[175px] secondary-background justify-between items-center px-2.5 h-[31px] mr-[5px] transition-all duration-250 ease-in-out transform border border-solid framer-secondary-border rounded-[4px]
            }`}
          >
            <div className="flex px-2 py-2">
              {iconMapping[selectedfilter]}
              {selectedfilter}
            </div>
            <ChevronDown className="w-[12px]"></ChevronDown>
          </button>

          {/* Dropdown for Sections */}
          <div
            className={`absolute h-fit  framer-bg framer-border rounded mt-1 z-10 shadow-md transition-all duration-250 ease-in-out transform ${
              isFitlerOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-2"
            }`}
          >
            <ul className="w-[175px] py-2 h-fit">
              {FilterCategories.map((item, index) => (
                <li
                  key={index}
                  className="flex px-4 py-2 cursor-pointer framer-hover"
                  onClick={() => handleCategoryClick(item)}
                >
                  {iconMapping[item]}
                  <span className="text-2.5">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div
          className="relative w-[159px] pl-2.5 h-[31px]"
          onClick={() => {
            setSectionsOpen(!isSectionsOpen);
            setFilterOpen(false);
          }}
        >
          <button
            className={`flex justify-between items-center border framer-secondary-border px-2.5 h-[31px] mr-[5px] transition-all duration-250 ease-in-out transform border border-solid secondary-background rounded-[4px] 
            }}`}
          >
            {slectedCategory}
            <ChevronDown className="w-[12px]"></ChevronDown>
          </button>
          {/* Dropdown for Sections */}
          <div
            className={`absolute h-[160px] overflow-y-scroll framer-bg framer-border rounded mt-1 z-10 shadow-md transition-all duration-250 ease-in-out transform ${
              isSectionsOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-2"
            }`}
            style={{
              scrollbarWidth: "none",
            }}
          >
            <ul
              className={`py-2 w-[148px] ${
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
