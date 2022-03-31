import classNames from "classnames";

import UseAnimations from "react-useanimations";
import menu from "react-useanimations/lib/menu3";

type Props = {
  isOpen: boolean;
  onClick: React.MouseEventHandler<HTMLDivElement>;
  className?: string;
};

const MenuButton: React.FC<Props> = ({ isOpen, onClick, className }) => {
  return (
    <UseAnimations
      animation={menu}
      size={32}
      reverse={isOpen}
      onClick={onClick}
      speed={2}
      render={(eventProps, animationProps) => (
        <button
          className={classNames("block sm:hidden relative z-20", className)}
          {...eventProps}
        >
          <div {...animationProps} />
        </button>
      )}
    />
  );
};

export default MenuButton;
