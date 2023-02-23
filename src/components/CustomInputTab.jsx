import React, { useState } from 'react';
import {
  Button,
  FormControl,
  HStack,
  VStack,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormLabel,
  NumberInput,
  NumberInputField,
  Heading,
  Image,
} from '@chakra-ui/react';

import { useRequests } from '../services/useRequests';
import { useInputGenerator } from '../utils/useInputGenerator';

function CustomInputTab() {
  const { sendInput } = useRequests();
  const { setOneModule } = useInputGenerator();
  
  const [module, setModule] = useState(0);
  const [magnitude, setMagnitude] = useState(0);

  function setCustomInput() {
    sendInput(setOneModule(module, magnitude));
  }

  return (
    <VStack w="full" p={10}>
      -
      <Heading size="lg" mb={3}>
        Entrada personalizada
      </Heading>
      <HStack w="full" justifyContent="center">
        <FormControl>
          <HStack>
            <FormLabel>Módulo</FormLabel>
            <NumberInput
              w="100px"
              max={11}
              min={0}
              defaultValue={0}
              onChange={setModule}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </HStack>
        </FormControl>
        <FormControl>
          <HStack>
            <FormLabel>Intensidade</FormLabel>
            <NumberInput
              w="100px"
              max={7}
              min={0}
              defaultValue={0}
              onChange={setMagnitude}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </HStack>
        </FormControl>
        <Button onClick={setCustomInput} size="lg">
          Enviar
        </Button>
      </HStack>
      <Image p={10} src="location.png" />
    </VStack>
  );
}

export default CustomInputTab;
