import { Box, Card, CardBody, CardFooter, Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';


function AppCard({ title, img, style }: { title: string; img: string; style?: React.CSSProperties }) {
  return (
    <Box style={style}>
      <Card p="6" maxW="md" mx="auto" boxShadow="lg" rounded="2xl">
        <CardBody>
          <Box textAlign="center">
            <Image src={img} maxH="200px" mx="auto" />
            <Text p="2" fontSize="large" textColor="black">{title}</Text>
          </Box>
        </CardBody>
      </Card>
    </Box>
  );
}

export default AppCard;
