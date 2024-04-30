interface Job {
  id: number;
  name: string;
  jod_description: string;
  user: number; //id
  location: string;
  rubric_id: number; //id
  date_created: Date;
  priority: string;
}

export default Job;
