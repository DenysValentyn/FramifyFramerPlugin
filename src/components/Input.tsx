interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input = ({ label, type = "text", ...props }: InputProps) => {
  return (
    <div className="w-full">
      <input
        type={type}
        className="w-[290px] h-[34px] px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#989799] focus:border-transparent"
        {...props}
      />
    </div>
  );
};
