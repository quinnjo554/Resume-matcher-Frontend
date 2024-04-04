"use client"
import Navbar from '@/components/Navbar/Navbar'
import { useUserEmail } from '@/hooks/user/user-hooks';
import { useGlobalContext } from '@/providers/UserContext';
import createDefaultUser from '@/utils/defaultUser';
import React from 'react'
import JobInputs from './components/JobInputs';

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
        <JobInputs></JobInputs>
      </Navbar>
    )
  )
}

export default CreateJob
