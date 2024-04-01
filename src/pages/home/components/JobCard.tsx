import User from '@/models/user/User';
import {
  Box, Text, VStack, HStack, Divider, Menu, MenuButton, IconButton, MenuItem, MenuList, Card,
  CircularProgress,
  CircularProgressLabel,
} from "@chakra-ui/react";
import React, { memo, useEffect, useState } from 'react';
import { FaBriefcase, FaEllipsisH, FaCheckCircle, FaEdit, FaTrashAlt, FaMapPin, FaCalendarAlt, FaUsers, FaClock, FaStar, FaCalendarCheck } from 'react-icons/fa';
import { FaRegFileAlt } from "react-icons/fa";
import Job from '@/models/job/job';
import { useCandidatesByJobId } from '@/hooks/candidates/candidates-hooks';
import { motion } from 'framer-motion';
import { CanidateInfo } from './CanidateInfo';

const JobCard = memo(({ job, onOpen }: { job: Job, onOpen:()=>void }) => {
  const { data: candidates, isError } = useCandidatesByJobId(Number(job.id));
  if (isError) {
    return <p>Error</p>
  }
  console.log( typeof(candidates) )
  return (candidates && (
    <Card shadow="2xl" display="flex" w="1100px" maxW="1100px" minW="100px" >
      <HStack alignSelf="center" p={4} spacing={4} alignItems="center">
        <FaBriefcase size={24} />
        <Text fontSize="lg" fontWeight="semibold">{job.name}</Text>
        <Box position="absolute" top={2} right={2}>
          <Menu>
            <MenuButton as={IconButton} icon={<FaEllipsisH />} />
            <MenuList>
              <MenuItem onClick={onOpen} icon={<FaRegFileAlt/>}>Change Rubric</MenuItem>
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
      {candidates?.map((candidate, value) => {
        return <CanidateInfo key={value} name={candidate.name} title={candidate.contact} description={candidate.resume} match={candidate.resume_score} value={value} />
      })}
    </Card>
  )
  )
})

export default JobCard
