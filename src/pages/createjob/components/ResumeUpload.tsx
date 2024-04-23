import React from 'react';
import { Box, Heading, Text, Icon, Card, VStack, HStack } from "@chakra-ui/react";
import { FiPlus, FiFile } from "react-icons/fi";
import { useJobForm } from '@/hooks/job/job-hooks';

function ResumeUpload() {
  const { formState, setFormState } = useJobForm(); // Use the context

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ? Array.from(event.target.files) : [];
    // Update the form state with the selected files
    setFormState(prevState => ({ ...prevState, resumes: [...prevState.resumes, ...files] }));
  };

  return (
    <Card mt={2} shadow="2xl" overflow="hidden">
      <Box p="6">
        <Heading size="lg" fontWeight="semibold">Upload Resumes</Heading>
        <Text mt="4">
          Drag and drop or select the PDF files containing the resumes of the candidates applying for this job.
        </Text>
      </Box>
      <Box p="6" borderWidth="2px" borderRadius="md" borderStyle="dashed" borderColor="gray.200" h="200px" display="flex" alignItems="center" justifyContent="center">
        <Icon as={FiPlus} w="6" h="6" opacity="0.5" />
        <input required type="file" accept=".pdf" onChange={onFileChange} style={{ display: 'none' }} id="file-upload" multiple />
        <label htmlFor="file-upload" className="cursor-pointer">Click to select files</label>
      </Box>
      <Box>
        {formState.resumes.map((value, index) => {
          return (
            <VStack key={index} align="start" spacing={4}>
              <HStack m={3} key={index} spacing={4}>
                <Text>{index + 1}.</Text>
                <Box boxSize={6} color="blue.500">
                  <Icon as={FiFile} boxSize="100%" />
                </Box>
                <Text fontSize="lg" fontWeight="medium">{value.name}</Text>
              </HStack>
            </VStack>
          )
        })}
      </Box>
    </Card>
  )
}


export default ResumeUpload;
