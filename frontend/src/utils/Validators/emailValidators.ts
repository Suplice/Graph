export const validateEmailIsReq = (email: string) => ({
  message: "Email is required",
  isValid: !email ? false : true,
});

export const validateEmailIsValid = (email: string) => ({
  message: "Email must be valid",
  isValid: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? true : false,
});
