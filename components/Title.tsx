import classNames from "classnames";

interface Props {
  className?: string;
}

const Title: React.FC<Props> = ({ className }) => (
  <h1
    className={classNames(
      "text-rose-500 font-semibold text-2xl ml-4 capitalize tracking-wider",
      className
    )}
  >
    jiangwenyang&rsquo;s blog
  </h1>
);

export default Title;
