interface Job {
  id: string;
  name: string;
  jod_description: string;
  user: number; //id
  rubric_id: number; //id
  date_created: Date;
  priority: string;
}

export default Job;
