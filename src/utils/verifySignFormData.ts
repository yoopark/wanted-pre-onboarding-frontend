import type { SignFormData } from '@/types/SignFormData';

const verifyEmailConstraint = (email: string) => {
  return email.includes('@');
};

const verifyPasswordConstraint = (password: string) => {
  return password.length >= 8;
};

export const verifySignFormData = (formData: SignFormData) => {
  const { email, password } = formData;

  if (!verifyEmailConstraint(email)) {
    return false;
  }
  if (!verifyPasswordConstraint(password)) {
    return false;
  }
  return true;
};
