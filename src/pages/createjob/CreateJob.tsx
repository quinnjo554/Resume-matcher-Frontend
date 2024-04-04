"use client"
import Navbar from '@/components/Navbar/Navbar'
import { useUserEmail } from '@/hooks/user/user-hooks';
import { useGlobalContext } from '@/providers/UserContext';
import createDefaultUser from '@/utils/defaultUser';
import React from 'react'
import JobInputs from './components/JobInputs';
import { Box, Center, Heading } from '@chakra-ui/react';
import ResumeUpload from './components/ResumeUpload';

function CreateJob() {

  //add user to db if user hasnt already been added
  const { name, email, image } = useGlobalContext();
  //check if user is authenticated, then post them to the db
  const dUser = createDefaultUser(name, email); //autoinit a user
  //get the user  
  const { data: user, isError } = useUserEmail(email, dUser);

  return (
    user && (
      <Navbar hasSearch={false} user={user}>
        <Box alignSelf="center" p={5} width="50%">
          <Heading size="2xl" p={2} pb={4}>Create Job</Heading>
          <JobInputs></JobInputs>
          <ResumeUpload></ResumeUpload>
        </Box>
      </Navbar >
    )
  )
}

export default CreateJob
