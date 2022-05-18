import type { Post } from "typings/post";
import type { Action } from "kbar";

import { NextRouter, useRouter } from "next/router";
import classNames from "classnames";
import { useTheme } from "next-themes";
import Home20Filled from "@ricons/fluent/Home20Filled";
import Twitter from "@ricons/fa/Twitter";
import Github from "@ricons/fa/Github";
import LightModeRound from "@ricons/material/LightModeRound";
import DarkModeRound from "@ricons/material/DarkModeRound";
import NotepadPerson24Filled from "@ricons/fluent/NotepadPerson24Filled";
import Search12Regular from "@ricons/fluent/Search12Regular";
import DarkTheme20Filled from "@ricons/fluent/DarkTheme20Filled";
import Rss24Filled from "@ricons/fluent/Rss24Filled";
import DocumentOnePage24Filled from "@ricons/fluent/DocumentOnePage24Filled";

import {
  KBarProvider,
  KBarPortal,
  KBarPositioner,
  KBarAnimator,
  KBarSearch,
  KBarResults,
  useMatches,
} from "kbar";

type Theme = "light" | "dark";

interface GetActionsOptions {
  posts: Post[];
  router: NextRouter;
  setTheme: (theme: string) => void;
}

const getActions = ({ posts, router, setTheme }: GetActionsOptions) => {
  const navigationActions: Action[] = [
    {
      id: "home",
      name: "首页",
      shortcut: ["h"],
      icon: <Home20Filled />,
      section: "navigation",
      perform: () => router.push("/"),
    },
    {
      id: "about",
      name: "关于我",
      icon: <NotepadPerson24Filled />,
      shortcut: ["a"],
      section: "navigation",
      perform: () => router.push("/about"),
    },
    {
      id: "rss",
      name: "RSS",
      icon: <Rss24Filled />,
      shortcut: ["r"],
      section: "navigation",
      perform: () => router.push("/rss/feed.xml"),
    },
    {
      id: "posts",
      name: "所有文章",
      icon: <DocumentOnePage24Filled />,
      shortcut: ["p"],
      section: "posts",
      perform: () => router.push("/posts"),
    },
    {
      id: "seartPosts",
      name: "搜索文章...",
      icon: <Search12Regular />,
      shortcut: ["s"],
      section: "posts",
    },
    {
      id: "changeTheme",
      name: "切换主题...",
      icon: <DarkTheme20Filled />,
      shortcut: ["t"],
      section: "preferences",
    },
    {
      id: "twitter",
      name: "Twitter",
      shortcut: ["t"],
      icon: <Twitter />,
      section: "social",
      perform: () => window.open("https://twitter.com/jiang_wenyang", "_blank"),
    },
    {
      id: "github ",
      name: "Github",
      shortcut: ["g"],
      icon: <Github />,
      section: "social",
      perform: () => window.open("https://github.com/jiangwenyang", "_blank"),
    },
  ];

  const postActions: Action[] = posts.map((post) => ({
    id: post.slug!,
    name: post.title!,
    perform: () => router.push(`/posts/${post.slug}`),
    parent: "seartPosts",
  }));

  const themeActions: Action[] = ["light", "dark"].map((theme) => {
    const themeIconMap = {
      light: <LightModeRound />,
      dark: <DarkModeRound />,
    };
    return {
      id: theme,
      name: theme,
      icon: themeIconMap[theme as Theme],
      perform: () => {
        setTheme(theme);
      },
      parent: "changeTheme",
    };
  });

  return [...navigationActions, ...postActions, ...themeActions];
};

const RenderResults: React.FunctionComponent = () => {
  const { results } = useMatches();

  return (
    <KBarResults
      items={results}
      onRender={({ item, active }) =>
        typeof item === "string" ? (
          <div className="px-4 py-2 text-xs uppercase opacity-50">{item}</div>
        ) : (
          <div
            className={classNames([
              "border-l-4 border-solid px-4 py-3 flex items-center justify-between cursor-pointer transition-colors",
              active ? "border-l-rose-500" : "border-l-transparent",
              { "bg-gray-100 dark:bg-gray-500": active },
            ])}
          >
            <div className="flex gap-2 items-center text-sm">
              {item.icon && <div className="w-6 h-6">{item.icon}</div>}
              <div className="flex flex-col">
                <div>{item.name}</div>
                {item.subtitle && (
                  <div className="text-gray-500 dark:text-gray-300 text-xs">
                    {item.subtitle}
                  </div>
                )}
              </div>
            </div>
            <div className="grid grid-flow-col gap-1">
              {item?.shortcut?.map((item) => (
                <kbd
                  key={item}
                  className="py-1 px-2 bg-gray-200 dark:bg-gray-600 rounded text-sm"
                >
                  {item}
                </kbd>
              ))}
            </div>
          </div>
        )
      }
    />
  );
};

interface KbarProps {
  posts?: Post[];
}

const Kbar: React.FunctionComponent<KbarProps> = ({ posts = [], children }) => {
  const router = useRouter();
  const { setTheme } = useTheme();
  const actions = getActions({
    posts,
    router,
    setTheme,
  });

  return (
    <KBarProvider
      actions={actions}
      options={{
        enableHistory: true,
      }}
    >
      <KBarPortal>
        <KBarPositioner>
          <KBarAnimator className="max-w-2xl w-full bg-white  text-gray-800 dark:bg-black dark:text-white rounded-lg overflow-hidden shadow-[0_6px_20px_rgba(0,0,0,0.2)]">
            <KBarSearch className="py-4 px-3 w-full bg-white dark:bg-black box-border outline-none border-none text-base" />
            <RenderResults />
          </KBarAnimator>
        </KBarPositioner>
      </KBarPortal>
      {children}
    </KBarProvider>
  );
};

export default Kbar;
