import type { Animation } from 'react-useanimations/utils';

import UseAnimations from 'react-useanimations';
import classNames from 'classnames';

interface Props {
  animation: Animation;
  label?: string;
  size?: number;
  className?: string;
  [key: string]: unknown;
}

const UseAnimationsIcon: React.FC<Props> = ({
  animation,
  size = 36,
  label,
  className,
  ...otherProps
}) => (
  <UseAnimations
    animation={animation}
    size={size}
    render={(eventProps, animationProps) => (
      <div
        className={classNames('flex flex-col items-center', className)}
        {...eventProps}
      >
        <div {...animationProps} />
        {label}
      </div>
    )}
    {...otherProps}
  />
);

export default UseAnimationsIcon;
