import complaintModel from "../models/complaints.model.js";
import asyncWrapper from "../middlewares/async.js";
import customError from "../middlewares/customError.js";

// Simulate notification (email or console log)
const notifyUser = (email, subject, message) => {
  console.log(`📩 Email to ${email} - ${subject}: ${message}`);
};

// Create Complaint
export const createComplaint = asyncWrapper(async (req, res, next) => {
  const userId = req.user.id;
  const { title, message, category, agency } = req.body;

  if (!agency) {
    return next(new customError("Agency is required", 400));
  }

  const newComplaint = await complaintModel.create({
    title,
    message,
    category,
    agency,
    user: userId,
  });

  // Notify user
  notifyUser(req.user.email, "Complaint Received", "Your complaint has been received.");

  res.status(201).json({
    message: "Complaint submitted successfully",
    complaint: newComplaint,
  });
});

// Agency resolves complaint
export const resolveComplaint = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const { response, status } = req.body;

  const complaint = await complaintModel.findById(id).populate('user');
  if (!complaint) {
    return next(new customError("Complaint not found", 404));
  }

  complaint.response = response || complaint.response;
  complaint.status = status || "Resolved";
  complaint.notified = true;

  await complaint.save();

  // Notify user
  notifyUser(
    complaint.user.email,
    "Complaint Update",
    `Your complaint has been updated to status: ${complaint.status}`
  );

  res.status(200).json({
    message: "Complaint resolved and user notified",
    complaint
  });
});

// Get all complaints (admin or dashboard)
export const getAllComplaints = asyncWrapper(async (req, res) => {
  const complaints = await complaintModel.find()
    .populate("user", "name email")
    .populate("agency", "name");

  res.status(200).json({ complaints });
});

// Get complaints by logged-in user
export const getMyComplaints = asyncWrapper(async (req, res) => {
  const userId = req.user.id;
  const myComplaints = await complaintModel.find({ user: userId })
    .populate("agency", "name");

  res.status(200).json({ complaints: myComplaints });
});

// Filter complaints by status or category
export const filterComplaints = asyncWrapper(async (req, res) => {
  const { status, category } = req.query;
  const filters = {};
  if (status) filters.status = status;
  if (category) filters.category = category;

  const filtered = await complaintModel.find(filters)
    .populate("agency", "name")
    .populate("user", "name email");

  res.status(200).json({ complaints: filtered });
});
