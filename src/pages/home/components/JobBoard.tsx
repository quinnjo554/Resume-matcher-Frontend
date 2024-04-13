import React, { memo, useContext, useState } from 'react'
import { useJobByUserId } from '@/hooks/job/job-hooks';
import { Box, SkeletonCircle, useMediaQuery } from "@chakra-ui/react"
import JobCard from './JobCard';
import User from '@/models/user/User';
import { JobAwardContext } from '@/providers/JobAwardProvider';
import CandidateAwardModal from '@/components/Modal/CandidateAwardModal';
function JobBoard({ user }: { user: User }) {
  const { data: jobs, isError, isLoading } = useJobByUserId(Number(user.id));
  const [isNewJob, setIsNewJob] = useState(JSON.parse(localStorage.getItem('isNewJob') || "false")); //this will get set to false in CandidateAwardModal

  if (isLoading) {
    return <SkeletonCircle />;
  }

  if (isError) {
    return <div>Error loading jobs</div>;
  }

  return (jobs && (
    <Box>
      {<CandidateAwardModal job={jobs[jobs.length - 1]} />}
      {jobs.map((job) => (
        <Box key={job.id} display="flex" mt={3} alignItems="center" justifyContent="center">
          <JobCard job={job} />
        </Box>
      ))}
    </Box>
  )
  );

}

export default JobBoard;
