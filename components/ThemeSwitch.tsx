import { useTheme } from "next-themes";
import { LightModeRound, DarkModeRound } from "@ricons/material";

const ThemeSwitch: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const isLight = theme === "light";

  return (
    <button
      className="w-9 h-9 px-1 z-20"
      onClick={() => setTheme(isLight ? "dark" : "light")}
    >
      {isLight ? (
        <DarkModeRound className="text-gray-500"></DarkModeRound>
      ) : (
        <LightModeRound className="text-amber-200"></LightModeRound>
      )}
    </button>
  );
};

export default ThemeSwitch;
