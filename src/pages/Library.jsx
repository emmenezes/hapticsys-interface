import React from 'react';
import { VStack } from '@chakra-ui/react';

import { Header } from '../components/Header';

function Library() {
  return (
    <VStack>
      <Header actualPage='Biblioteca' />
    </VStack>
  )
}

export default Library;