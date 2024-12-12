import { framer, CanvasNode } from "framer-plugin";
import { useState, useEffect } from "react";
import { LoginModal } from "./components/LoginModal";
import SearchBar from "./components/SearchBar";
import FilterSection from "./components/FilterSection";
import ComponentGrid from "./components/ComponentGrid";
import jsonData from "./sections.json";
import categoriesData from "./categories.json";
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

export function App() {
  const [data, setData] = useState<Section[]>([]);
  const [categories, setCategories] = useState<SubCategory[]>([]);
  const [subCategories, setSubCategories] = useState<string[]>([]);
  const [searchKey, setSearchKey] = useState<string>("");
  const [category, setCategory] = useState<string>("Sections");
  const [filter, setFilter] = useState<string>("Sections");

  useEffect(() => {
    setData(jsonData);
    setCategories(categoriesData);
  }, []);

  useEffect(() => {
    if (filter !== "") {
      categories.map((data) => {
        if (data.Title === category) {
          return setSubCategories(data.SubCategories);
        }
      });
    }
  }, [categories]);

  useEffect(() => {
    if (filter !== "") {
      categoriesData.map((data) => {
        if (data.Title === category) {
          setSubCategories(data.SubCategories);
        }
      });
    }
  }, [filter]);

  useEffect(() => {
    console.log(searchKey);
    if (jsonData.length) {
      if (searchKey !== "") {
        const results = jsonData
          .filter((item) =>
            item.Name.toLowerCase().includes(searchKey.toLowerCase())
          )
          .sort();
        setData(results);
      } else {
        let filteredData = jsonData
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
    if (jsonData.length) {
      let filteredData = jsonData
        .filter((data) => {
          return data.SectionsCategory === category;
        })
        .sort();
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
        {/* <LoginModal/> */}
        <SearchBar setSearchKey={setSearchKey} />
        <FilterSection
          setCategory={setCategory}
          subCategories={subCategories}
        />
        <ComponentGrid data={data} />
      </div>
    </main>
  );
}
