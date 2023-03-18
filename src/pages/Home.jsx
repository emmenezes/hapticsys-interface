import React from 'react';
import { Button, Container, Divider, Flex, Heading } from '@chakra-ui/react';

import ButtonsTab from '../components/ButtonsTab';
import CustomInputTab from '../components/CustomInputTab';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <Container maxWidth="container.xl" p={0}>
      <Heading textAlign="center" p={7} size="xl">
        Página de testes
      </Heading>
      <Button>
        <Link to="/editor">Editor</Link>
      </Button>
      <Flex h="100vh" direction="row">
        <ButtonsTab />
        <Divider orientation="vertical" />
        <CustomInputTab />
      </Flex>
    </Container>
  );
}

export default Home;
