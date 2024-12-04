interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
  }
  
  export const Input = ({ label, type = "text", ...props }: InputProps) => {
    return (
      <div className="w-full">
        <label className="block text-gray-700 text-[12px] font-medium mb-2">
          {label}
        </label>
        <input
          type={type}
          className="w-[290px] h-[34px] px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          {...props}
        />
      </div>
    );
  }