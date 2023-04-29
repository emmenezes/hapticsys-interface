import React, { createContext, useContext, useState } from 'react';

const initialState = {
  title: '',
  period: 0,
  input: [],
};

const RST_INPUT = [[], [], [], [], [], [], [], [], [], [], [], []];

const default_header = {
  'Content-type': 'application/json; charset=UTF-8',
};

export const EditorContext = createContext(initialState);

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

  function editSequence(id) {
    const fetchData = async () => {
      const data = await fetch('/getinput', {
        method: 'POST',
        body: JSON.stringify({
          id: id,
        }),
        headers: default_header,
      });
      const json = await data.json();
      
      const updatedLines = JSON.parse(JSON.stringify(RST_INPUT));
      for (let i = 0; i < json.input.length; i++) {
        const seq = json.input[i];
        for (let j = 0; j < 12; j++) {
          updatedLines[j].push(seq[j]);
        }
      }
      setLines(updatedLines);
    };

    fetchData().catch(console.error);
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
    editSequence,
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
