import UseAnimations from "react-useanimations";
import github from "react-useanimations/lib/github";
import twitter from "react-useanimations/lib/twitter";
import ExternalLink from "./ExternalLink";
import UseAnimationsIcon from "./UseAnimationsIcon";

const Footer: React.FC = () => (
  <footer className="flex flex-col justify-center items-start max-w-2xl mx-auto w-full my-8">
    <hr className="w-full border-1 border-gray-200 dark:border-gray-800 mb-8" />
    <ul className="w-full flex flex-row gap-5 justify-center">
      <li style={{ color: "#2e333a" }}>
        <ExternalLink href="https://github.com/jiangwenyang">
          <UseAnimationsIcon
            animation={github}
            strokeColor="#2e333a"
            label="Github"
          />
        </ExternalLink>
      </li>
      <li style={{ color: "#489be9" }}>
        <ExternalLink href="https://twitter.com/jiang_wenyang">
          <UseAnimationsIcon
            animation={twitter}
            strokeColor="#489be9"
            label="Twitter"
          />
        </ExternalLink>
      </li>
    </ul>
  </footer>
);

export default Footer;
