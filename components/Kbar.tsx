import {
  KBarProvider,
  KBarPortal,
  KBarPositioner,
  KBarAnimator,
  KBarSearch,
  KBarResults,
  useMatches,
} from "kbar";

const actions = [
  {
    id: "blog",
    name: "Blog",
    shortcut: ["b"],
    keywords: "writing words",
    perform: () => (window.location.pathname = "blog"),
  },
  {
    id: "contact",
    name: "Contact",
    shortcut: ["c"],
    keywords: "email",
    perform: () => (window.location.pathname = "contact"),
  },
];

const RenderResults: React.FunctionComponent = () => {
  const { results } = useMatches();

  return (
    <KBarResults
      items={results}
      onRender={({ item, active }) =>
        typeof item === "string" ? (
          <div>{item}</div>
        ) : (
          <div
            style={{
              background: active ? "#eee" : "transparent",
            }}
          >
            {item.name}
          </div>
        )
      }
    />
  );
};

const Kbar: React.FunctionComponent = ({ children }) => (
  <KBarProvider actions={actions}>
    <KBarPortal>
      <KBarPositioner>
        <KBarAnimator>
          <KBarSearch />
          <RenderResults />
        </KBarAnimator>
      </KBarPositioner>
    </KBarPortal>
    {children}
  </KBarProvider>
);

export default Kbar;
