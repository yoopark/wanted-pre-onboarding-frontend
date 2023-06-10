import { SignupResponse, postSignup } from '@/apis/api/auth/postSignup';
import { isAxiosErrorFromWantedPreOnboardingServer } from '@/apis/utils/isAxiosErrorFromWantedPreOnboardingServer';
import { ROUTES } from '@/routes/ROUTES';
import type { SignupFormData } from '@/types/SignFormData';
import { useForm } from '@/utils/useForm';
import { verifySignFormData } from '@/utils/verifySignFormData';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const navigate = useNavigate();
  const { formData, handleChange } = useForm<SignupFormData>({
    email: '',
    password: '',
  });
  const [disabled, setDisabled] = useState<boolean>(true);

  useEffect(() => {
    const isValidSignFormData = verifySignFormData(formData);
    setDisabled(!isValidSignFormData);
  }, [formData]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await postSignup(formData);
      if (res.status === 201) {
        alert('회원가입 성공'); // TODO: replace with toast
        navigate(ROUTES.SIGNIN);
      }
    } catch (e: unknown) {
      if (isAxiosErrorFromWantedPreOnboardingServer<SignupResponse>(e)) {
        const { message } = e.response.data;
        alert(message); // TODO: replace with toast
      }
    }
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
