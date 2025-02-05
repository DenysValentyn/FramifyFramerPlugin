import React, { useState, useEffect, useRef } from "react";
import {
  Columns2,
  LayoutGrid,
  PanelsTopLeft,
  ChevronDown,
  LayersIcon,
} from "lucide-react";
import { useAppContext } from "../AppContext";
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
  const {
    isFilterOpen,
    setFilterOpen,
    isMenuOpen,
    setMenuOpen,
    isSectionsOpen,
    setSectionsOpen,
  } = useAppContext();
  const [selectedfilter, setFilterCaption] = useState<string>("Sections");
  const [slectedCategory, setSelectedCategory] =
    useState<string>("Select Subcategory");
  const sectionsRef = useRef<HTMLDivElement | null>(null);
  const filterRef = useRef<HTMLDivElement | null>(null);
  const FilterCategories: CategoryKey[] = [
    "Sections",
    "Components",
    "Websites",
    "Pages",
  ];

  const iconMapping: { [key: string]: JSX.Element } = {
    Sections: <Columns2 className="w-3 h-4 mr-[5px]" />,
    Components: <LayoutGrid className="w-3 h-4 mr-[5px]" />,
    Websites: <PanelsTopLeft className="w-3 h-4 mr-[5px]" />,
    Pages: <LayersIcon className="w-3 h-4 mr-[5px]" />,
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
      setSubCategory("");
      setSelectedCategory("All");
      // setSubCategory(subCategories[0]);
      // setSelectedCategory(
      //   subCategories[0]
      //     .replace(/-/g, " ")
      //     .replace(/\b\w/g, (char) => char.toUpperCase())
      // );
    }
  }, [subCategories]);

  const handleSubcategoryClick = (category: string) => {
    setSubCategory(category);
    setSelectedCategory(
      category.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())
    );
    setFilterOpen(true);
    setSectionsOpen(false); // Close dropdown after selection
    setMenuOpen(false);
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
          className="relative w-[130]  h-[31px]"
          onClick={() => {
            setFilterOpen(!isFilterOpen);
            setSectionsOpen(false);
            setMenuOpen(false);
          }}
        >
          <button
            className={`flex w-[130px] secondary-background justify-between items-center pr-2.5 h-[31px] mr-[8px] transition-all duration-250 ease-in-out transform border border-solid framer-secondary-border rounded-[6px]
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
            className={`absolute h-fit animblock framer-bg framer-border rounded-[6px] mt-1 z-10 shadow-md ${
              isFilterOpen ? "open" : ""
            } `}
            ref={filterRef}
          >
            <ul className="w-[130px] h-fit">
              {FilterCategories.map((item, index) => (
                <li
                  key={index}
                  className="flex m-[3px] rounded-[5px] px-2 py-2 cursor-pointer framer-hover"
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
          className="relative w-[194px] h-[31px]"
          onClick={() => {
            setFilterOpen(false);
            setSectionsOpen(!isSectionsOpen);
            setMenuOpen(false);
          }}
        >
          <button
            className={`flex justify-between items-center framer-secondary-border px-2.5 h-[31px] mr-[5px] transition-all duration-250 ease-in-out transform border border-solid secondary-background rounded-[6px] 
            }}`}
          >
            {slectedCategory}
            <ChevronDown className="w-[12px]"></ChevronDown>
          </button>
          {/* Dropdown for subcategories */}
          <div
            className={`absolute h-[194px] max-h-fit animblock overflow-y-scroll framer-bg framer-border rounded mt-1 z-10 shadow-md ${
              isSectionsOpen ? "open" : ""
            }`}
            style={{
              scrollbarWidth: "none",
            }}
          >
            <ul className={`w-[194px]`}>
              {subCategories.map((category, index) => (
                <li
                  key={index}
                  className="flex m-[3px] rounded-[5px] px-2.5 py-2 cursor-pointer framer-hover"
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
