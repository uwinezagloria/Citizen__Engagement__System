import express from "express"
import {
  contactUsValidation,
  forgotPasswordValidation,
  loginValidation,
  signUpValidation,
  agencyValidation,
  complaintValidation
  //   searchValidation,
} from "../middlewares/validations.js";
import { signUp, verifyOtp, login, resertNewPassword, getAllUser, getUserByRole, getUserById, updateUser, deleteUser } from "../controllers/user.controller.js"
import { createContactUs, deleteContactUs, getContact, getContactUs, updateContactUs } from "../controllers/contactUs.controller.js"
import { createAgency,
    getAllAgencies,
  updateAgency,
  deleteAgency,
  getAgencyByName } from "../controllers/governmentAgency.Controller.js";
  import {  createComplaint,
  resolveComplaint,
  getAllComplaints,
  getMyComplaints,
  filterComplaints, } from "../controllers/complaints.controller.js";
import { getUserNotifications, markAsRead } from "../controllers/notification.controller.js";
import auth from "../middlewares/auth.js";
import { getStats } from "../controllers/stats.controller.js";
const router = express.Router()

//signUp && signIn route
router.route("/signUp").post(signUpValidation, signUp)
router.route("/otp-verify").post(verifyOtp)
router.route("/login").post(loginValidation, login);
router.route("/resetPassword").post(forgotPasswordValidation, resertNewPassword)
//users
router.route("/users").get( getAllUser)
router.route("/users/role").get( getUserByRole)
router.route("/user").get( getUserById)
router.route("/users").patch(updateUser)
router.route("/user").delete( deleteUser)
//contact us route
router.route("/contactUs").post(contactUsValidation, createContactUs)
router.route("/contactUs").get( getContactUs)
router.route("/contactUs/email").get( getContact)
router.route("/contactUs").patch(updateContactUs)
router.route("/contactUs").delete(deleteContactUs)
router.route("/contactUs").post(contactUsValidation, createContactUs)
router.route("/contactUs").get( getContactUs)
router.route("/contactUs/email").get( getContact)
router.route("/contactUs").patch(updateContactUs)
router.route("/contactUs").delete(deleteContactUs)
// Government agency routes
router.post("/create", agencyValidation, createAgency)
router.get("/all", getAllAgencies);
router.patch("/update", updateAgency);
router.delete("/delete", deleteAgency);
router.get("/find", getAgencyByName)
//complaints routes
router.post("/", auth, complaintValidation, createComplaint);
router.put("/:id/resolve", auth, resolveComplaint);
router.get("/", auth, getAllComplaints); 
router.get("/mine", auth, getMyComplaints); 
router.get("/filter/query", auth, filterComplaints);
//notification routes
router.get("/", auth, getUserNotifications);
router.put("/read", auth, markAsRead);
//status
router.get("/status", auth, getStats)
export default router 