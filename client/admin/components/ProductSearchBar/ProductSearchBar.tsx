import React, { useState } from 'react';

interface ProductSearchBarProps {
  setSearchProductIdHanlder: (id: number | null) => void
}

const ProductSearchBar = ({ setSearchProductIdHanlder }: ProductSearchBarProps) => {

  const [searchValue, setSearchValue] = useState('');

  function search(e: React.FormEvent<HTMLInputElement>) {
    e.preventDefault()
    setSearchValue(e.currentTarget.value)
    setSearchProductIdHanlder(parseInt(e.currentTarget.value))


  }

  return (
    <div className="w-full max-w-xl flex mx-auto text-l">
      <input
        type="text"
        className="w-full placeholder-gray-400 text-gray-900 p-4 border"
        placeholder="Search product id"
        onChange={search}
        value={searchValue}
      />
      <button className="bg-white p-4">🔍</button>
    </div>
  );
};

export default ProductSearchBar;