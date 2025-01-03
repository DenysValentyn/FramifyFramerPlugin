import { Logo } from "./Logo.tsx";
import { Input } from "./Input.tsx";

export const LoginModal = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center p-4">
      <div className=" rounded-2xl  w-[290px] h-[400px] max-w-md relative">
        <div className="flex flex-col  w-[290px] h-[400px] items-center">
          <div className="flex items-center mb-5">
            <Logo />
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold pb-2.5">Welcome to Framify</h2>
            <p className="text-[14px] font-medium">
              Drag & Drop from Over 780+ Premium Framer Assets
            </p>
          </div>

          <div className="w-full mt-[40px]">
            <div className="mb-2.5">
              <Input label="Full Name" placeholder="Mark Williams" />
            </div>
            <div className="mb-2.5">
              <Input
                label="License key"
                type="text"
                placeholder="License key"
              />
            </div>
            <div className="mb-5">
              <button className="bg-gradient-to-r from-[#5426C6] to-[#09C3F6] text-white px-6 py-3 rounded-md hover:opacity-80 transition-opacity h-[38px]">
                Log In
              </button>
            </div>
          </div>

          <div className="w-full mt-2.5"></div>

          <div className="w-full space-y-4 text-center">
            <p className="text-gray-600 text-[12px] pb-2.5">
              Don't have an Account?{" "}
              <a
                href="#"
                className="text-[#632DE9] hover:text-purple-700 font-medium underline"
              >
                Activate License Key
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
