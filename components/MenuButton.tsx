import classNames from "classnames";
import styles from "styles/menu-button.module.css";

type Props = {
  isOpen: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
};

const MenuButton: React.FC<Props> = ({ isOpen, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={classNames(
        styles["menu-button"],
        "dark:bg-gray-300",
        {
          [styles["is-open"]]: isOpen,
        },
        className
      )}
    />
  );
};

export default MenuButton;
