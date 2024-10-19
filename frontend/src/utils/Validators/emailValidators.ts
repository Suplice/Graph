export const validateEmailIsReq = (email: string): string | undefined => {
  if (!email) {
    return "Email is required";
  }
};

export const validateEmailIsEmail = (email: string): string | undefined => {
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return "Email must be a valid email";
  }
};
