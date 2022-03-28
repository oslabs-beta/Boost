import React from "react";

export const ColumnFilter = ({ column }: { column: any }) => {

  const { filterValue, setFilter } = column;
  return (
    <span>
      Search:{' '}
      <input value={filterValue || ""} onChange={(e) => setFilter(e.target.value)} />
    </span>
  );
};
