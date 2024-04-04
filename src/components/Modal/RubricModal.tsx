import { Flex, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, useDisclosure, Box, Input, VStack, Text, Divider, IconButton } from "@chakra-ui/react";
import { useState } from "react";
import { DeleteIcon } from "@chakra-ui/icons";
import Job from "@/models/job/job";

function ResumeModal({ job, onOpen, onClose, isOpen }: { job: Job, onOpen: () => void, onClose: () => void, isOpen: boolean }) {

  // WHEN HALE FINISHES ENDPOINTS COME BACK AND RUN GET RUBRIC BY ID THEN DO BELOW
  // if job.rubric = {} then use default values else fill in 
  const [fields, setFields] = useState([
    { name: "Education", value: 33 },
    { name: "Experience", value: 33 },
    { name: "Skills", value: 34 },
  ]);

  const handleInputChange = (index: number, value: string) => {
    // Convert the input value to a number
    const numericValue = Number(value);
    if (value === '' || (numericValue >= 0 && numericValue <= 100)) {
      setFields(fields.map((field, i) => (i === index ? { ...field, value: numericValue } : field)));
    }
  };

  const handleAddField = () => {
    setFields([...fields, { name: "", value: 0 }]);
  };

  const handleDeleteField = (index: number) => {
    setFields(fields.filter((field, i) => i !== index));
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="gray.50" color="black">
          <ModalHeader fontSize="lg" fontWeight="bold">Rubric</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              {fields.map((field, index) => (
                <Box key={index} p={5} shadow="md" borderWidth="1px" borderRadius="md" bg="white">
                  <Flex justify="space-between">
                    <Text fontWeight="bold">{field.name}</Text>
                    <IconButton aria-label="Delete field" icon={<DeleteIcon />} onClick={() => handleDeleteField(index)} />
                  </Flex>
                  <Divider />
                  <Input placeholder="Field name" value={field.name} onChange={(e) => setFields(fields.map((f, i) => i === index ? { ...f, name: e.target.value } : f))} />
                  <Input placeholder="Value" type="number" value={field.value} onChange={(e) => handleInputChange(index, e.target.value)} />
                </Box>
              ))}
              <Flex>
                <Button mr={2} colorScheme="teal" onClick={handleAddField}>Add Field</Button>
                <Button colorScheme="blue">Create</Button>
              </Flex>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ResumeModal;
