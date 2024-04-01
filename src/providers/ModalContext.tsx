import React,{createContext} from 'react';
import { useDisclosure } from "@chakra-ui/react";

type ModalProviderProps = {
  children: React.ReactNode;
}

export const ModalContext = React.createContext<() => void>(() => {});

export const ModalContextProvider = ({ children }: ModalProviderProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toggleModal = isOpen ? onClose : onOpen;

  return <ModalContext.Provider value={toggleModal}>{children}</ModalContext.Provider>
}

