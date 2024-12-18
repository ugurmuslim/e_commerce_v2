import React from "react";

export const WarningComponent = ({ message }: { message: string }) => {
  return (
    <div className="mt-5 flex w-full border-l-6 border-warning bg-warning bg-opacity-[15%] px-7 py-8 shadow-md dark:bg-[#1B1B24] dark:bg-opacity-30 md:p-2">
      <div className="w-full">
        <p className="leading-relaxed text-[#D0915C]">{message}</p>
      </div>
    </div>
  );
};
