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
            <h2 className="text-2xl font-semibold pb-2.5">
              Welcome to Framify
            </h2>
            <p className="text-[14px] font-medium">
              Instantly boost your Framer projects with our Pre-Built
              Components.
            </p>
          </div>

          <div className="w-full mt-[40px]">
            <div className="mb-[15px]">
              <Input label="Full Name" placeholder="Mark Williams" />
            </div>
            <div className="mb-5">
              <Input
                label="Type Your Password"
                type="password"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="w-full text-center space-y-4">
            <p className="text-gray-600 text-[12px] pb-2.5">
              Don't have an Account?{" "}
              <a
                href="#"
                className="text-[#632DE9] hover:text-purple-700 font-medium underline"
              >
                Activate License Key
              </a>
            </p>
            <a
              href="#"
              className="text-[#632DE9] hover:text-purple-700 font-medium underline"
            >
              Need Any Help?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
