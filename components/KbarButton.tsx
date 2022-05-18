import { useKBar } from "kbar";

import KeyCommand16Filled from "@ricons/fluent/KeyCommand16Filled";

const KbarButton: React.FC = () => {
  const { query } = useKBar();

  return (
    <button
      className="outline-none box-content w-6 h-6  cursor-pointer p-2 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-500 rounded"
      onClick={query.toggle}
    >
      <KeyCommand16Filled />
    </button>
  );
};

export default KbarButton;
