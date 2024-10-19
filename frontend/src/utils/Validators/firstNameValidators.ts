export const validateFirstNameIsReq = (firstName: string) => ({
  message: "First Name is required",
  isValid: !firstName ? false : true,
});

export const validateFirstNameIsMinLength = (firstName: string) => ({
  message: "First Name must be at least 2 characters",
  isValid: firstName.length >= 2 ? true : false,
});
