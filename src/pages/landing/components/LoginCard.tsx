"use client";
import React from "react";
import {
  Card,
  CardHeader,
  Heading,
  CardBody,
  Box,
} from "@chakra-ui/react";
import LoginModalInputs from "@/components/Inputs/LoginInputs/LoginInputs";
export default function LoginCard() {
  return (
    <Card
      boxShadow="2xl"
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="40%"
      height="100vh"
      position="fixed"
      right="0"
    >
      <Box
        rounded={"2xl"}
        h="700px"
        minW={"75%"}
        p={5}
      >
        <CardHeader>
          <Heading
            fontWeight={"extrabold"}
            mt={10}
            fontSize="6xl"
            color="black"
            textAlign="center"
          >
            Login To Your Account
          </Heading>
        </CardHeader>

        <CardBody>
          <LoginModalInputs />
        </CardBody>
      </Box>
    </Card >
  );
}
