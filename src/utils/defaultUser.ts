function createDefaultUser(name: string, email: string) {
  //need to keep tract if this is a users first time on the sight.
  //then promt them with a modal 
  return {
    name: name,
    pfp: " ",
    email: email,

  };
}

export default createDefaultUser;

