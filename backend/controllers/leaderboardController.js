import { getTopUsers } from "../services/userService.js";

export const getLeaderboard = async (req, res) => {
  const leaders = await getTopUsers();
  res.json(leaders);
};
