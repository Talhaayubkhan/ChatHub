import { Unauthorized } from "../errors/index.js";

export const allowPermission = (requestUser, resourceUserId) => {
  if (requestUser.role === "admin") return;

  if (requestUser.userId === resourceUserId.toString()) return;

  throw new Unauthorized("You are not allowed to access this page");
};
