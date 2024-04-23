import Rubric from "@/models/rubric/Rubric";
import RubricRequest from "@/models/rubric/RubricRequest";
import { UseQueryResult, useQuery, useQueryClient } from "react-query";

export function getRubric(id: number | undefined): UseQueryResult<Rubric, unknown> {
  return useQuery(['Rubric', id], async () => {
    const response = await fetch(`http://localhost:8000/rubric/${id}`);
    const rubric = await response.json();
    return rubric;
  })
}



export async function PostRubric(rubric: RubricRequest): Promise<Rubric> {
  console.log(JSON.stringify(rubric));
  const response = await fetch(`http://localhost:8000/rubric/add/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(rubric)
  });
  const data = await response.json();
  console.log({ data });
  return data;
}
