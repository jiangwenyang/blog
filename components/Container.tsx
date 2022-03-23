import classNames from "classnames";

interface Props {
  className?: string;
}

const Container: React.FC<Props> = ({ className, children }) => {
  return (
    <div
      className={classNames(["container mx-auto px-5 max-w-2xl", className])}
    >
      {children}
    </div>
  );
};

export default Container;
