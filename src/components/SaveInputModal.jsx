import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';

import { useEditorContext } from '../context/EditorContext';
import { useRequests } from '../services/useRequests';

function SaveInputModal() {
  const {
    title,
    setTitle,
    period,
    input,
    isSaveInputModalOpen,
    setIsSaveInputModalOpen,
  } = useEditorContext();
  const { saveInput } = useRequests();

  const isError = title === '';

  return (
    <Modal isOpen={isSaveInputModalOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Salvar sequência</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isInvalid={isError}>
            <FormLabel>Título da sequência</FormLabel>
            <Input
              placeholder="Título"
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={() => {
              saveInput(title, input, period);
              setIsSaveInputModalOpen(false);
            }}
            isDisabled={isError}
            mr={3}
            colorScheme='blue'
          >
            Salvar
          </Button>
          <Button onClick={() => setIsSaveInputModalOpen(false)}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default SaveInputModal;
