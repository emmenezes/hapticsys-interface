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

const defaultHeader = {
  'Content-type': 'application/json; charset=UTF-8',
};

function CustomInputTab() {
  const [module, setModule] = useState(0);
  const [magnitude, setMagnitude] = useState(0);

  const postCustomInput = () => {
    let input = ['0','0','0','0','0','0','0','0','0','0','0','0'];
    input[module] = magnitude;
    fetch('/custominput', {
      method: 'POST',
      body: JSON.stringify({
        input: input.join(''),
      }),
      headers: defaultHeader,
    })
      .then((response) => response.json())
      .then((message) => {
        console.log(message);
      });
  };

  return (
    <VStack w="full" p={10}>
      <Heading size="lg" mb={3}>Entrada personalizada</Heading>
      <HStack w="full" justifyContent="center">
        <FormControl>
          <FormLabel>Módulo 1</FormLabel>
          <NumberInput maxW='200px' max={11} min={0} onChange={setModule}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl>
          <FormLabel>Intensidade</FormLabel>
          <NumberInput maxW='200px' max={7} min={0} onChange={setMagnitude}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <Button onClick={postCustomInput} size="lg" >Enviar</Button>
      </HStack>
      <Image p={10} src="location.png" />
    </VStack>
  );
}

export default CustomInputTab;
