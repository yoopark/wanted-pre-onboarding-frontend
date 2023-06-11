export const verifyPasswordConstraint = (password: string) => {
  return password.length >= 8;
};
