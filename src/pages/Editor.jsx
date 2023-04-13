import React, { useState } from 'react';
import {
  Button,
  HStack,
  VStack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  TableContainer,
  Thead,
  Tbody,
  Tr,
  Th,
  Table,
  Td,
  FormLabel,
  IconButton,
} from '@chakra-ui/react';
import { CopyIcon, DeleteIcon } from '@chakra-ui/icons';

import { SaveInputModal } from '../components/SaveInputModal';
import { Header } from '../components/Header';

import { useEditorContext } from '../context/EditorContext';
import { useRequests } from '../services/useRequests';

const RST_INPUT = [[], [], [], [], [], [], [], [], [], [], [], []];
const range = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

function Editor() {
  const { sendInput, listLibrary } = useRequests();
  const { setPeriod, period, setInput, setIsSaveInputModalOpen } =
    useEditorContext();

  const [lines, setLines] = useState(RST_INPUT);

  function addColumns() {
    const updatedLines = lines.map((line) => {
      return [...line, '0'];
    });
    setLines(updatedLines);
  }

  function duplicateColumn(id) {
    const updatedLines = lines.map((line) => {
      return [...line, line[id]];
    });
    setLines(updatedLines);
  }

  function deleteColumns() {
    const updatedLines = lines.map((line) => {
      let updatedLine = [...line];
      updatedLine.pop();
      return updatedLine;
    });
    setLines(updatedLines);
  }

  function deleteColumn(id) {
    const updatedLines = lines.map((line) => {
      let updatedLine = [...line];
      updatedLine.splice(id, 1);
      return updatedLine;
    });
    setLines(updatedLines);
  }

  function updateModule(indexLine, indexColumn, value) {
    let newLines = [...lines];
    newLines[indexLine][indexColumn] = value;
    setLines(newLines);
  }

  function setCustomSequence() {
    const input = lines[0].map((_, indexColumn) => {
      let sequence = '';
      for (let i = 0; i < 12; i++) {
        sequence += lines[i][indexColumn];
      }
      return sequence;
    });
    sendInput(input, +period);
  }

  function saveCustomSequence() {
    const input = lines[0].map((_, indexColumn) => {
      let sequence = '';
      for (let i = 0; i < 12; i++) {
        sequence += lines[i][indexColumn];
      }
      return sequence;
    });
    setInput(input);
    setPeriod(0.5);
    setIsSaveInputModalOpen(true);
  }

  return (
    <VStack>
      <Header actualPage="Editor" />
      <SaveInputModal />
      <VStack>
        <HStack w="100%" justifyContent="center">
          <Button onClick={addColumns}>Adicionar colunas</Button>
          <Button onClick={deleteColumns}>Deletar colunas</Button>
          <Button onClick={setCustomSequence}>Enviar</Button>
          <Button onClick={saveCustomSequence}>Salvar</Button>
          <Button onClick={listLibrary}>Listar Biblioteca</Button>
          <FormLabel>Periodo</FormLabel>
          <NumberInput
            w="100px"
            min={0.1}
            step={0.1}
            defaultValue={0.1}
            onChange={setPeriod}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </HStack>
        <TableContainer w="100%" paddingX={10} justifyContent="flex-start">
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>Mod</Th>
                {lines[0].map((_, index) => (
                  <Th>
                    T {index}{'   '}
                    <IconButton
                      aria-label="Duplicar coluna"
                      onClick={() => duplicateColumn(index)}
                      icon={<CopyIcon />}
                      size='sm'
                    />{'   '}
                    <IconButton
                      aria-label="Deletar coluna"
                      onClick={() => deleteColumn(index)}
                      icon={<DeleteIcon />}
                      size='sm'
                    />
                  </Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {range.map((indexLine) => (
                <Tr>
                  <Td>Mod {indexLine}</Td>
                  {lines[indexLine].map((value, indexColumn) => (
                    <Td>
                      <NumberInput
                        w="100px"
                        max={7}
                        min={0}
                        value={value}
                        onChange={(newValue) =>
                          updateModule(indexLine, indexColumn, newValue)
                        }
                        size="sm"
                      >
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </Td>
                  ))}
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </VStack>
    </VStack>
  );
}

export default Editor;
