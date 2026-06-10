import { createContext, useContext, useState } from 'react';

const SearchContext = createContext({
  searchInput: '',
  setSearchInput: (value: string) => {},
});

export function SearchProvider({ children }) {
  const [searchInput, setSearchInput] = useState('');
  return (
    <SearchContext.Provider value={{ searchInput, setSearchInput }}>
      {children}
    </SearchContext.Provider>
  );
}

export const useSearch = () => useContext(SearchContext);