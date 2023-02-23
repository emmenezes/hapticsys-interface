import * as React from 'react'
import { ChakraProvider} from '@chakra-ui/react';

import Router from './routes/routes';

function App() {
  return (
    <ChakraProvider>
      <Router />
    </ChakraProvider>
  );
}

export default App;
