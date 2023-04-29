import React, { createContext, useContext, useEffect, useState } from 'react';

const initialState = {
  selectedSequence: '',
  library: [],
};

export const ModalEditorContext = createContext(initialState);

export function ModalEditorProvider({ children }) {
  const [isListLibraryModalOpen, setIsListLibraryModalOpen] = useState(false);
  const [selectedSequence, setSelectedSequence] = useState();
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
    isListLibraryModalOpen,
    setIsListLibraryModalOpen,
    selectedSequence,
    setSelectedSequence,
    library,
  };

  return (
    <ModalEditorContext.Provider value={contextValue}>
      {children}
    </ModalEditorContext.Provider>
  );
}

export function useModalEditorContext() {
  return useContext(ModalEditorContext);
}
