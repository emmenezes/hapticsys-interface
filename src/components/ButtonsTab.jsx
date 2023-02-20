import React from 'react';
import { Button, Heading, HStack, VStack } from '@chakra-ui/react';

import { useInputGenerator } from '../utils/useInputGenerator';
import { useRequests } from '../services/useRequests';

const MAX_VALUE = 7;
const MIN_VALUE = 1;

function ButtonsTab() {
  const { sendInput } = useRequests();
  const { setAllModules, generateWaveInput } = useInputGenerator();

  function testSystem() {
    sendInput(setAllModules(MIN_VALUE));
  }

  function resetSystem() {
    sendInput(setAllModules(0));
  }

  function setMaxSystem() {
    sendInput(setAllModules(MAX_VALUE));
  }

  function setWaveInput(mode = 'direct') {
    sendInput(generateWaveInput(mode, 3), 1);
  }

  return (
    <VStack w="full" p={10}>
      <Heading size="lg" mb={3}>
        Entrada para todos os módulos
      </Heading>
      <HStack>
        <Button onClick={resetSystem}>Reset</Button>
        <Button onClick={testSystem}>Teste</Button>
        <Button onClick={setMaxSystem}>Max</Button>
      </HStack>
      <VStack>
        <Button onClick={setWaveInput}>Onda</Button>
        <Button onClick={() => setWaveInput('reverse')}>Onda reversa</Button>
      </VStack>
    </VStack>
  );
}

export default ButtonsTab;
