import React, { memo } from 'react'
import { useJobByUserId } from '@/hooks/job/job-hooks';
import { Box, SkeletonCircle, useMediaQuery } from "@chakra-ui/react"
import JobCard from './JobCard';
import User from '@/models/user/User';
const JobBoard = memo(({ user }: { user: User }) => {
  const { data: jobs, isError, isLoading } = useJobByUserId(Number(user.id));
  if (isLoading) {
    return (
      <SkeletonCircle></SkeletonCircle>
    )
  }
  if (jobs) {
    return (jobs && (
      <Box>
        {jobs.map((job, value) => {
          return (
            <Box key={value} display="flex" mt={3} alignItems="center" justifyContent="center">
              <JobCard job={job} />
            </Box>
          )
        })}
      </Box>
    )
    );
  }
}
)
export default JobBoard
