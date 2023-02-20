import React from 'react';
import {
  Container,
  Divider,
  Flex,
  Heading,
} from '@chakra-ui/react';

import ButtonsTab from '../components/ButtonsTab';
import CustomInputTab from '../components/CustomInputTab';

function Home() {
  return (
    <Container maxWidth="container.xl" p={0}>
      <Heading textAlign="center" p={7} size="xl">
        Página de testes
      </Heading>
      <Flex h="100vh" direction="row">
        <ButtonsTab />
        <Divider orientation='vertical' />
        <CustomInputTab />
      </Flex>
    </Container>
  );
}

export default Home;
