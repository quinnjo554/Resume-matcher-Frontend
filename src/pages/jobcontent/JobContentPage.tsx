"use client"
import Navbar from "@/components/Navbar/Navbar"
import { getUser } from "@/hooks/user/user-hooks"
import { useGlobalContext } from "@/providers/UserContext";
import { Box } from "@chakra-ui/react"
import JobInputs from "../createjob/components/JobInputs";
import JobInfoCard from "./components/JobInfoCard";
import { FormProvider } from "@/providers/FormProvider";
export default function JobContentPage({ jobId }: { jobId: string }) {

  const { email } = useGlobalContext();
  const { data: user } = getUser(email)

  return user && (
    <Box>
      <Navbar user={user} hasSearch={false}>
        <FormProvider>
          <JobInfoCard jobId={Number(jobId)}></JobInfoCard>
        </FormProvider>
      </Navbar>
    </Box>
  )
}

