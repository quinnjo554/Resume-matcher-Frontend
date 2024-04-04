import { Card, Box, Input, Textarea, Text } from '@chakra-ui/react'
import React from 'react'

function JobInputs() {
  return (
    <Box>
      <Card>
        <Box className="space-y-4">
          <div className="space-y-2">
            <Text className="text-lg font-medium leading-none tracking-tighter">
              Title
            </Text>
            <Input className="w-full text-lg" id="title" placeholder="Enter job title" required />
          </div>
          <div className="space-y-2">
            <Text className="text-lg font-medium leading-none tracking-tighter">
              Description
            </Text>
            <Textarea
              className="resize-none h-[150px] text-sm p-3"
              id="description"
              placeholder="Enter job description"
              required
            />
          </div>
          <div className="space-y-2">
            <Text className="text-lg font-medium leading-none tracking-tighter">
              Location
            </Text>
            <Input className="w-full text-lg" id="location" placeholder="Enter job location" required />
          </div>
          <div className="space-y-2">
            <Text className="text-lg font-medium leading-none tracking-tighter">
              Tags
            </Text>
            <Input className="w-full text-lg" id="tags" placeholder="Enter tags" />
            <div className="text-sm">
              Enter a comma-separated list of tags that best describe the job (e.g., remote, full-time, javascript).
            </div>
          </div>
        </Box>
      </Card>
    </Box>
  )
}

export default JobInputs
