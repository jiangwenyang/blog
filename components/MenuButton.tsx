import classNames from "classnames";
import styles from "styles/menu-button.module.css";

type Props = {
  isOpen: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

const MenuButton: React.FC<Props> = ({ isOpen, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={classNames(styles["menu-button"], {
        [styles["is-open"]]: isOpen,
      })}
    />
  );
};

export default MenuButton;
