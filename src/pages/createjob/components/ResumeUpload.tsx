
import { Box, Heading, Text, Icon, Card } from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";
function ResumeUpload() {

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ? Array.from(event.target.files) : [];
    files.forEach(file => {
      console.log(file);
      // handle each file here
    });
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
        <input type="file" accept=".pdf" onChange={onFileChange} style={{ display: 'none' }} id="file-upload" multiple />
        <label htmlFor="file-upload" className="cursor-pointer">Click to select files</label>
      </Box>
    </Card>
  )
}

export default ResumeUpload;
