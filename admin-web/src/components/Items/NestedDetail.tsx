import React, { useState } from "react";

interface NestedDetailProps {
  data: any; // Replace with the actual type for `data`
  index: number;
  item: any; // Replace with the actual type for `item`
}

const NestedDetail: React.FC<NestedDetailProps> = ({ data, index, item }) => {
  const [isExpanded, setIsExpanded] = useState<number | null>(null);

  // Helper function to get the combined value for related fields
  const getCombinedValue = (keys: string[], item: any) => {
    const values = keys.map((key) =>
      key
        .split(/\.|\[|\]/)
        .filter(Boolean)
        .reduce((obj, key) => obj?.[key], item),
    );
    return values.filter(Boolean).join(" "); // Join non-null/undefined values with space
  };

  return (
    <div
      key={index}
      className="relative mb-4 rounded-lg border border-gray-200 bg-white p-4 shadow-md dark:border-gray-700 dark:bg-gray-800"
    >
      <h2 className="mb-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
        {data.label}
      </h2>

      {data.multiple ? (
        <div>
          {Array.isArray(item[data.key]) && item[data.key].length > 0 ? (
            item[data.key].map((subItem: any, subIndex: number) => (
              <div key={subIndex} className="mb-4">
                <button
                  onClick={() =>
                    setIsExpanded(isExpanded === subIndex ? null : subIndex)
                  }
                  className="flex w-full items-center justify-between rounded-md bg-gray-100 p-2 text-gray-800 focus:outline-none dark:bg-gray-700 dark:text-gray-300"
                >
                  <span>Ürün {subIndex + 1}</span>
                  <span>{isExpanded === subIndex ? "▲" : "▼"}</span>
                </button>

                {/* Dropdown content */}
                <div
                  className={`absolute mt-2 w-full overflow-hidden border-t border-gray-300 p-2 transition-all duration-300 ease-in-out dark:border-gray-600 ${
                    isExpanded === subIndex ? "max-h-96" : "max-h-0"
                  }`}
                  style={{
                    maxHeight: isExpanded === subIndex ? "400px" : "0px",
                    height: isExpanded === subIndex ? "auto" : "0",
                    zIndex: 10, // Ensuring the dropdown is on top
                  }}
                >
                  <div className="max-h-96 overflow-y-auto rounded-md bg-white p-4 text-gray-900 dark:bg-gray-700 dark:text-gray-200">
                    {/* Render NestedDetail for the subItem */}
                    {data.values ? (
                      data.values.map(
                        (nestedData: any, nestedIndex: number) => (
                          <NestedDetail
                            key={nestedIndex}
                            data={nestedData}
                            index={nestedIndex}
                            item={subItem}
                          />
                        ),
                      )
                    ) : (
                      <p className="text-gray-600 dark:text-gray-400">
                        No further details available.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Bilgi bulunamadı.</p>
          )}
        </div>
      ) : (
        <div className="text-gray-600 dark:text-gray-400">
          {/* Check if `combinedKeys` exist */}
          {data.combinedKeys ? (
            <p>{getCombinedValue(data.combinedKeys, item) || "N/A"}</p>
          ) : (
            <p>
              {data.key
                .split(/\.|\[|\]/)
                .filter(Boolean)
                .reduce((obj, key) => obj?.[key], item) || "N/A"}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default NestedDetail;
