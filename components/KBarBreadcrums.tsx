import type { Action, ActionImpl } from "kbar";

import classNames from "classnames";
import ChevronRight20Filled from "@ricons/fluent/ChevronRight20Filled";
import { useKBar } from "kbar";

interface KbarBreadcrumbItemProps extends React.ComponentPropsWithoutRef<"li"> {
  action: Action;
  isRoot?: boolean;
  isLast?: boolean;
}

const KbarBreadcrumbItem: React.FC<KbarBreadcrumbItemProps> = ({
  action,
  isRoot,
  isLast,
  ...rest
}) => (
  <li className="flex items-center" {...rest}>
    {!isRoot && <ChevronRight20Filled className="w-4 h-4 m-1 text-gray-400" />}
    <button
      className={classNames(
        "py-1 px-2 bg-gray-100 text-gray-400  dark:bg-gray-600   transition-colors rounded text-sm",
        isLast
          ? "cursor-not-allowed"
          : "hover:text-gray-700 dark:hover:text-gray-200"
      )}
    >
      {action.name}
    </button>
  </li>
);

const KbarBreadcrumbs: React.FC = () => {
  const { actionWithAncestors, query } = useKBar((state) => {
    const actionWithAncestors: ActionImpl[] = [];
    const collectAncestors = (actionId: ActionImpl["id"]) => {
      const action = state.actions[actionId];
      actionWithAncestors.unshift(action);
      if (!action.parent) {
        return;
      }
      const parent = state.actions[action.parent];
      collectAncestors(parent.id);
    };

    state.currentRootActionId && collectAncestors(state.currentRootActionId);

    return {
      actionWithAncestors,
    };
  });

  const handleClick = (action: Action, isLast: boolean) => {
    if (isLast) {
      return;
    }
    query.setCurrentRootAction(action.id);
  };

  const homeAction: Action = {
    id: "",
    name: "Home",
  };

  return (
    <ul className="flex items-center px-2 pt-3">
      {[homeAction, ...actionWithAncestors].map((action, index, actions) => {
        const isRoot = index === 0;
        const isLast = index !== 0 && index === actions.length - 1;

        return (
          <KbarBreadcrumbItem
            key={action.id}
            action={action}
            isRoot={isRoot}
            isLast={isLast}
            onClick={() => handleClick(action, isLast)}
          />
        );
      })}
    </ul>
  );
};

export default KbarBreadcrumbs;
