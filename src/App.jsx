import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import ThemeBtn from "./components/ThemeBtn";
import { ThemeProvider } from "./context/theme.js";

function App() {
  const [length, setLength] = useState(8);
  const [password, setPassword] = useState("");
  const [includeNumber, setIncludeNumber] = useState(false);
  const [includeChar, setIncludeChar] = useState(false);
  const [uppercase, setUppercase] = useState(false);

  const passwordReference = useRef(null);

  const copyPasswordToClipboard = () => {
    window.navigator.clipboard.writeText(password);
    passwordReference.current?.select();
  };

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyz";

    if (includeChar) str += "!@#$%^&*~€_+-";
    if (includeNumber) str += "0123456789";
    if (uppercase) str += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for (let i = 0; i < length; i++) {
      const char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, includeNumber, includeChar, uppercase]);

  useEffect(() => {
    generatePassword();
  }, [length, includeNumber, includeChar, uppercase]);

  const [theme, setTheme] = useState("light");

  const darkTheme = () => {
    setTheme("dark");
  };
  const lightTheme = () => {
    setTheme("light");
  };

  useEffect(() => {
    document.querySelector("html").classList.remove("dark", "light");
    document.querySelector("html").classList.add(theme);
  }, [theme]);

  return (
    <ThemeProvider value={{ theme, darkTheme, lightTheme }}>
      <div className="w-full h-screen overflow-hidden">
        <div className="w-full flex justify-center items-center mt-5 lg:mt-5 ">
          <ThemeBtn />
        </div>
        <div className="h-auto w-full md:w-1/2 border-1 border-black bg-gray-200 dark:bg-slate-800 shadow-xl rounded-lg absolute p-4 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
          <div>
            <h1 className="text-xl md:text-3xl font-bold text-center text-black dark:text-gray-100">
              Password Generator
            </h1>
          </div>
          <div className="flex mt-5 overflow-hidden rounded-md">
            <input
              type="text"
              placeholder="Password"
              value={password}
              className="outline-none border bg-transparent bg-gradient-to-r from-blue-500 via-green-500 to-indigo-600 inline-block text-transparent bg-clip-text border-gray-900 p-2 w-full text-3xl font-normal "
              onChange={(e) => setPassword(e.target.value)}
              ref={passwordReference}
            />
            <button
              onClick={copyPasswordToClipboard}
              disabled={!password}
              className={`px-3 py-3 ${
                password
                  ? "bg-blue-500 hover:bg-blue-800"
                  : "bg-gray-400 cursor-not-allowed"
              } hover:text-gray-200 outline-none shrink-0`}
            >
              Copy
            </button>
          </div>

          <div className="mt-10 ml-5 flex flex-col gap-4 font-semibold italic text-lg ">
            <div className="flex items-center justify-center gap-5">
              <span
                className={`ms-3 text-gray-600 dark:text-gray-300 ${
                  uppercase ? "text-sky-600" : ""
                } font-semibold italic text-xl`}
              >
                Uppercase
              </span>
              <label
                defaultChecked={uppercase}
                onChange={() => {
                  setUppercase((prev) => !prev);
                }}
                className="flex items-center cursor-pointer"
              >
                <input type="checkbox" value="" className="sr-only peer" />
                <div className="relative w-11 h-6 bg-blue-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-blue-500 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-center gap-5">
              <span
                className={`ms-3 text-gray-600 dark:text-gray-300 ${
                  includeNumber ? "text-sky-600" : ""
                } font-semibold italic text-xl`}
              >
                Number
              </span>
              <label
                defaultChecked={includeNumber}
                onChange={() => {
                  setIncludeNumber((prev) => !prev);
                }}
                className="flex items-center cursor-pointer"
              >
                <input type="checkbox" value="" className="sr-only peer" />
                <div className="relative w-11 h-6 bg-blue-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-blue-500 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-center gap-5">
              <span
                className={`ms-3 text-gray-600 dark:text-gray-300 ${
                  includeChar ? "text-blue-600" : ""
                } font-semibold italic text-xl`}
              >
                Characters
              </span>
              <label
                defaultChecked={includeChar}
                onChange={() => {
                  setIncludeChar((prev) => !prev);
                }}
                className="flex items-center cursor-pointer"
              >
                <input type="checkbox" value="" className="sr-only peer" />
                <div className="relative w-11 h-6 bg-blue-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-blue-500 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex flex-col gap-3 text-sky-500 items-center">
              <label
                htmlFor="length"
                className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-xl"
              >
                Password Length : {length}
              </label>
              <input
                type="range"
                className="w-1/2 cursor-pointer"
                onChange={(e) => setLength(e.target.value)}
                max={30}
                min={4}
                value={length}
              />
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
