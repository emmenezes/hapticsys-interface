import React from 'react';
import {
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
} from '@chakra-ui/react';
import {
  CopyIcon,
  DeleteIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  HamburgerIcon,
} from '@chakra-ui/icons';

import { useEditorContext } from '../context/EditorContext';

export function MenuColumn({ index }) {
  const { deleteColumn, duplicateColumn, moveColumn } = useEditorContext();

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Menu isOpen={isOpen} onClose={onClose}>
      <MenuButton
        onMouseOver={onOpen}
        as={IconButton}
        aria-label="Opções"
        icon={<HamburgerIcon />}
        variant="outline"
      />
      <MenuList>
        <MenuItem icon={<DeleteIcon />} onClick={() => deleteColumn(index)}>
          Deletar coluna
        </MenuItem>
        <MenuItem
          icon={<CopyIcon />}
          onClick={() => duplicateColumn(index, 'next')}
        >
          Duplicar a seguir
        </MenuItem>
        <MenuItem
          icon={<CopyIcon />}
          onClick={() => duplicateColumn(index, 'last')}
        >
          Duplicar no final
        </MenuItem>
        <MenuItem
          icon={<ChevronLeftIcon />}
          onClick={() => moveColumn(index, 'left')}
        >
          Mover para esquerda
        </MenuItem>
        <MenuItem
          icon={<ChevronRightIcon />}
          onClick={() => moveColumn(index, 'right')}
        >
          Mover para direita
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
