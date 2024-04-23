"use client"
import React, { useContext } from 'react';
import Navbar from '@/components/Navbar/Navbar';
import { useGlobalContext } from '@/providers/UserContext';
import createDefaultUser from '@/utils/defaultUser';
import { useUserEmail } from '@/hooks/user/user-hooks';
import { Box } from '@chakra-ui/react';
import { useMediaQuery } from '@chakra-ui/react';
import JobBoard from './components/JobBoard';
import { JobAwardProvider } from '@/providers/JobAwardProvider';
function Homepage() {

  //add user to db if user hasnt already been added
  const { name, email } = useGlobalContext();
  //check if user is authenticated, then post them to the db
  const dUser = createDefaultUser(name, email); //autoinit a user
  //get the user  
  const { data: user } =
    useUserEmail(email, dUser);
  const [isLargeScreen] = useMediaQuery('(min-width: 768px)');

  return (
    user && (
      <Navbar hasSearch={true} user={user}>
        <JobAwardProvider>
          {isLargeScreen ? (
            // Center on large screens using flexbox
            <Box display="flex" mt={6} alignSelf="center" justifyContent="center">
              <JobBoard user={user} />
            </Box>
          ) : (
            // Center horizontally on smaller screens using CSS margin: auto
            <Box marginX="auto" mt={6}>
              <JobBoard user={user} />
            </Box>
          )}
        </JobAwardProvider>
      </Navbar>
    )
  );
}

export default Homepage;
