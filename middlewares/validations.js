import { body } from "express-validator"
//validate signUp
export const signUpValidation = [
    body("FirstName", "First name is required").not().isEmpty(),
    body("LastName", "Last name is required").not().isEmpty(),
    body("Email", "Email is required").not().isEmpty(),
    body("Email", "Invalid Email").isEmail(),
    body("Password", "password is required").not().isEmpty(),
    body("Password", " provide strong password ").isStrongPassword(),
    body("ConfirmPassword", " retype password ").not().isEmpty(),
];
//validate login
export const loginValidation = [
    body("Email", "Email is required").not().isEmpty(),
    body("Email", "Invalid Email").isEmail(),
    body("Password", "password is required").not().isEmpty()
]
//validate forgotPassword
export const forgotPasswordValidation = [
    body("Email", "Email is required").not().isEmpty(),
    body("Email", "Invalid Email").isEmail(),
    body("Password", "password is required").not().isEmpty(),
    body("Password", " provide strong password ").isStrongPassword(),
    body("ConfirmPassword", " retype password ").not().isEmpty()
]
// validate contactUs
export const contactUsValidation = [
    body("Name", "name is required").not().isEmpty(),
    body("Email", "Email is required").not().isEmpty(),
    body("Email", "Email is invalid").isEmail(),
    body("Message", "message is required").not().isEmpty()
]
//government agency validation
 export const agencyValidation = [
  body("name")
    .notEmpty()
    .withMessage("Agency name is required")
    .isLength({ min: 2 })
    .withMessage("Agency name must be at least 2 characters long"),
  
  body("description")
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 5 })
    .withMessage("Description must be at least 5 characters long")
];
//complain validation
export const complaintValidation = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 5 })
    .withMessage("Title must be at least 5 characters long"),

  body("message")
    .notEmpty()
    .withMessage("Message is required")
    .isLength({ min: 10 })
    .withMessage("Message must be at least 10 characters long"),

  body("category")
    .notEmpty()
    .withMessage("Category is required")
    .isIn(["Service Delay", "Corruption", "Infrastructure", "Other"])
    .withMessage("Invalid category"),

  body("agency")
    .notEmpty()
    .withMessage("Agency is required")
    .isMongoId()
    .withMessage("Invalid agency ID"),
];
