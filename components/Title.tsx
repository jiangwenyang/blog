import classNames from "classnames";
import SITE_CONFIG from "site.config";
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
    {SITE_CONFIG.title}
  </h1>
);

export default Title;
