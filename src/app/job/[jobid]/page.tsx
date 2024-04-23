"use client"
import JobContentPage from "@/pages/jobcontent/JobContentPage"
import { JobsContext } from "@/providers/JobContext"
import React from "react"

function Page({ params }: {
  params: {
    jobid: string
  }
}) {
  return (
    <JobsContext.Provider value={params}>
      <JobContentPage jobId={params.jobid} />
    </JobsContext.Provider>
  )
}
export default Page
