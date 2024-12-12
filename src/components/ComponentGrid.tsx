import ComponentCard from "./ComponentCard";
import { useEffect } from "react";
import { Section } from "../App";

interface ComponentGridProps {
  data: Section[];
}
const ComponentGrid = ({ data }: ComponentGridProps) => {
  useEffect(() => {}, [data]);
  return (
    <div className="grid grid-cols-1">
      {data.map((item, index) => (
        <ComponentCard
          key={index}
          image={item.FeaturedImage}
          title={item.Name}
          url={item.FramerCode}
        />
      ))}
    </div>
  );
};

export default ComponentGrid;
