import { useState, useEffect } from "react";
import github from "react-useanimations/lib/github";
import twitter from "react-useanimations/lib/twitter";
import { useTheme } from "next-themes";

import ExternalLink from "./ExternalLink";
import UseAnimationsIcon from "./UseAnimationsIcon";

const Footer: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const isLight = theme === "light";

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <footer className="text-sm leading-6 text-center text-gray-500">
      <hr className="w-full border-1 border-gray-200 my-10" />
      <ul className="w-full flex flex-row gap-5 justify-center">
        <li>
          <ExternalLink href="https://github.com/jiangwenyang">
            <UseAnimationsIcon
              animation={github}
              strokeColor={isLight ? "#2e333a" : "#64748B"}
              label="Github"
            />
          </ExternalLink>
        </li>
        <li>
          <ExternalLink href="https://twitter.com/jiang_wenyang">
            <UseAnimationsIcon
              animation={twitter}
              strokeColor="#489be9"
              label="Twitter"
            />
          </ExternalLink>
        </li>
      </ul>
      <p>
        Power by
        <ExternalLink
          className="inline-flex px-2 underline"
          href="https://nextjs.org/"
        >
          Next.js
        </ExternalLink>
        &
        <ExternalLink
          className="inline-flex px-2 underline"
          href="https://vercel.com/"
        >
          Vercel
        </ExternalLink>
      </p>
    </footer>
  );
};

export default Footer;
