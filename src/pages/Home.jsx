import React from 'react';
import { Divider, Flex, VStack } from '@chakra-ui/react';

import ButtonsTab from '../components/ButtonsTab';
import CustomInputTab from '../components/CustomInputTab';
import { Header } from '../components/Header';

function Home() {
  return (
    <VStack>
      <Header actualPage="Início" />
      <Flex h="100vh" direction="row">
        <ButtonsTab />
        <Divider orientation="vertical" />
        <CustomInputTab />
      </Flex>
    </VStack>
  );
}

export default Home;
