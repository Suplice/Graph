export const validateLastNameIsReq = (lastName: string) => ({
  message: "First Name is required",
  isValid: !lastName ? false : true,
});

export const validateLastNameIsMinLength = (lastName: string) => ({
  message: "First Name must be at least 2 characters",
  isValid: lastName.length >= 2 ? true : false,
});
