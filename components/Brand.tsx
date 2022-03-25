import Link from "next/link";
import Logo from "./Logo";
import Title from "./Title";

interface Props {
  hideTitle?: boolean;
}

const Brand: React.FC<Props> = ({ hideTitle = false }) => (
  <div>
    <Link href="/">
      <a className="flex items-center">
        <Logo />
        <Title className={hideTitle ? "hidden sm:block" : ""} />
      </a>
    </Link>
  </div>
);

export default Brand;
