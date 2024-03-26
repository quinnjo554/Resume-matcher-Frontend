import { Center, Box, List, ListItem, Card, CardBody, CardFooter, Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { BiBriefcase, BiCheckSquare, BiCoinStack, BiDotsVerticalRounded } from 'react-icons/bi';


function JobCard() {
  return (
    <Card w="full" p="6" mx="auto" maxW="3xl" boxShadow="lg" rounded="2xl">
      <CardBody>
        <Box textAlign="center">
          <Center>
            <BiBriefcase className='h-5 w-5' />
          </Center>
          <Text as="h1" mt="1" fontSize="2xl">Job Title</Text>
          <Center>
            <List mt="5">
              <ListItem mt="1" mb="1">
                <Flex>
                  <BiCheckSquare className='relative top-1'></BiCheckSquare>
                  <Text>
                    Marked As Filled
                  </Text>
                </Flex>
              </ListItem>
              <ListItem mb="1">
                <Flex>
                  <BiDotsVerticalRounded className='relative top-1'></BiDotsVerticalRounded>
                  <Text>
                    Edit Job
                  </Text>
                </Flex>
              </ListItem>
              <ListItem mb="1">
                <Flex>
                  <BiCoinStack className='relative top-1'></BiCoinStack>
                  <Text>
                    Delete
                  </Text>
                </Flex>
              </ListItem>
            </List>
          </Center>
        </Box>
        <Center>
          <List className='flex mt-5'>
            <ListItem mr="1">
              Info
            </ListItem>
            <ListItem mr="1">
              Info
            </ListItem>
            <ListItem mr="1">
              Info
            </ListItem>
          </List>
        </Center>
      </CardBody>
    </Card>
  );
}

export default JobCard;
