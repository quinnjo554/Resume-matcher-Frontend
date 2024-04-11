interface JobRequest {
  name: string;
  jod_description: string;
  user_id: number; //id
  rubric_id: number; //id
  date_created: Date;
  priority: string;
}

export default JobRequest;
