import { Flex, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, useDisclosure, Box, Input, VStack, Text, Divider, IconButton } from "@chakra-ui/react";
import { useState } from "react";
import { DeleteIcon } from "@chakra-ui/icons";
import Job from "@/models/job/job";
import RubricInputs from "../Inputs/RubricInputs/RubricInputs";

function ResumeModal({ job, onOpen, onClose, isOpen }: { job: Job, onOpen: () => void, onClose: () => void, isOpen: boolean }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="gray.50" color="black">
        <ModalHeader fontSize="lg" fontWeight="bold">Rubric</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <RubricInputs job={job} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default ResumeModal;
