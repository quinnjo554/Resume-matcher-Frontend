import React, { memo, useContext, useState } from 'react'
import { useJobByUserId } from '@/hooks/job/job-hooks';
import { Box, SkeletonCircle, useMediaQuery } from "@chakra-ui/react"
import JobCard from './JobCard';
import User from '@/models/user/User';
import { JobAwardContext } from '@/providers/JobAwardProvider';
import Confetti from 'react-confetti';
function JobBoard({ user }: { user: User }) {
  const { data: jobs, isError, isLoading } = useJobByUserId(Number(user.id));
  const [isNewJob, setIsNewJob] = useState(JSON.parse(localStorage.getItem('isNewJob') || "false"));
  if (isLoading) {
    return <SkeletonCircle />;
  }

  if (isError) {
    return <div>Error loading jobs</div>;
  }


  console.log(isNewJob)
  // If isNewJob is true, set it to false after 4 seconds
  setTimeout(() => {
    setIsNewJob(localStorage.setItem('isNewJob', JSON.stringify(false)));
  }, 5000);

  return (
    <Box>
      {isNewJob && <Confetti />}
      {jobs?.map((job) => (
        <Box key={job.id} display="flex" mt={3} alignItems="center" justifyContent="center">
          {/* Render the Confetti component if isNewJob is true */}
          <JobCard job={job} />
        </Box>
      ))}
    </Box>
  );

}

export default JobBoard;
