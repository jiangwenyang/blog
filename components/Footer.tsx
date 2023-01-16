import { useState, useEffect } from "react";
import Social from "./Social";
import RecentMusic from "./RecentMusic";

const Footer: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <footer className="text-sm leading-6 text-center text-gray-500">
      <hr className="w-full border-1 border-gray-200 my-5" />
      <div className="justify-between gap-2 mx-auto">
        <RecentMusic />
        <Social />
      </div>
    </footer>
  );
};

export default Footer;
