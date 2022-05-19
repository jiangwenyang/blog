import classNames from "classnames";
import EmojiSadSlight24Regular from "@ricons/fluent/EmojiSadSlight24Regular";
import { KBarResults, useMatches } from "kbar";

const KBarRenderResults: React.FunctionComponent = () => {
  const { results } = useMatches();

  if (!results.length) {
    return (
      <div className="px-2 py-4 flex justify-center items-center text-gray-500 dark:text-gray-300">
        <EmojiSadSlight24Regular className="w-6 h-6 mr-2" />
        暂无匹配，请修改关键词试试
      </div>
    );
  }

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

export default KBarRenderResults;
