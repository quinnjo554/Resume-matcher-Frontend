"use client"
import {
  Box, Text, HStack, Divider, Menu, MenuButton, IconButton, MenuItem, MenuList, Card,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useMutation } from 'react-query';
import React, { memo, useState } from 'react';
import { FaBriefcase, FaEllipsisH, FaEdit, FaTrashAlt, FaMapPin, FaCalendarAlt, FaUsers, FaClock, FaStar, FaCalendarCheck } from 'react-icons/fa';
import { FaRegFileAlt } from "react-icons/fa";
import Job from '@/models/job/job';
import { useCandidatesByJobId } from '@/hooks/candidates/candidates-hooks';

import RubricModal from '../../../components/Modal/RubricModal'
import { DeleteJobById } from "@/hooks/job/job-hooks";
import { useQueryClient } from "react-query";
import CandidateInfo from "./CanidateInfo";
import Link from "next/link";


const JobCard = ({ job }: { job: Job, }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast();
  const { data: candidates, isError } = job ? useCandidatesByJobId(job.id) : { data: null, isError: false };
  const MAX_CANDIDATES_TO_DISPLAY = 5;
  const jobPriority = job.priority[0].toUpperCase() + job.priority.slice(1, job.priority.length) // Just for uppercase

  const queryClient = useQueryClient(); // For refectching after delete

  const sortedCandidates = candidates ? [...candidates].sort((a, b) => b.resume_score - a.resume_score) : [];

  const currentdate = new Date();
  const jobDate = new Date(job.date_created);
  const diffTime = Math.abs(currentdate.getTime() - jobDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  let timeAgo;

  if (diffDays === 0) {
    timeAgo = 'just now';
  } else if (diffDays < 7) {
    timeAgo = `${diffDays}d ago`;
  } else {
    const diffWeeks = Math.floor(diffDays / 7);
    timeAgo = `${diffWeeks}w ago`;
  }


  if (isError) {
    return <p>Error</p>
  }

  const deleteJobMutation = useMutation(DeleteJobById, {
    onSuccess: () => {
      queryClient.invalidateQueries('Job');
      toast({
        title: "Job deleted",
        description: "The job was successfully deleted.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "There was an error deleting the job.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  });

  async function handleDelete(id: number) {
    deleteJobMutation.mutate(id);
  }

  return (job && candidates && sortedCandidates.length > 0 && (

    <Card shadow="2xl" display="flex" w="1100px" maxW="1100px" minW="100px" >
      <HStack alignSelf="center" p={4} spacing={4} alignItems="center">
        <FaBriefcase size={24} />
        <Text fontSize="lg" fontWeight="semibold">{job.name}</Text>
        <Box position="absolute" top={2} right={2}>
          <Menu>
            <MenuButton as={IconButton} icon={<FaEllipsisH />} />
            <MenuList>
              <MenuItem onClick={onOpen} icon={<FaRegFileAlt />}>Change Rubric</MenuItem>

              <Link href={`/job/${job.id}`}>
                <MenuItem icon={<FaEdit />}>
                  Edit job
                </MenuItem>
              </Link>
              <MenuItem onClick={() => handleDelete(Number(job.id))} icon={<FaTrashAlt color="red.500" />}>Delete</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </HStack>

      <HStack width="full" justifyContent="center" alignSelf="center" p={4} spacing={4}>

        <FaCalendarCheck opacity={0.5} />
        <Text>{timeAgo}</Text>
        <Divider orientation="vertical" height="16px" mx={2.5} />
        <FaUsers opacity={0.5} />
        <Text>{candidates.length} candidates</Text>
        <Divider orientation="vertical" height="16px" mx={2.5} />
        <FaStar opacity={0.5} />
        <Text>{jobPriority} priority</Text>

      </HStack>
      <RubricModal job={job} onOpen={onOpen} isOpen={isOpen} onClose={onClose} />
      {
        sortedCandidates.slice(0, MAX_CANDIDATES_TO_DISPLAY) // Take only the top 5 candidates
          .map((candidate, index) => (
            <CandidateInfo
              key={index} // Using index as key since we're mapping through a subset of candidates
              candidate={candidate}
              value={index}
            />
          ))
      }

    </Card >
  )
  )
}

export default JobCard
