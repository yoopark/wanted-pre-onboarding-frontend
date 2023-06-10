import { useForm } from '@/utils/useForm';
import { useEffect, useState } from 'react';

interface SignupFormData {
  email: string;
  password: string;
}

const SignupPage = () => {
  const { formData, handleChange } = useForm<SignupFormData>({
    email: '',
    password: '',
  });

  const [disabled, setDisabled] = useState<boolean>(true);

  useEffect(() => {
    const verifySignupFormData = (formData: SignupFormData) => {
      const { email, password } = formData;
      if (!email.includes('@')) {
        return false;
      }
      if (password.length < 8) {
        return false;
      }
      return true;
    };

    const isValidSignupFormData = verifySignupFormData(formData);
    setDisabled(!isValidSignupFormData);
  }, [formData]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <>
      <h1>회원가입</h1>
      <form onSubmit={handleSubmit}>
        <input
          data-testid="email-input"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          data-testid="password-input"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <button data-testid="signup-button" disabled={disabled}>
          회원가입
        </button>
      </form>
    </>
  );
};

export default SignupPage;
