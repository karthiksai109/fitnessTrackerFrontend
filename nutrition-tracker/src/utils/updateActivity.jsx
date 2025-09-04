const Workout = require("../Models/workoutModel");
const User = require("../Models/userModel");

const updateUserActivityStatus = async (userId) => {
  const now = new Date();
  const last7Days = new Date();
  last7Days.setDate(now.getDate() - 7);

  // Count workouts in the last 7 days
  const workoutCount = await Workout.countDocuments({
    user: userId,
    date: { $gte: last7Days, $lte: now },
  });

  let status = "Less Active"; // default
  if (workoutCount >= 6) status = "Active";
  else if (workoutCount >= 4) status = "Moderate";

  // Update user record
  await User.findByIdAndUpdate(userId, { activityStatus: status });
};

module.exports = { updateUserActivityStatus };
