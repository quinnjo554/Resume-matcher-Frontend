"use client"
import React, { useContext, useEffect, useState } from 'react'
import { Box, Button, Card, Center, CircularProgress, Heading, Modal, ModalBody, ModalContent, ModalOverlay, Text } from '@chakra-ui/react';
import JobInputs from './JobInputs';
import ResumeUpload from './ResumeUpload';
import RubricInputsCreateJob from './RubricCreateJob';
import { PostJob, useJobForm } from '@/hooks/job/job-hooks';
import JobRequest from '@/models/job/JobRequest';
import { useGlobalContext } from '@/providers/UserContext';
import { getUser } from '@/hooks/user/user-hooks';
import { useRouter } from 'next/navigation';
import { JobAwardContext } from '@/providers/JobAwardProvider';
import { postCandidateScore } from '@/hooks/candidates/candidates-hooks';
import { setTimeout } from 'timers';
import LoadingGif from '../../../../public/loadingAni.json'
import Lottie from "lottie-react";
import { PostRubric } from '@/hooks/rubrics/rubric-hooks';
import RubricRequest from '@/models/rubric/RubricRequest';
function CreateJobInputs() {
  const { formState, setFormState } = useJobForm();
  const { name, email, image } = useGlobalContext();
  const { data: user } = getUser(email);
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false);
  const postJob = async (event: React.FormEvent) => {
    event.preventDefault();

    //post rubric here then keep the id and place in rubric 
    const rubric: RubricRequest = { sections: formState.rubric }
    const rubricData = await PostRubric(rubric);

    const job: JobRequest = {
      name: formState.title,
      jod_description: formState.description,
      rubric_id: rubricData.id, //needs to make a rubric and use that id
      location: formState.location,
      user_id: Number(user?.id),
      date_created: new Date(),
      priority: formState.priority.toLowerCase(),
    };

    console.log(user?.id);
    setIsLoading(true);
    const { id } = await PostJob(job);

    // state management- tells the other page a new job was posted
    localStorage.setItem('isNewJob', JSON.stringify(true))

    // call api on all resumes and continue when done
    const promises = formState.resumes.map((value, index) => postCandidateScore(Number(id), value));
    await Promise.all(promises);

    setIsLoading(false);
    router.push("/home");
  };

  return (user && (

    <>
      <Box alignSelf="center" p={5} width="50%">
        <Heading size="2xl" p={2} pb={4}>Create Job</Heading>
        <form onSubmit={postJob}>
          <JobInputs></JobInputs>
          <ResumeUpload></ResumeUpload>
          <Card shadow="2xl" marginTop={6}>
            <Box m={6}>
              <RubricInputsCreateJob />
            </Box>
          </Card>
          <Center>
            <Button textColor="white" m={3} bg="twitter.600" w='full' h="50px" type="submit">
              Create Job
            </Button>
          </Center>
        </form>
      </Box>
      <Modal isOpen={isLoading} onClose={() => { }} closeOnOverlayClick={false} >
        <ModalOverlay />
        <ModalContent className="bg-white rounded-lg text-center p-8 shadow-xl transform transition-all sm:max-w-lg sm:w-full">
          <ModalBody>
            <Text className="text-2xl font-bold mb-4">Hang On! Our AI is Generating Your Candidates!</Text>
            <div className="flex justify-center items-center bg-twitter-700 rounded-lg p-4 shadow-blue mb-4">
              <Lottie height="200" animationData={LoadingGif} />
            </div>
            <Text className="text-lg font-bold">This might take a few seconds. Thank you for your patience.</Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>

  )
  )
}

export default CreateJobInputs;

export function LoadingModal({ isLoading }: { isLoading: boolean }) {
  return (
    <Modal isOpen={isLoading} onClose={() => { }} closeOnOverlayClick={false} >
      <ModalOverlay />
      <ModalContent className="bg-white rounded-lg text-center p-8 shadow-xl transform transition-all sm:max-w-lg sm:w-full">
        <ModalBody>
          <Text className="text-2xl font-bold mb-4">Hang On! Our AI is Generating Your Candidates!</Text>
          <div className="flex justify-center items-center bg-twitter-700 rounded-lg p-4 shadow-blue mb-4">
            <Lottie height="200" animationData={LoadingGif} />
          </div>
          <Text className="text-lg font-bold">This might take a few seconds. Thank you for your patience.</Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
