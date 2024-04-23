"use client"
import Navbar from '@/components/Navbar/Navbar'
import { useUserEmail } from '@/hooks/user/user-hooks';
import { useGlobalContext } from '@/providers/UserContext';
import createDefaultUser from '@/utils/defaultUser';
import React from 'react'
import CreateJobInputs from './components/CreateJobInputs';
import { FormProvider } from '@/providers/FormProvider';
import { JobAwardProvider } from '@/providers/JobAwardProvider';
import Providers from '@/providers/Providers';
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
        <FormProvider>
          <CreateJobInputs></CreateJobInputs>
        </FormProvider>
      </Navbar >
    )
  )
}

export default CreateJob
