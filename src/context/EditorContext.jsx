import React, { createContext, useContext, useState } from 'react';

const initialState = {
  title: '',
  period: 0,
  input: [],
};

export const EditorContext = createContext(initialState);

export function EditorProvider({ children }) {
  const [title, setTitle] = useState('');
  const [period, setPeriod] = useState(0.4);
  const [input, setInput] = useState([]);
  const [isSaveInputModalOpen, setIsSaveInputModalOpen] = useState(false);

  const contextValue = {
    title,
    setTitle,
    period,
    setPeriod,
    input,
    setInput,
    isSaveInputModalOpen,
    setIsSaveInputModalOpen,
  };

  return (
    <EditorContext.Provider value={contextValue}>
      {children}
    </EditorContext.Provider>
  );
}

export function useEditorContext() {
  return useContext(EditorContext);
}
