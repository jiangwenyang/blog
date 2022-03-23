interface Props {
  href: string;
  className?: string;
}

const ExternalLink: React.FC<Props> = ({ href, className, children }) => {
  return (
    <a
      className="text-gray-500 hover:text-gray-600 transition flex flex-col items-center"
      target="_blank"
      rel="noopener noreferrer"
      href={href}
    >
      {children}
    </a>
  );
};

export default ExternalLink;
