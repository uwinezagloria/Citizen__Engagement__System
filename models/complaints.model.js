import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"]
  },
  message: {
    type: String,
    required: [true, "Message is required"]
  },
  category: {
    type: String,
    enum: [
      'Infrastructure',
      'Healthcare',
      'Education',
      'Security',
      'Water',
      'Electricity',
      'Corruption',
      'Customer Service',
      'Other'
    ],
    required: [true, "Category is required"]
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Resolved'],
    default: 'Pending'
  },
  response: {
    type: String,
    default: ""
  },
  notified: {
    type: Boolean,
    default: false
  },
  agency: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Agency',
    required: [true, "Agency is required"]
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, "User is required"]
  }
}, { timestamps: true });

const complaintModel = mongoose.model('Complaint', complaintSchema);
export default complaintModel;

