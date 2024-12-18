import { Draggable } from "framer-plugin";

interface ComponentCardProps {
  image: string;
  url: string;
  title: string;
}

const ComponentCard = ({ image, url, title }: ComponentCardProps) => {
  return (
    <Draggable
      data={{
        type: "detachedComponentLayers",
        url: url,
        previewImage: image,
        layout: true,
      }}
    >
      <div className="pt-[15px]">
        <div className="flex flex-col border framer-border secondary-background rounded-[8px] mb-[8px]">
          <div className="relative cursor-pointer group">
            <img
              src={image}
              alt="Component Preview"
              className="w-full aspect-video object-contain rounded-[10px] p-[5px]"
            />
            <div className="absolute inset-0 transition-all duration-200 bg-black bg-opacity-0 rounded-lg group-hover:bg-opacity-5" />
          </div>
        </div>
        <span className="text-[12px] mt-2">{title}</span>
      </div>
    </Draggable>
  );
};

export default ComponentCard;
