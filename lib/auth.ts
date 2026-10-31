import { auth } from "@clerk/nextjs/server";

const adminIds = [
  "user_3HaXrfIlne1uRYykNB1JEHsZ7Y8",
];

export const getIsAdmin = async () => {
  const { userId } = await auth();

  if(!userId) {
    return false;
  }

  return adminIds.indexOf(userId) !== -1;
}