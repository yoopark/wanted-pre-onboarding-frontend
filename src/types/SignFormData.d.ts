export type SignFormData = {
  email: string;
  password: string;
};

export type SigninFormData = SignFormData;

export type SignupFormData = SignFormData & {
  /* additional fields */
};
