import { db } from "../index.mjs";

export const getTopUsers = async () => {
  return await db.all("SELECT * FROM users ORDER BY rewards_earned DESC LIMIT 10");
};
