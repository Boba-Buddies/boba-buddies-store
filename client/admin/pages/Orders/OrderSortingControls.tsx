import React from 'react';

interface OrderSortingControlsProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  sort: string;
  setSort: React.Dispatch<React.SetStateAction<string>>;
  oldestFirst: boolean;
  setOldestFirst: React.Dispatch<React.SetStateAction<boolean>>;
}

function OrderSortingControls({
  search,
  setSearch,
  sort,
  setSort,
  oldestFirst,
  setOldestFirst,
}: OrderSortingControlsProps) {
  return (
    <div className="border p-2 rounded flex justify-between items-center">
      <div className="flex items-center">
        {/* SEARCH */}
        <input
          className="border p-2 rounded mr-2"
          type="text"
          placeholder="Search Order Number..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* SORT */}
        <p className="mx-2 font-semibold">Sort by:</p>
        <select
          className="border p-2 rounded"
          onChange={(e) => setSort(e.target.value)}
          value={sort}
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
        </select>

        {/* OLDEST FIRST */}
        <div className="ml-4 flex items-center">
          <input
            type="checkbox"
            id="oldestFirstCheckbox"
            checked={oldestFirst}
            onChange={() => setOldestFirst(!oldestFirst)}
            className="mr-2"
          />
          <label htmlFor="oldestFirstCheckbox">Oldest First</label>
        </div>
      </div>
    </div>
  );
}

export default OrderSortingControls;
