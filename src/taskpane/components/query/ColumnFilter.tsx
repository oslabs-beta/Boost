import React from "react";

export const ColumnFilter = ({ column }: { column: any }) => {
  const { filterValue, setFilter } = column;
  return (
    <span>
      <label htmlFor="what" />
      Search:{" "}
      <input
        name="what"
        value={filterValue || ""}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Search Column"
      />
    </span>
  );
};
