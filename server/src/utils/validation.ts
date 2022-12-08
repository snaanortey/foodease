export interface ValidationResult {
  success: boolean;
  message?: string[];
}

// Validation of email using regex
const emailRegex = new RegExp(
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

// Validation of password
// Min 8 letter password, with at least a symbol, upper and lower case letters and a number
const passwordRegex = new RegExp(
  /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
);

export function validateNewUser(userDetails: any): ValidationResult {
  const { firstName, lastName, email, password } = userDetails;
  const falseResultsArray = [];
  if (!firstName) {
    falseResultsArray.push("First name is required.");
  }
  if (!lastName) {
    falseResultsArray.push("Last name is required.");
  }
  if (!email) {
    falseResultsArray.push("Email is required.");
  }
  if (!emailRegex.test(email)) {
    falseResultsArray.push("Not a valid email format.");
  }
  if (!password) {
    falseResultsArray.push("Password is required.");
  }
  if (!passwordRegex.test(password)) {
    falseResultsArray.push("Not a valid password format.");
  }
  // If the array has one or more strings from the previous if statements, it means
  // the parameter (req.body) passed to the function is not valid.
  if (falseResultsArray.length > 0)
    return {
      success: false,
      message: falseResultsArray,
    };
  return {
    success: true,
  };
};


