import { Columns2, CopyIcon } from "lucide-react";
interface RemixCardProps {
  image: string;
  url: string;
  title: string;
}

const RemixCard = ({ image, url, title }: RemixCardProps) => {
  const handleRemixClick = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <>
      <div className="pt-[15px]">
        <div className="flex flex-col border framer-border secondary-background rounded-[8px] mb-[8px]">
          <div className="relative group">
            <img
              loading="lazy"
              src={image}
              alt="Component Preview"
              className="w-full h-[300px] aspect-video object-cover object-top rounded-[10px] p-[5px]"
            />
            <div className="absolute inset-0 transition-all duration-200 bg-black bg-opacity-0 rounded-lg group-hover:bg-opacity-5" />
          </div>
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-[14px]">{title}</span>
          <button
            className={`flex w-[79px] secondary-background justify-between items-center px-2.5 h-[31px] mr-[5px] transition-all duration-250 ease-in-out transform border border-solid framer-secondary-border rounded-md
            }`}
          >
            <a
              className="flex items-center"
              onClick={() => handleRemixClick(url)}
            >
              <CopyIcon className="w-[10px] h-[10px]"></CopyIcon>
              <span className="pl-1">Remix</span>
            </a>
          </button>
        </div>
      </div>
    </>
  );
};

export default RemixCard;
