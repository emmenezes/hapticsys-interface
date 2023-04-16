import React from 'react';
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
} from '@chakra-ui/react';

import { SaveInputModal } from '../components/SaveInputModal';
import { Header } from '../components/Header';
import { MenuColumn } from '../components/MenuColumn';

import { useEditorContext } from '../context/EditorContext';
import { useRequests } from '../services/useRequests';

const range = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

function Editor() {
  const { sendInput, listLibrary } = useRequests();
  const {
    setPeriod,
    period,
    setInput,
    setIsSaveInputModalOpen,
    lines,
    setLines,
    addColumn,
  } = useEditorContext();

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
          <Button onClick={addColumn}>Adicionar colunas</Button>
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
            siz="xs"
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
                  <Th key={index}>
                    T {index}{'   '}
                    <MenuColumn index={index} />
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
                        size="xs"
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
