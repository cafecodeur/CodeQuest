import db from './sqlite.js';

export const fetchLeaderboard = async () => {
  return await db.all("SELECT * FROM users ORDER BY rewards_earned DESC LIMIT 10");
};
