import asyncWrapper from "../middlewares/async.js";
import complaintModel from "../models/complaints.model.js";

export const getStats = asyncWrapper(async (req, res, next) => {
  const totalComplaints = await complaintModel.countDocuments();
  const pending = await complaintModel.countDocuments({ status: "Pending" });
  const resolved = await complaintModel.countDocuments({ status: "Resolved" });

  const byAgency = await complaintModel.aggregate([
    { $group: { _id: "$agency", count: { $sum: 1 } } }
  ]);

  res.status(200).json({ totalComplaints, pending, resolved, byAgency });
});