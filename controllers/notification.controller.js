import asyncWrapper from "../middlewares/async.js";
import notificationModel from "../models/notification.model.js";
import customError from "../middlewares/customError.js";

export const getUserNotifications = asyncWrapper(async (req, res, next) => {
  const notifications = await notificationModel.find({ user: req.user.id });
  res.status(200).json({ notifications });
});

export const markAsRead = asyncWrapper(async (req, res, next) => {
  const update = await notificationModel.findByIdAndUpdate(req.query.id, { isRead: true }, { new: true });
  if (!update) return next(new customError("Notification not found", 404));
  res.status(200).json({ updated: update });
});