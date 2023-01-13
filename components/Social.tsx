import github from "react-useanimations/lib/github";
import twitter from "react-useanimations/lib/twitter";
import { useTheme } from "next-themes";

import ExternalLink from "./ExternalLink";
import UseAnimationsIcon from "./UseAnimationsIcon";

const Social: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === "light";
  return (
    <ul className="flex flex-row gap-5 justify-center">
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
  );
};

export default Social;
