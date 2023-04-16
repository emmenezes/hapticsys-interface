import React, { createContext, useContext, useEffect, useState } from 'react';

const initialState = {
  selectedInput: '',
  library: [],
};

export const LibraryContext = createContext(initialState);

export function LibraryProvider({ children }) {
  const [selectedInput, setSelectedInput] = useState();
  const [library, setLibrary] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch('/listlibrary');
      const json = await data.json();

      console.log('json', json);
      setLibrary(json.message);
    };

    fetchData().catch(console.error);
  }, []);

  const contextValue = {
    selectedInput,
    setSelectedInput,
    library,
    setLibrary,
  };

  return (
    <LibraryContext.Provider value={contextValue}>
      {children}
    </LibraryContext.Provider>
  );
}

export function useLibraryContext() {
  return useContext(LibraryContext);
}
