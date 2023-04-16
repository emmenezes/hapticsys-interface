import React from 'react';
import { Button, Heading, Select, VStack } from '@chakra-ui/react';

import { Header } from '../components/Header';

import { useRequests } from '../services/useRequests';
import { useLibraryContext } from '../context/LibraryContext';

function Library() {
  const { libraryInput } = useRequests();
  const { selectedInput, setSelectedInput, library } = useLibraryContext();

  function sendInput() {
    libraryInput(selectedInput);
  }

  return (
    <VStack>
      <Header actualPage="Biblioteca" />
      <VStack>
        <Heading>Selecione uma sequência para executar</Heading>
        <Select
          placeholder="Sequências"
          onChange={(e) => setSelectedInput(e.target.value)}
          w={200}
        >
          {library.map((element) => {
            return (
              <option value={element.id} key={element.id}>
                {element.title}
              </option>
            );
          })}
        </Select>
        <Button onClick={sendInput}>Executar sequência</Button>
      </VStack>
    </VStack>
  );
}

export default Library;
