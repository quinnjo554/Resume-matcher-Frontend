import { CircularProgress, CircularProgressLabel, HStack, Text, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

export function CanidateInfo({ name, title, description, match, value }: { name: string, title: string, description: string, match: number, value: number }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(match);
    }, 500); // adjust delay as needed

    return () => {
      clearTimeout(timer);
    };
  }, [match]);

  return (
    <VStack p={4} align="start" spacing={4} >
      <HStack spacing={4} _hover={{ transform: "scale(1.07)" }} transition="transform 0.2s">
        <CircularProgress value={progress} color='green.400'>
          <CircularProgressLabel>{progress}%</CircularProgressLabel>
        </CircularProgress>
        <VStack width="full" align="start" spacing={1}>
          <Text fontWeight="semibold">{value + 1}. {name}</Text>
          <Text isTruncated maxWidth="350px" fontSize="sm" color="gray.500">
            {description}
          </Text>
        </VStack>
      </HStack>
    </VStack>
  );
}

