"use client";
import { Box, Center, Image, Text, Flex } from "@chakra-ui/react";
import landingImg from "../../../../public/ameer-basheer-gV6taBJuBTk-unsplash.jpg";
import React from "react";
function LandingHero() {
  return (
    <Box
      w="60%"
      h="100vh"
      display="flex"
      alignItems="center"
      position="relative"
    >
      <Image
        rounded="lg"
        w="100%"
        h="100%"
        src={landingImg.src}
        alt="Landing Image"
      />
      <Box position="absolute" w="60%" bottom="20px" left="200px">
        <Center h="110vh">
          <Flex flexDirection="column" alignItems="start">
            <Text
              pb={3}
              fontSize="6xl"
              fontWeight="extrabold"
              color="white"
              mb="4"
            >
              Try Resume matcher by Kompletion for free today
            </Text>
            <Text fontSize="3xl" fontWeight={"bold"} color="twitter.300">
              Have Your Job description matched with talent that best suits your company
            </Text>
          </Flex>
        </Center>
      </Box>
    </Box>
  );
}

export default LandingHero;

