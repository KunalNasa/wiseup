import { clerkClient } from "@clerk/nextjs/server";



const ITEMS_PER_PAGE = 10;

async function isAdmin(userId: string) {
  const user = await (await clerkClient()).users.getUser(userId);
  return user.publicMetadata.role === "admin";
}