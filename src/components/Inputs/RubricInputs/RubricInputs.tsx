import React, { useEffect, useState } from 'react';
import { Flex, Button, Box, Input, VStack, Text, Divider, IconButton, useToast } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { getRubric } from '@/hooks/rubrics/rubric-hooks';
import Job from '@/models/job/job';

function RubricInputs({ job }: { job: Job }) {
  const { data } = getRubric(job.rubric_id);
  const [fields, setFields] = useState([
    { name: "Education", value: 33 },
    { name: "Experience", value: 33 },
    { name: "Skills", value: 34 },
  ]);

  const toast = useToast();

  const handleInputChange = (index: number, value: string) => {
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
    toast({
      title: "Field removed.",
      description: "The field has been successfully removed.",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  useEffect(() => {
    if (data) {
      const sections = JSON.parse(data.sections);
      setFields(sections);
    }
  }, [data]);

  return (
    <VStack spacing={4} align="stretch">
      {fields.map((field, index) => (
        <Box key={index} p={5} shadow="lg" borderWidth="2px" borderRadius="lg" bg="gray.50">
          <Flex justify="space-between" align="center">
            <Input
              placeholder="Field name"
              fontWeight="bold"
              value={field.name}
              onChange={(e) => setFields(fields.map((f, i) => i === index ? { ...f, name: e.target.value } : f))}
            />
            <IconButton
              aria-label="Delete field"
              icon={<DeleteIcon />}
              onClick={() => handleDeleteField(index)}
              variant="ghost"
              colorScheme="red"
            />
          </Flex>
          <Divider my={3} />
          <Input
            placeholder="Value"
            type="number"
            value={field.value}
            onChange={(e) => handleInputChange(index, e.target.value)}
            focusBorderColor="teal.400"
          />
        </Box>
      ))}
      <Flex justify="center">
        <Button mr={2} colorScheme="teal" onClick={handleAddField}>Add Field</Button>
        <Button colorScheme="blue">Create</Button>
      </Flex>
    </VStack>
  );
}

export default RubricInputs;
