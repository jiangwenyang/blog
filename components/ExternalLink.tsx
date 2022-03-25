import classNames from "classnames";

interface Props {
  href: string;
  className?: string;
}

const ExternalLink: React.FC<Props> = ({ href, className, children }) => {
  return (
    <a
      className={classNames(
        "text-gray-500 hover:text-gray-600 transition flex flex-col items-center",
        className
      )}
      target="_blank"
      rel="noopener noreferrer"
      href={href}
    >
      {children}
    </a>
  );
};

export default ExternalLink;
