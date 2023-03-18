import React, { useState } from 'react';
import {
  Button,
  Container,
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
} from '@chakra-ui/react';

import { useRequests } from '../services/useRequests';
import { useEditorContext } from '../context/EditorContext';
import SaveInputModal from '../components/SaveInputModal';

const RST_INPUT = [[], [], [], [], [], [], [], [], [], [], [], []];
const range = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

function Editor() {
  const { sendInput, listLibrary } = useRequests();
  const { setPeriod, setInput, setIsSaveInputModalOpen } = useEditorContext();

  const [lines, setLines] = useState(RST_INPUT);

  function addColumns() {
    const updatedLines = lines.map((line) => {
      return [...line, '0'];
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
    sendInput('tst1', input, 0.5);
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
    <Container p={0} maxW="container.xl">
      <SaveInputModal />
      <VStack>
        <HStack>
          <Button onClick={addColumns}>Adicionar colunas</Button>
          <Button onClick={deleteColumns}>Deletar colunas</Button>
          <Button onClick={() => console.log(lines)}>Checar</Button>
          <Button onClick={setCustomSequence}>Enviar</Button>
          <Button onClick={saveCustomSequence}>Salvar</Button>
          <Button onClick={listLibrary}>Listar Biblioteca</Button>
        </HStack>
        <TableContainer w="100%" paddingX={10} justifyContent="flex-start">
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>Mod</Th>
                {lines[0].map((_, index) => (
                  <Th>T {index}</Th>
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
                        max={11}
                        min={0}
                        defaultValue={value}
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
    </Container>
  );
}

export default Editor;
