import { Button, HStack, Heading, Link, useColorMode } from '@chakra-ui/react';
import React from 'react';

export const Pages = [
  { title: 'Início', link: '/' },
  { title: 'Editor', link: '/editor' },
  { title: 'Biblioteca', link: '/library' },
];

export function Header({ actualPage }) {
  const { colorMode, toggleColorMode}  = useColorMode();
  return (
    <HStack justifyContent={'space-between'} px={8} py={4} boxShadow="md" w={'100%'}>
      <Heading as="h1">Sistema Háptico</Heading>
      <HStack spacing={10}>
        {Pages.map((page) => {
          if (actualPage === page.title) return <Link color='blue.400' as='i' >{page.title}</Link>;
          return <Link href={page.link}>{page.title}</Link>;
        })}
        <Button onClick={toggleColorMode} w={220}>
          Mudar para modo {colorMode === 'light' ? 'escuro' : 'claro'}
        </Button>
      </HStack>
    </HStack>
  );
}
