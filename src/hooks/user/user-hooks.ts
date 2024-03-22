import { UseQueryResult, useQuery } from "react-query";
import User from "../../models/user/User";
import UserRequest from "../../models/user/UserRequest";

export function useUserEmail(email: string, user: UserRequest): UseQueryResult<User, unknown> {
  return useQuery(['User', email], async () => {
    const response = await fetch(`http://localhost:8000/user/${email}`);
    if (response.status == 500) { //change to the proper error. should be unique to user not posted
      PostUser(user);
    }
    const data = await response.json();
    return data
  })
}

export function getUser(email: string | undefined): UseQueryResult<User, unknown> {
  return useQuery(['User', email], async () => {
    const response = await fetch(`http://localhost:8000/user/${email}`);
    const user = await response.json();
    return user;
  })
}

export async function PostUser(user: UserRequest) {
  const response = await fetch('http://localhost:8000/user/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });
  const data = await response.json();
  return data;
}
