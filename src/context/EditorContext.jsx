import React, { createContext, useContext, useState } from 'react';

const initialState = {
  title: '',
  period: 0,
  input: [],
};

export const EditorContext = createContext(initialState);

const RST_INPUT = [[], [], [], [], [], [], [], [], [], [], [], []];

export function EditorProvider({ children }) {
  const [title, setTitle] = useState('');
  const [period, setPeriod] = useState(0.4);
  const [input, setInput] = useState([]);
  const [isSaveInputModalOpen, setIsSaveInputModalOpen] = useState(false);
  const [lines, setLines] = useState(RST_INPUT);

  function addColumn() {
    const updatedLines = lines.map((line) => {
      return [...line, '0'];
    });
    setLines(updatedLines);
  }

  function deleteColumn(id) {
    const updatedLines = lines.map((line) => {
      const updatedLine = [...line];
      updatedLine.splice(id, 1);
      return updatedLine;
    });
    setLines(updatedLines);
  }

  function duplicateColumn(id, type = 'last') {
    const updatedLines = lines.map((line) => {
      if (type === 'last') {
        return [...line, line[id]];
      }
      const updatedLine = [...line];
      updatedLine.splice(id, 0, line[id]);
      updatedLine.join();
      return updatedLine;
    });
    setLines(updatedLines);
  }

  function moveColumn(id, direction = 'right') {
    if (
      (id === 0 && direction === 'left') ||
      (id === lines.length - 1 && direction === 'right')
    ) {
      return;
    }

    const updatedLines = lines.map((line) => {
      const updatedLine = [...line];
      const cell = updatedLine[id];
      const pos = direction === 'right' ? id + 1 : id - 1;
      updatedLine.splice(id, 1);
      updatedLine.splice(pos, 0, cell);
      updatedLine.join();
      return updatedLine;
    });
    setLines(updatedLines);
  }

  const contextValue = {
    title,
    setTitle,
    period,
    setPeriod,
    input,
    setInput,
    isSaveInputModalOpen,
    setIsSaveInputModalOpen,
    lines,
    setLines,
    addColumn,
    deleteColumn,
    duplicateColumn,
    moveColumn,
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
