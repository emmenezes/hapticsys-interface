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
  Thead,
  Tbody,
  Tr,
  Th,
  Table,
  Td,
  FormLabel,
  Box,
} from '@chakra-ui/react';

import { Header } from '../components/Header';
import { MenuColumn } from '../components/MenuColumn';
import { SaveInputModal } from '../components/SaveInputModal';
import { ListLibraryModal } from '../components/ListLibraryModal';

import { useRequests } from '../services/useRequests';
import { useEditorContext } from '../context/EditorContext';
import { useModalEditorContext } from '../context/ModalEditorContext';

const range = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

function Editor() {
  const { sendInput } = useRequests();
  const { setIsListLibraryModalOpen, isListLibraryModalOpen } =
    useModalEditorContext();
  const {
    setPeriod,
    period,
    setInput,
    setIsSaveInputModalOpen,
    lines,
    setLines,
    addColumn,
    cleanLines
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
    setPeriod(period);
    setIsSaveInputModalOpen(true);
  }

  function listLibrarySequences() {
    setIsListLibraryModalOpen(true);
  }

  return (
    <VStack>
      <Header actualPage="Editor" />
      <SaveInputModal />
      <ListLibraryModal />
      <VStack w="100%">
        <HStack w="100%" justifyContent="center">
          <Button onClick={addColumn}>Adicionar colunas</Button>
          <Button onClick={setCustomSequence}>Enviar</Button>
          <Button onClick={saveCustomSequence}>Salvar</Button>
          <Button onClick={listLibrarySequences}>Editar sequência salva</Button>
          <Button onClick={cleanLines}>Limpar</Button>
          <FormLabel>Periodo</FormLabel>
          <NumberInput
            w="100px"
            min={0.01}
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
        <Box overflowY="auto" maxWidth="95%">
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>Mod</Th>
                {lines[0].map((_, index) => (
                  <Th key={index}>
                    T {index}
                    {'   '}
                    <MenuColumn index={index} />
                  </Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {range.map((indexLine) => (
                <Tr>
                  <Td>M{indexLine}</Td>
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
        </Box>
      </VStack>
    </VStack>
  );
}

export default Editor;
