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
  const [key, setKey] = useState(Date.now());

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleLink = () => {
    setIsOpen(false);
    // setKey(Date.now());
  };

  return (
    <nav>
      <MenuButton key={key} isOpen={isOpen} onClick={handleClick}></MenuButton>
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
            onClick={handleLink}
          >
            <NavLink href={item.href}>{item.title}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
