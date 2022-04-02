import classNames from 'classnames';
import { useEffect, useState } from 'react';
import UseAnimations from 'react-useanimations';
import throttle from 'lodash/throttle';
import arrowUp from 'react-useanimations/lib/arrowUp';

interface Props {
  target?: string;
  offset?: number;
  // right和bottom暂时不使用，Tailwindcss目前不支持动态变量
  right?: number;
  bottom?: number;
}

const Backtop: React.FC<Props> = ({
  target,
  offset = 200,
  // right = 40,
  // bottom = 40,
  children,
}) => {
  const [container, setContainer] = useState<Document | Element | null>(null);
  const [el, setEl] = useState<Element | null>(null);

  const [visible, setVisible] = useState(false);

  const handleScroll = () => {
    if (!el) {
      return;
    }
    const scrollTop = el.scrollTop;
    setVisible(scrollTop >= offset);
  };

  const throllHanldeScroll = throttle(handleScroll, 300);

  const init = () => {
    const container: Document | Element | null = document;
    let el: Element | null = document.documentElement;

    if (typeof target === 'string') {
      const targetEl = document.querySelector(target);
      if (!targetEl) {
        return;
      }
      el = targetEl;
    }
    setEl(el);
    setContainer(container);

    container?.addEventListener('scroll', handleScroll);
  };

  const handleBacktop = () => {
    if (!el) return;
    el.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    init();
    return () => container?.removeEventListener('scroll', throllHanldeScroll);
  });

  return (
    <div
      className={classNames(
        'fixed right-1 bottom-1 sm:right-10 sm:bottom-10',
        visible ? 'block' : 'hidden'
      )}
    >
      {children || (
        <UseAnimations
          animation={arrowUp}
          size={40}
          onClick={handleBacktop}
          strokeColor="#fff"
          render={(eventProps, animationProps) => (
            <button
              className="shadow-2xl bg-rose-500 opacity-50 rounded-full font-semibold hover:opacity-100 outline-none"
              type="button"
              {...eventProps}
            >
              <div {...animationProps} />
            </button>
          )}
        />
      )}
    </div>
  );
};

export default Backtop;
