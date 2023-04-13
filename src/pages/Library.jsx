import React, { useState } from 'react';
import { Button, Select, VStack } from '@chakra-ui/react';

import { Header } from '../components/Header';

import { useRequests } from '../services/useRequests';

function Library() {
  const { libraryInput }  = useRequests();
  const [selectedInput, setSelectedInput] = useState();
  const [library, setLibrary] = useState([]);

  const handleOnClick = async () => {
    try {
      const response = await fetch('/listlibrary');

      if (!response.ok) {
        console.log('erro')
      }

      const result = await response.json();

      setLibrary(result.message)
    } catch (err) {
      console.log('err', err)
    } 
  }

  console.log(selectedInput);

  function sendInput() {
    libraryInput(selectedInput);
  }
  
  return (
    <VStack>
      <Header actualPage='Biblioteca' />
      <VStack>
        <Button onClick={handleOnClick}>Atualizar biblioteca</Button>
        <Select placeholder='Selecione uma sequência para executar' onChange={(e) => setSelectedInput(e.target.value)}>
          {library.map((element) => {
            return <option value={element.id} key={element.id}>{element.title}</option>
          })}
        </Select>
        <Button onClick={sendInput}>Executar sequência</Button>
      </VStack>
    </VStack>
  )
}

export default Library;