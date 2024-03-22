"use client"
import React from 'react';
import Navbar from '@/components/Navbar/Navbar';
import { useGlobalContext } from '@/providers/UserContext';
import createDefaultUser from '@/utils/defaultUser';
import { useUserEmail } from '@/hooks/user/user-hooks';

function Homepage() {

  //add user to db if user hasnt already been added
  const { name, email, image } = useGlobalContext();
  //check if user is authenticated, then post them to the db
  const dUser = createDefaultUser(name, email); //autoinit a user
  //get the user  
  const { data: user, isError } = useUserEmail(email, dUser);
  return (

    <Navbar>
      <div>{user?.name}</div>
    </Navbar>
  );
}

export default Homepage;
