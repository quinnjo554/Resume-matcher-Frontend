"use client"
import React,{useContext} from 'react';
import Navbar from '@/components/Navbar/Navbar';
import { useGlobalContext } from '@/providers/UserContext';
import createDefaultUser from '@/utils/defaultUser';
import { useUserEmail } from '@/hooks/user/user-hooks';
import JobCard from './components/JobCard';
import { Box } from '@chakra-ui/react';
import { useMediaQuery } from '@chakra-ui/react';
import { useJobByUserId } from '@/hooks/job/job-hooks';
import JobBoard from './components/JobBoard';
import RubricModal from '../../components/Modal/RubricModal.tsx'
import ModalContext from '../../providers/ModalContext.tsx'
import { useDisclosure } from '@chakra-ui/react'
function Homepage() {

  //add user to db if user hasnt already been added
  const { name, email, image } = useGlobalContext();
  //check if user is authenticated, then post them to the db
  const dUser = createDefaultUser(name, email); //autoinit a user
  //get the user  
  const { data: user, isError } = useUserEmail(email, dUser);
  const [isLargeScreen] = useMediaQuery('(min-width: 768px)');
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    user && (
      <Navbar user={user}>
        {isLargeScreen ? (
          // Center on large screens using flexbox
          <Box display="flex" mt={6} alignSelf="center" justifyContent="center">
            <JobBoard onOpen={onOpen} user={user} />
          </Box>
        ) : (
          // Center horizontally on smaller screens using CSS margin: auto
          <Box marginX="auto" mt={6}>
            <JobBoard onOpen={onOpen} user={user} />
          </Box>
        )}
          <RubricModal onOpen={onOpen} isOpen={isOpen} onClose={onClose}/>
      </Navbar>
    )
  );
}

export default Homepage;
