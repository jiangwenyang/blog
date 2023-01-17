import { useState, useEffect } from "react";
import SITE_CONFIG from "site.config";
import FooterNav from "./FooterNav";
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
        <div className="w-full max-w-2xl grid grid-cols-1 gap-4 pb-16 sm:grid-cols-3 mt-2">
          <FooterNav data={SITE_CONFIG.navs} />
          <FooterNav data={SITE_CONFIG.socials} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
