import Candidate from "@/models/candidates/Candidates";
import { CircularProgress, CircularProgressLabel, HStack, Text, VStack } from "@chakra-ui/react";
import { Document } from "react-pdf";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function CandidateInfo({ candidate, value }: { candidate: Candidate, value: number }) {
  const [progress, setProgress] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(candidate.resume_score);
    }, 1000); // adjust delay as needed

    return () => {
      clearTimeout(timer);
    };
  }, [candidate.resume_score]);

  const descriptionStyle = {
    transition: 'max-height 0.5s ease-in-out, opacity 0.5s',
    maxHeight: isHovering ? '400px' : '20px',
    overflow: 'hidden',
    whiteSpace: isHovering ? 'normal' : 'nowrap',
    textOverflow: isHovering ? 'clip' : 'ellipsis',
    width: '70%',
    opacity: 1,
  };
  let contents = candidate.resume; // This should be your file content
  let blob = new Blob([contents], { type: 'text/plain' }); // Create a blob from the string
  let file = new File([blob], "resume.txt", { type: "text/plain" }); // Create a file from the blob
  console.log(file.text())
  const shortDescription = isHovering ? candidate.resume_score_description : `${candidate.resume_score_description.slice(0, 30)}...`;
  return (
    <VStack p={4} align="start" spacing={4}>
      <HStack spacing={4}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        _hover={{ transform: "scale(1.07)" }}
        transition="transform 0.2s ease-in-out"
        position="relative"
        zIndex={isHovering ? 1 : 0}
      >
        <CircularProgress value={progress} color='green.400'>
          <CircularProgressLabel>{progress}%</CircularProgressLabel>
        </CircularProgress>
        <VStack width="full" align="start" spacing={1}>
          <Text fontWeight="semibold">{value + 1}. {candidate.name}</Text>
          <Text
            style={descriptionStyle}
            fontSize="sm"
            color="gray.500"
          >
            {shortDescription}
          </Text>
        </VStack>
      </HStack>
    </VStack>
  );
}
