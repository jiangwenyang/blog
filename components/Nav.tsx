import { useState } from "react";

import NavLink from "./NavLink";
import MenuButton from "./MenuButton";
import styles from "styles/nav-links.module.css";
import classNames from "classnames";

type NavLinkType = {
  href: string;
  title: string;
};

const NAV_LINKS: NavLinkType[] = [
  {
    href: "/posts",
    title: "文章",
  },
  {
    href: "/about",
    title: "关于我",
  },
  {
    href: "/rss/feed.xml",
    title: "RSS",
  },
];

const Nav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="z-10">
      <MenuButton isOpen={isOpen} onClick={handleClick} className="ml-2" />
      <ul
        className={classNames(styles["nav-links"], {
          [styles["is-open"]]: isOpen,
        })}
      >
        {NAV_LINKS.map((item, index) => (
          <li
            className={styles["nav-link"]}
            key={item.href}
            style={{
              transitionDelay: `${500 + index * 100}ms`,
            }}
            onClick={handleClick}
          >
            <NavLink
              href={item.href}
              className={classNames(
                isOpen ? "hover:bg-gray-700" : "hover:bg-gray-200"
              )}
            >
              {item.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
