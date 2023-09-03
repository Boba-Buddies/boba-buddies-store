import React from 'react';

interface AdminSortFilterControlsProps {
  filter: string;
  sort: string;
  setFilter: (value: string) => void;
  setSort: (value: string) => void;
}

const AdminSortFilterControls: React.FC<AdminSortFilterControlsProps> = ({
  filter,
  sort,
  setFilter,
  setSort,
}) => {
  return (
    <div style={{ marginTop: "20px", marginBottom: "60px" }}>
      <label htmlFor="filter" className={'font-bold'}>View by: </label>
      <select
        name="filter"
        id="filter"
        onChange={(e) => setFilter(e.target.value)}
        value={filter}
        className="border rounded-md"
      >
        <option value="">...</option>
        <option value="Low Stock">Low Stock</option>
        <option value="Enabled">Enabled</option>
        <option value="Disabled">Disabled</option>
        <option value="All">All</option>
      </select>

      <label htmlFor="sort" className="ml-4 font-bold" >
        Sort by:{' '}
      </label>
      <select
        name="sort"
        id="sort"
        onChange={(e) => setSort(e.target.value)}
        value={sort}
        className="border rounded-md"
      >
        <option value="">...</option>
        <option value="Price (Low to High)">Price (Low to High)</option>
        <option value="Price (High to Low)">Price (High to Low)</option>
        <option value="Alphabetical (A to Z)">Alphabetical (A to Z)</option>
      </select>
    </div>
  );
};

export default AdminSortFilterControls;
