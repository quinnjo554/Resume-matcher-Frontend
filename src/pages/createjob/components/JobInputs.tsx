import { useJobForm } from '@/hooks/job/job-hooks';
import { Card, Box, Input, Textarea, Text, Select, Tooltip } from '@chakra-ui/react'
import React from 'react'

function JobInputs() {
  const { formState, setFormState } = useJobForm(); // Use the context

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = event.target;
    setFormState(prevState => ({ ...prevState, [id]: value }));
  };

  return (
    <Box>
      <Card p={4} display="flex" shadow="2xl" bg="white">
        <Box className="space-y-4">
          <div className="space-y-2">
            <Text className="text-lg font-medium leading-none tracking-tighter">
              Title
            </Text>
            <Input className="w-full text-lg" id="title" placeholder="Enter job title" required onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Text className="text-lg font-medium leading-none tracking-tighter">
              Description
            </Text>
            <Textarea
              className="resize-none text-sm p-3"
              id="description"
              placeholder="Enter job description"
              required
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Text className="text-lg font-medium leading-none tracking-tighter">
              Location
            </Text>
            <Input className="w-full text-lg" id="location" placeholder="Enter job location" required onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Text className="text-lg font-medium leading-none tracking-tighter">
              Priority
            </Text>
            <Select className="w-full text-lg" placeholder='Select Priority' id="priority" onChange={handleChange}>
              <option value='Low'>Low</option>
              <option value='Medium'>Medium</option>
              <option value='High'>High</option>
            </Select>
          </div>
        </Box>
      </Card>
    </Box>
  )
}
export default JobInputs
