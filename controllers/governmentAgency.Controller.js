import { validationResult } from "express-validator";
import asyncWrapper from "../middlewares/async.js";
import agencyModel from "../models/governmentAgency.model.js";
import customError from "../middlewares/customError.js";
// Create Agency
export const createAgency = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new customError(errors.array()[0].msg, 400));
  }

  const newAgency = await agencyModel.create(req.body);
  res.status(201).json({ message: newAgency });
});

// Get All Agencies
export const getAllAgencies = asyncWrapper(async (req, res, next) => {
  const agencies = await Agency.find();
  res.status(200).json({ message: agencies });
});

// Update Agency
export const updateAgency = asyncWrapper(async (req, res, next) => {
  const updated = await agencyModel.findByIdAndUpdate(
    { _id: req.query.id },
    req.body,
    { new: true }
  );
  if (!updated) {
    return next(new customError("Agency not found", 404));
  }
  res.status(200).json({ updated });
});

// Delete Agency
export const deleteAgency = asyncWrapper(async (req, res, next) => {
  const deleted = await agencyModel.findByIdAndDelete({ _id: req.query.id });
  if (!deleted) {
    return next(new customError("Agency not found", 404));
  }
  res.status(200).json({ deleted });
});

// Get one agency by name
export const getAgencyByName = asyncWrapper(async (req, res, next) => {
  const agency = await agencyModel.findOne({ name: req.query.name });
  if (!agency) {
    return next(new customError("Agency not found", 404));
  }
  res.status(200).json({ agency });
});
