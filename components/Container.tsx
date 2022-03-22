import classNames from "classnames";

interface Props {
  className?: string;
}

const Container: React.FunctionComponent<Props> = ({ className, children }) => {
  return (
    <div className={classNames(["container mx-auto px-5", className])}>
      {children}
    </div>
  );
};

export default Container;
