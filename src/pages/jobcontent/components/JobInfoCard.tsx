import { postCandidateScore, useCandidatesByJobId } from '@/hooks/candidates/candidates-hooks'
import { useJobById, useJobForm, useUpdateJob } from '@/hooks/job/job-hooks'
import Candidate from '@/models/candidates/Candidates'
import JobRequest from '@/models/job/JobRequest'
import { LoadingModal } from '@/pages/createjob/components/CreateJobInputs'
import ResumeUpload from '@/pages/createjob/components/ResumeUpload'
import CandidateInfo from '@/pages/home/components/CanidateInfo'
import { ModalContext } from '@/providers/ModalContext'
import { Box, Button, Card, Modal, ModalContent, ModalOverlay, Spinner, Text, Textarea, useDisclosure, useQuery } from '@chakra-ui/react'
import { useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'

function JobInfoCard({ jobId }: { jobId: number }) {
  const { data: job } = useJobById(jobId)
  const { data: candidates, refetch } = useCandidatesByJobId(jobId);
  const [jobDescription, setJobDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDescriptionChanged, setIsDescriptionChanged] = useState(false)

  const sortedCandidates = candidates ? [...candidates].sort((a, b) => b.resume_score - a.resume_score) : [];

  let priorityColors;
  switch (job?.priority) {
    case "high": {
      priorityColors = "bg-yellow-500";
      break;
    }
    case "medium": {
      priorityColors = "bg-blue-500";
      break;
    }
    case "low": {
      priorityColors = "bg-red-500";
      break;
    }
    default: {
      priorityColors = "";
    }
  }

  const handleUpdateDescription = async () => {
    setIsLoading(true);
    if (job) {
      const jobToUpdate: JobRequest = {
        name: job.name,
        jod_description: jobDescription, //use new job description
        user_id: job.user,
        priority: job.priority,
        rubric_id: job.rubric_id,
        location: job.location,
        date_created: job.date_created
      }
      await useUpdateJob(jobId, jobToUpdate);
      setIsLoading(false);
      setIsDescriptionChanged(true);
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { value } = event.target;
    setJobDescription(value);
  };

  return candidates && (job && (
    <Card shadow="2xl" className="mt-16 w-full max-w-4xl mx-auto">
      <Box className="m-5 space-y-2">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">{job?.name}</h1>
          <h1 className="text-gray-500 dark:text-gray-400">{job.location}</h1>
          <span className={`text-sm inline-block ${priorityColors} text-white dark:text-gray-900 dark:bg-yellow-300 px-2 py-1 rounded-full`}>
            {job?.priority}
          </span>
        </div>
      </Box>
      <Box className="pb-4 m-5">
        <div className="grid gap-2">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold tracking-tight">Job Description</h3>
            <Textarea
              className="text-gray-500 dark:text-gray-400"
              defaultValue={job?.jod_description}
              onChange={handleChange}
            />
            {isLoading ?
              <Spinner></Spinner> :
              <Button onClick={handleUpdateDescription} className="w-full">Save Changes</Button>
            }
          </div>
        </div>
        <hr className="my-8 border-gray-200 dark:border-gray-800" />
        <div className="space-y-4">
          <h3 className="text-2xl font-bold">Candidates</h3>
          {sortedCandidates.map((value, index) => {
            return <CandidateInfo candidate={value} value={index}></CandidateInfo>
          })}
        </div>
        <AddResumeModal refetchCandidates={refetch} jobId={jobId} isDescriptionChanged={isDescriptionChanged} candidates={candidates}></AddResumeModal>
      </Box>
    </Card>
  )
  )
}


export default JobInfoCard


function AddResumeModal({ jobId, isDescriptionChanged, candidates, refetchCandidates }: { jobId: number, isDescriptionChanged: boolean, candidates: Candidate[], refetchCandidates: () => void }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { formState, setFormState } = useJobForm();
  const [isLoading, setIsLoading] = useState(false);


  const handleNewCandidates = async () => {
    setIsLoading(true)
    //CANNOT USE value.resume because we arnt acually saving a file.
    //Need hale to give us a fiel
    //if not just take out isDescriptionChanged ? candidates.map((value) => postCandidateScore(jobId, value.resume)) :
    //const promises = isDescriptionChanged ? candidates.map((value) => postCandidateScore(jobId, value.resume)) : formState.resumes.map((value) => postCandidateScore(jobId, value));
    //await Promise.all(promises);
    setFormState(prevState => ({ ...prevState, resumes: [] })); //set resumes to empty so a user doesnt rescore the same person they already added
    refetchCandidates();
    setIsLoading(false)
    onClose();
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ResumeUpload />
          <LoadingModal isLoading={isLoading} />
          <Button onClick={handleNewCandidates}>Score Candidate</Button>
        </ModalContent>
      </Modal>
      <Button onClick={onOpen} className="w-full m-5">Add Candidate</Button>
    </>
  )
}
