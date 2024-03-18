

import React from 'react';
import AppCard from './components/AppCard';
import Resume from './../../../public/12136678.jpg';
import { Box, Divider, Flex, Text } from '@chakra-ui/react';

function Homepage() {
  return (
    <Box>
      <Box width="50%">
        <Text fontSize="x-large" p="5" fontWeight="bold" textAlign="center">Your Apps</Text>
        <Divider></Divider>
        <Flex
          direction="column"
          alignItems="center"
          display="grid"
          gridTemplateColumns="repeat(2, 1fr)" // Adjust the number of columns as needed
          gridGap="30px" // Adjust the gap between cards
        >
          <AppCard title="Resume" img={Resume.src} />
          <AppCard title="Resume" img={Resume.src} />
          <AppCard title="Resume" img={Resume.src} />
        </Flex>
      </Box>
      <Box width={'50%'} position='fixed' top={0} right={0}>
      </Box>
    </Box >
  );
}

export default Homepage;
