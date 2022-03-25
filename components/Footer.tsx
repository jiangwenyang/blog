import UseAnimations from "react-useanimations";
import github from "react-useanimations/lib/github";
import twitter from "react-useanimations/lib/twitter";
import ExternalLink from "./ExternalLink";
import UseAnimationsIcon from "./UseAnimationsIcon";

const Footer: React.FC = () => (
  <footer className="text-sm leading-6 text-center text-gray-500">
    <hr className="w-full border-1 border-gray-200 my-10" />
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

export default Footer;
