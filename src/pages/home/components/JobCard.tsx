import {
  Box, Text, HStack, Divider, Menu, MenuButton, IconButton, MenuItem, MenuList, Card,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { memo, useState } from 'react';
import { FaBriefcase, FaEllipsisH, FaEdit, FaTrashAlt, FaMapPin, FaCalendarAlt, FaUsers, FaClock, FaStar, FaCalendarCheck } from 'react-icons/fa';
import { FaRegFileAlt } from "react-icons/fa";
import Job from '@/models/job/job';
import { useCandidatesByJobId } from '@/hooks/candidates/candidates-hooks';
import { CanidateInfo } from './CanidateInfo';

import RubricModal from '../../../components/Modal/RubricModal'
import { DeleteJobById } from "@/hooks/job/job-hooks";
import { useQueryClient } from "react-query";
const JobCard = ({ job }: { job: Job }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast();
  const { data: candidates, isError } = useCandidatesByJobId(Number(job.id));
  const [message, setMessage] = useState("");
  const MAX_CANDIDATES_TO_DISPLAY = 4;
  const jobPriority = job.priority[0].toUpperCase() + job.priority.slice(1, job.priority.length) // Just for uppercase

  const queryClient = useQueryClient(); // For refectching after delete

  if (isError) {
    return <p>Error</p>
  }

  async function handleDelete(id: number) {
    const message = await DeleteJobById(id);
    setMessage(message);
    queryClient.invalidateQueries('Job');

    toast({
      title: "Job deleted",
      description: "The job was successfully deleted.",
      status: "success",
      duration: 5000,
      isClosable: true,
    })
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
              <MenuItem onClick={() => handleDelete(Number(job.id))} icon={<FaTrashAlt color="red.500" />}>Delete</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </HStack>
      <HStack width="full" justifyContent="center" alignSelf="center" p={4} spacing={4}>
        <FaCalendarCheck opacity={0.5} />
        <Text>2w ago</Text>
        <Divider orientation="vertical" height="16px" mx={2.5} />
        <FaUsers opacity={0.5} />
        <Text>{candidates.length} candidates</Text>
        <Divider orientation="vertical" height="16px" mx={2.5} />
        <FaStar opacity={0.5} />
        <Text>{jobPriority} priority</Text>
      </HStack>
      <RubricModal job={job} onOpen={onOpen} isOpen={isOpen} onClose={onClose} />
      {
        candidates
          .sort((a, b) => b.resume_score - a.resume_score) // Sort candidates by resume_score in descending order
          .slice(0, MAX_CANDIDATES_TO_DISPLAY) // Take only the top 4 candidates
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
}

export default JobCard
