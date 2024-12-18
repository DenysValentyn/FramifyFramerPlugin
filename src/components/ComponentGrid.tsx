import ComponentCard from "./ComponentCard";
import RemixCard from "./RemixCard";
import { Section } from "../App";

interface ComponentGridProps {
  data: Section[];
  category: string;
}
const ComponentGrid = ({ data, category }: ComponentGridProps) => {
  return (
    <div className="grid grid-cols-1 pb-3">
      {category === "Websites"
        ? data.map((item, index) => (
            <RemixCard
              key={index}
              image={item.FeaturedImage}
              title={item.Name}
              url={item.FramerCode}
            />
          ))
        : data.map((item, index) => (
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
