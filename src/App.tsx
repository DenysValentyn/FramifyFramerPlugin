import { framer } from "framer-plugin";
import { useState, useEffect } from "react";
import { LoginModal } from "./components/LoginModal";
import SearchBar from "./components/SearchBar";
import FilterSection from "./components/FilterSection";
import ComponentGrid from "./components/ComponentGrid";
import categoriesData from "./categories.json";
import jsonData from "./sections.json";
import "./App.css";

framer.showUI({
  position: "top right",
  width: 240,
  height: 95,
});
/*
 * @framerSupportedLayoutWidth auto
 * @framerSupportedLayoutHeight auto
 */

export interface Section {
  Slug: string;
  Featured: boolean;
  New: boolean;
  Plan: string;
  FeaturedImage: string;
  Name: string;
  FramerCode: string;
  SectionsCategory: string;
  PreviewLink: string;
}

export interface SubCategory {
  Title: string;
  SubCategories: Array<string>;
}

interface JsonData {
  Sections: Section[];
  Websites: Section[];
  Components: Section[];
  StarterPages: Section[];
}

export type CategoryKey = keyof JsonData;

export function App() {
  const [data, setData] = useState<Section[]>([]);
  const [subCategories, setSubCategories] = useState<string[]>([]);
  const [searchKey, setSearchKey] = useState<string>("");
  const [category, setCategory] = useState<CategoryKey>("Sections");
  const [subCategory, setSubCategory] = useState<string>("404");
  const allData = jsonData as JsonData;

  useEffect(() => {
    setData(allData["Sections"]);
    // setCategories(categoriesData);
  }, []);

  useEffect(() => {
    if (allData.hasOwnProperty(category) && Array.isArray(allData[category])) {
      if (searchKey !== "") {
        const results = allData[category]
          .filter((item) =>
            item.Name.toLowerCase().includes(searchKey.toLowerCase())
          )
          .sort();
        setData(results);
      } else {
        let filteredData = allData[category]
          .filter((data) => {
            return data.SectionsCategory === category;
          })
          .sort();
        if (filteredData.length) {
          setData(filteredData);
        }
      }
    }
  }, [searchKey]);

  useEffect(() => {
    if (allData.hasOwnProperty(category) && Array.isArray(allData[category])) {
      let filteredData = [];
      if (subCategory === "") {
        filteredData = allData[category];
      } else {
        filteredData = allData[category]
          .filter((data) => {
            return data.SectionsCategory === subCategory;
          })
          .sort();
      }
      console.log(filteredData);
      if (filteredData.length) {
        setData(filteredData);
      }
    }
  }, [subCategory]);

  useEffect(() => {
    categoriesData.map((data) => {
      if (data.Title === category) {
        setSubCategories(data.SubCategories);
      }
    });

    if (allData.hasOwnProperty(category) && Array.isArray(allData[category])) {
      let filteredData = allData[category];
      if (filteredData.length) {
        setData(filteredData);
      }
    }
  }, [category]);

  return (
    <main>
      {/* <p>
                Welcome! Check out the{" "}
                <a href="https://framer.com/developers/plugins/introduction" target="_blank">
                    Docs
                </a>{" "}
                to start. You have {selection.length} {layer} selected.
            </p>
            <button className="framer-button-primary" onClick={handleAddSvg}>
                Insert Logo
            </button> */}
      <div className="min-h-screen">
        {/* <div className="fixed top-0 z-10 framer-bg">
          <div className="flex flex-col justify-between pb-2.5 border-b border-solid framer-border">
            <SearchBar setSearchKey={setSearchKey} category={category} />
            <FilterSection
              setCategory={setCategory}
              setSubCategory={setSubCategory}
              subCategories={subCategories}
            />
          </div>
        </div>

        <div style={{ paddingTop: "90px" }}>
          {" "}
          <ComponentGrid data={data} category={category} />
        </div> */}
        <LoginModal/>
      </div>
    </main>
  );
}
