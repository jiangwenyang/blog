import { useRouter } from "next/router";
import classNames from "classnames";

interface Props {
  href: string;
  className?: string;
}

const Link: React.FC<Props> = ({ href, className, children }) => {
  const router = useRouter();
  const isPath = href.startsWith("/");

  const handleGoto = () => {
    isPath
      ? router.push(href)
      : window.open(href, "_blank", "noopener,noreferrer");
    return false;
  };

  return (
    <a
      className={classNames(
        "text-gray-500 hover:text-gray-600 transition cursor-pointer",
        className
      )}
      onClick={handleGoto}
    >
      {children}
    </a>
  );
};

export default Link;
