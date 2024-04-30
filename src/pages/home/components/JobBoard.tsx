import React, { memo, useContext, useState } from 'react'
import { useJobByUserId } from '@/hooks/job/job-hooks';
import { Box, Button, Icon, SkeletonCircle, Text, VStack, useColorModeValue, useMediaQuery } from "@chakra-ui/react"
import JobCard from './JobCard';
import User from '@/models/user/User';
import { JobAwardContext } from '@/providers/JobAwardProvider';
import CandidateAwardModal from '@/components/Modal/CandidateAwardModal';
import { useQueryClient } from 'react-query';
import { FaBriefcase } from 'react-icons/fa';
import Link from 'next/link';
function JobBoard({ user }: { user: User }) {
  const { data: jobs, isError, isLoading } = useJobByUserId(Number(user.id));
  const [isNewJob, setIsNewJob] = useState(JSON.parse(localStorage.getItem('isNewJob') || "false")); //this will get set to false in CandidateAwardModal
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'gray.50');
  if (isLoading) {
    return <SkeletonCircle />;
  }

  if (isError) {
    return <div>Error loading jobs</div>;
  }

  if (jobs && jobs.length > 0) {
    return (
      <Box>
        {<CandidateAwardModal job={jobs[jobs.length - 1]} />}
        {jobs.map((job) => (job && (
          <Box key={job.id} display="flex" mt={3} alignItems="center" justifyContent="center">
            <JobCard job={job} />
          </Box>
        )))}
      </Box>
    );
  } else {
    return (
      <Box
        w="1000px"
        mx="auto"
        mt={5}
        p={5}
        bg={bgColor}
        boxShadow="2xl"
        rounded="lg"
        textAlign="center"
        position="relative"
        _after={{
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bg: "blue.900",
          opacity: 0.1,
          zIndex: -1,
          rounded: "lg",
        }}
      >
        <VStack spacing={4}>
          <Icon as={FaBriefcase} w={10} h={10} color="blue.500" />
          <Text fontSize="2xl" fontWeight="bold" color={textColor}>
            Welcome to Resume Matcher
          </Text>
          <Text fontSize="md" color={textColor}>
            Click "Create Job" to get started
          </Text>
          <Button as={Link} href="/createjob" colorScheme="blue" variant="ghost" size="lg" px={8}>
            Create Job
          </Button>
        </VStack>
      </Box>


    );
  }


}


export default JobBoard;
