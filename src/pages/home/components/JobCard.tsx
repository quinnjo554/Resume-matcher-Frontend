import {
  Box, Text, HStack, Divider, Menu, MenuButton, IconButton, MenuItem, MenuList, Card,
  useDisclosure,
} from "@chakra-ui/react";
import React, { memo } from 'react';
import { FaBriefcase, FaEllipsisH, FaEdit, FaTrashAlt, FaMapPin, FaCalendarAlt, FaUsers, FaClock, FaStar, FaCalendarCheck } from 'react-icons/fa';
import { FaRegFileAlt } from "react-icons/fa";
import Job from '@/models/job/job';
import { useCandidatesByJobId } from '@/hooks/candidates/candidates-hooks';
import { CanidateInfo } from './CanidateInfo';

import RubricModal from '../../../components/Modal/RubricModal'
const JobCard = memo(({ job }: { job: Job }) => {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const { data: candidates, isError } = useCandidatesByJobId(Number(job.id));
  if (isError) {
    return <p>Error</p>
  }

  return (candidates && (
    <Card shadow="2xl" display="flex" w="1100px" maxW="1100px" minW="100px" >
      <HStack alignSelf="center" p={4} spacing={4} alignItems="center">
        <FaBriefcase size={24} />
        <Text fontSize="lg" fontWeight="semibold">{job.name}</Text>
        <Box position="absolute" top={2} right={2}>
          <Menu>
            <MenuButton as={IconButton} icon={<FaEllipsisH />} />
            <MenuList>
              <MenuItem onClick={onOpen} icon={<FaRegFileAlt />}>Change Rubric</MenuItem>
              <MenuItem icon={<FaEdit />}>Edit job</MenuItem>
              <MenuItem icon={<FaTrashAlt color="red.500" />}>Delete</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </HStack>
      <HStack width="full" justifyContent="center" alignSelf="center" p={4} spacing={4}>
        <FaMapPin opacity={0.5} />
        <Text>New York, NY</Text>
        <Divider orientation="vertical" height="16px" mx={2.5} />
        <FaCalendarCheck opacity={0.5} />
        <Text>2w ago</Text>
        <Divider orientation="vertical" height="16px" mx={2.5} />
        <FaUsers opacity={0.5} />
        <Text>3 candidates</Text>
        <Divider orientation="vertical" height="16px" mx={2.5} />
        <FaStar opacity={0.5} />
        <Text>High priority</Text>
      </HStack>
      <RubricModal rubric={job.rubric} onOpen={onOpen} isOpen={isOpen} onClose={onClose} />
      {
        candidates
          .sort((a, b) => b.resume_score - a.resume_score) // Sort candidates by resume_score in descending order
          .slice(0, 4) // Take only the top 4 candidates
          .map((candidate, index) => (
            <CanidateInfo
              key={index} // Using index as key since we're mapping through a subset of candidates
              name={candidate.name}
              title={candidate.contact}
              description={candidate.resume}
              match={candidate.resume_score}
              value={index}
            />
          ))

      }
    </Card>
  )
  )
})

export default JobCard
