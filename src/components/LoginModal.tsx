import axios from "axios";
import { Logo } from "./Logo.tsx";
import { useEffect, useState } from "react";

const API_KEY =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5NGQ1OWNlZi1kYmI4LTRlYTUtYjE3OC1kMjU0MGZjZDY5MTkiLCJqdGkiOiIxZTg0M2EzN2JiYzJkY2M2Y2U4NDMyMWM5OWQyMzMzMTg4MDcxYTk4MDJjOGM5MWUzYTgwYTYyYzljOTM3ZTk5NzNmYTA1NmNmNDUxZDkxZiIsImlhdCI6MTczNTkxNDI0MC4yMzM5MDgsIm5iZiI6MTczNTkxNDI0MC4yMzM5MTEsImV4cCI6MjA1MTQ0NzA0MC4xNzY4MjgsInN1YiI6IjQwOTg5NjkiLCJzY29wZXMiOltdfQ.hCUYixdHoWglUUVMBNwr-o7CC9H3dmex_1NOcbGQyqPWO5Wy0zEDaWKSRC5x-r7bpLz5MFXxskA7is8F4Ff9Fnc9lyyEfArhr0whY_BHqwntDQZmU-V7rzwJi5QaTE5sSjHomUtB4kwb2BDsM0Rg5I8nhedBsTDY5zvKNJDyAXvyOk3KO82q-1CzbvuJ6CdtfXrJlScJswhPLDZynIvW5A90jnHqhOTmObULShFDJ4QjmMXzizU11y1GyhuAcUuYNdFESsgvt5TUv8KMYSRxEuuC7-Zbg28rBzoXaYyCgMHITRUZJb7MU9sFuP8jzisCrkrdxHWZ4XC6uOQiCy9TJe8cxnXvQNpRbhYFB_Z1T_TQ8guH9nCQAUOMYjfTmB9wGVIwSY9JB39Kk1P-idFHcFmTx4_bUzY2kCC5ngoyb7Y9_EQOuc3aH4mLBf5aHDpKlKJk7_eAfFv32wyT8ZN0dPfUm9ltlEHZJ4QPK4pHHPmUPUNeFvGabviIj0DGZhY7";
const VLIDATE_URL = "https://api.lemonsqueezy.com/v1/licenses/validate";
const CONFIG = {
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
  },
};

interface LoginModalProps {
  setValid: (valid: boolean) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ setValid }) => {
  const [userName, setUserName] = useState("");
  const [licenseKey, setLicenseKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  type LoginData = {
    userName: string;
    licenseKey: string;
  };

  // Save login data to localStorage
  const saveLoginData = (data: LoginData): void => {
    localStorage.setItem("loginData", JSON.stringify(data));
  };

  // Retrieve login data from localStorage
  const getLoginData = (): LoginData | null => {
    const data = localStorage.getItem("loginData");
    return data ? JSON.parse(data) : null;
  };

  // Clear login data from localStorage
  const clearLoginData = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("licenseKey");
  };

  useEffect(() => {
    const loginData = getLoginData();
    if (loginData) {
      setUserName(loginData.userName);
      setLicenseKey(loginData.licenseKey);
      setValid(true);
    }
  }, []);

  const handleLogin = () => {
    if (userName !== "" && licenseKey !== "") {
      setIsLoading(true);
      axios
        .post(
          VLIDATE_URL,
          {
            license_key: licenseKey,
          },
          CONFIG
        )
        .then((response) => {
          console.log(response);
          if (response.data.valid) {
            const customerName = response.data.meta.customer_name;
            const customerEmail = response.data.meta.customer_email;
            if (customerEmail !== userName) {
              setError("not a valid email");
              console.log("not valid email");
            } else {
              setValid(true);
              saveLoginData({ userName, licenseKey });
            }
          } else {
            console.log("not valid license key");
            setError("not valid license key");
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

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
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="MarkWilliams@framify.com"
                className="w-[290px] h-[34px] px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#989799] focus:border-transparent"
              />
            </div>
            <div className="mb-2.5">
              <input
                type="text"
                value={licenseKey}
                onChange={(e) => setLicenseKey(e.target.value)}
                placeholder="License key"
                className="w-[290px] h-[34px] px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#989799] focus:border-transparent"
              />
            </div>
            {error !== "" && (
              <div className="mb-2.5 flex justify-center items-center">
                <span className="text-center text-red-500 text-3">{error}</span>
              </div>
            )}
            <div className="mb-5">
              <button
                onClick={handleLogin}
                className={`bg-gradient-to-r from-[#5426C6] to-[#09C3F6] text-white px-6 py-3 rounded-md hover:opacity-80 transition-opacity h-[38px] ${
                  isLoading ? "cursor-not-allowed opacity-50" : ""
                }`}
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Log In"}
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
