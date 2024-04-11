import React, { useEffect } from 'react'
import { Flex, Button, Box, Input, VStack, Text, Divider, IconButton } from "@chakra-ui/react";
import { useState } from "react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useJobForm } from '@/hooks/job/job-hooks';


function RubricInputsCreateJob() {

  // WHEN HALE FINISHES ENDPOINTS COME BACK AND RUN GET RUBRIC BY ID THEN DO BELOW
  // if job.rubric = {} then use default values else fill in 
  const [fields, setFields] = useState([
    { name: "Education", value: 33 },
    { name: "Experience", value: 33 },
    { name: "Skills", value: 34 },
  ]);

  const { formState, setFormState } = useJobForm(); // Use the context
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

  useEffect(() => {
    setFormState(prevState => ({
      ...prevState,
      rubric: JSON.stringify(fields),
    }));
  }, [fields]);


  return (
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
      </Flex>
    </VStack>

  )
}

export default RubricInputsCreateJob
