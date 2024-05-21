import "server-only";

import { clerkClient } from "@clerk/nextjs/server";

export async function getAllUsers() {
  const response = await clerkClient.users.getUserList({});
  // const data = JSON.(response.data);
  const users = response.data.map(
    ({ id, fullName, imageUrl, primaryPhoneNumber, primaryEmailAddress }) => ({
      id: id,
      fullName: fullName,
      imageUrl: imageUrl,
      primaryPhoneNumber:
        primaryPhoneNumber?.phoneNumber.toString() ?? "No number",
      primaryEmailAddress: primaryEmailAddress?.emailAddress.toString(),
    }),
  );

  return users;
}

export async function getUser(id: string) {
  const response = await clerkClient.users.getUser(id);

  const user = {
    id: response.id,
    fullName: response.fullName,
    imageUrl: response.imageUrl,
    primaryPhoneNumber:
      response.primaryPhoneNumber?.phoneNumber.toString() ?? "No number",
    primaryEmailAddress: response.primaryEmailAddress?.emailAddress.toString(),
  };

  return user;
}
