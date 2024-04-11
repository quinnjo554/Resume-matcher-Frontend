"use client"
import React, { useContext, useEffect, useState } from 'react'
import { Box, Button, Card, Center, Heading } from '@chakra-ui/react';
import JobInputs from './JobInputs';
import ResumeUpload from './ResumeUpload';
import RubricInputsCreateJob from './RubricCreateJob';
import { PostJob, useJobForm } from '@/hooks/job/job-hooks';
import JobRequest from '@/models/job/JobRequest';
import { useGlobalContext } from '@/providers/UserContext';
import { getUser } from '@/hooks/user/user-hooks';
import { useRouter } from 'next/navigation';
import { JobAwardContext } from '@/providers/JobAwardProvider';

function CreateJobInputs() {
  const { formState, setFormState } = useJobForm();
  const { name, email, image } = useGlobalContext();
  const { data: user } = getUser(email);
  const [showConfetti, setShowConfetti] = useState(false); // Add this line
  const router = useRouter()

  const postJob = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent the default form submission

    const job: JobRequest = {
      name: formState.title,
      jod_description: formState.description,
      rubric_id: 1, //needs to make a rubric and use that id
      user_id: Number(user?.id),
      date_created: new Date(),
      priority: formState.priority.toLowerCase(),
    };

    const { data } = await PostJob(job);
    localStorage.setItem('isNewJob', JSON.stringify(true))
    router.push("/home");
  };

  return (
    <Box alignSelf="center" p={5} width="50%">
      <Heading size="2xl" p={2} pb={4}>Create Job</Heading>
      <form onSubmit={postJob}>
        <JobInputs></JobInputs>
        <ResumeUpload></ResumeUpload>
        <Card shadow="2xl" marginTop={6}>
          <Box m={6}>
            <RubricInputsCreateJob />
          </Box>
        </Card>
        <Center>
          <Button textColor="white" m={3} bg="twitter.600" w='full' h="50px" type="submit">
            Create Job
          </Button>
        </Center>
      </form>
    </Box>
  )
}

export default CreateJobInputs;

