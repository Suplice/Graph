export const validatePasswordIsReq = (password: string) => ({
  message: "Password is required",
  isValid: !password ? false : true,
});

export const validatePasswordIsMinLength = (password: string) => ({
  message: "Password must be at least 8 characters",
  isValid: password.length >= 8 ? true : false,
});

export const validatePasswordHasUppercase = (password: string) => ({
  message: "Password must contain at least one uppercase letter",
  isValid: /[A-Z]/.test(password) ? true : false,
});

export const validatePasswordHasNumber = (password: string) => ({
  message: "Password must contain at least one number",
  isValid: /\d/.test(password) ? true : false,
});

export const validatePasswordHasSpecialChar = (password: string) => ({
  message: "Password must contain at least one special character",
  isValid: /[!@#$%^&*]/.test(password) ? true : false,
});
