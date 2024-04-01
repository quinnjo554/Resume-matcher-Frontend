import React, { ChangeEvent, useEffect, useRef } from "react";
import {
  AbsoluteCenter,
  Box,
  Button,
  Center,
  Divider,
  Heading,
  Input,
  Text,
  Image,
} from "@chakra-ui/react";
import { signIn, signOut } from "next-auth/react";
import GoogleLogo from "../../../../public/google-logo-9808.png"
function LoginModalInputs() {
  const email = useRef<string>("");
  const password = useRef<string>("");

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    email.current = e.target.value;
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    password.current = e.target.value;
  };

  const onSubmit = async () => {
    const result = await signIn("credentials", {
      email: email.current,
      password: password.current,
      redirect: true,
      callbackUrl: "/home",
    });
  };

  return (
    <Box>
      <Text textAlign="center">Login Using</Text>
      <Box>
        <Center>
          <Button
            mt={6}
            rounded={"full"}
            size="sm"
            w={20}
            h={20}
            color="black"
            variant="ghost"
            onClick={() => {
              signIn("google", { callbackUrl: "/home" });
            }}
          >
            <Image p={0} m={0} src={GoogleLogo.src} alt="Google" />
          </Button>
        </Center>
        <Center>
          <Box position="relative" width="50%" pt="16">
            <Divider
              borderRadius="lg"
              width="100%"
              borderColor="black"
              borderWidth="2px"
            />
            <AbsoluteCenter bg="white" mt={8} px={6}>
              <Text size="md" fontWeight="bold">
                OR
              </Text>
            </AbsoluteCenter>
          </Box>
        </Center>

        <Box display="flex" flexDirection="column" alignItems="center">
          <Box m="6" w="60%" maxW={"600px"}>
            <Input
              rounded="full"
              height="50px"
              placeholder="Email"
              bg="gray.300"
              type="email"
              size="md"
              onChange={handleEmailChange}
            />
          </Box>
          <Box mt={10} m="6" w="60%" maxW="600px">
            <Input
              rounded="full"
              height="50px"
              bg="gray.300"
              placeholder="Password"
              type="password"
              onChange={handlePasswordChange}
              size={"md"}
            />
          </Box>
        </Box>
        <Center mt={10}>
          <Button size="lg" width="20%" colorScheme="twitter" rounded={"full"}>
            Login
          </Button>
        </Center>
      </Box>
    </Box>
  );
}

export default LoginModalInputs;

