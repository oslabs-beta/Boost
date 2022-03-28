import React from "react";
export const GlobalFilter = ({ filter, setFilter }: { filter: any; setFilter: any }) => {
  return (
    <span>
      Search:{" "}
      <input value={filter || ""} onChange={(e) => setFilter(e.target.value)} />
    </span>
  );
};
