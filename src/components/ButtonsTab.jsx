import React from 'react';
import { Button, Heading, HStack, VStack } from '@chakra-ui/react';

const default_header = {
  'Content-type': 'application/json; charset=UTF-8',
};

function ButtonsTab() {
  const testSystem = () => {
    fetch('/test')
      .then((response) => response.json())
      .then((message) => {
        console.log(message);
      });
  };

  const ressetSystem = () => {
    fetch('/rst')
      .then((response) => response.json())
      .then((message) => {
        console.log(message);
      });
  };

  const setMaxSystem = () => {
    fetch('/max')
      .then((response) => response.json())
      .then((message) => {
        console.log(message);
      });
  };

  const setWaveInput = () => {
    fetch('waveinput', {
      method: 'POST',
      body: JSON.stringify({
        period: 1,
        magnitude: '3',
      }),
      headers: default_header,
    })
      .then((response) => response.json())
      .then((message) => {
        console.log(message);
      });
  };

  const setWavePropagationInput = () => {
    fetch('wavepropagation', {
      method: 'POST',
      body: JSON.stringify({
        period: 0.5,
      }),
      headers: default_header,
    })
      .then((response) => response.json())
      .then((message) => {
        console.log(message);
      });
  };

  return (
    <VStack w="full" p={10}>
      <Heading size="lg" mb={3}>
        Entrada para todos os módulos
      </Heading>
      <HStack>
        <Button onClick={ressetSystem}>Reset</Button>
        <Button onClick={testSystem}>Teste</Button>
        <Button onClick={setMaxSystem}>Max</Button>
        <Button onClick={setWaveInput}>Onda</Button>
        <Button onClick={setWaveInput}>Onda com propagação</Button>
      </HStack>
    </VStack>
  );
}

export default ButtonsTab;
