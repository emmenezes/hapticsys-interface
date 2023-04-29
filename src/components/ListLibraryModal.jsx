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
  Select,
} from '@chakra-ui/react';

import { useEditorContext } from '../context/EditorContext';
import { useModalEditorContext } from '../context/ModalEditorContext';

export function ListLibraryModal() {
  const { editSequence } = useEditorContext();
  const {
    library,
    isListLibraryModalOpen,
    setIsListLibraryModalOpen,
    selectedSequence,
    setSelectedSequence,
  } = useModalEditorContext();

  function editButtonOnClick() {
    if (!selectedSequence) {
      return;
    }
    editSequence(selectedSequence);
    setIsListLibraryModalOpen(false);
  }

  return (
    <Modal
      isOpen={isListLibraryModalOpen}
      onClose={() => setIsListLibraryModalOpen(false)}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Lista de sequências da biblioteca</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Select
            placeholder="Selecione uma sequência para editar"
            onChange={(e) => setSelectedSequence(e.target.value)}
            w={400}
          >
            {library.map((element) => {
              return (
                <option value={element.id} key={element.id}>
                  {element.title}
                </option>
              );
            })}
          </Select>
        </ModalBody>
        <ModalFooter>
          <Button onClick={editButtonOnClick} mr={3} colorScheme="blue">
            Editar
          </Button>
          <Button onClick={() => setIsListLibraryModalOpen(false)}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
