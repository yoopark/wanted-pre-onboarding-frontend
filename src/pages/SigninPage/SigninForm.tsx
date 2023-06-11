import { SigninResponse, signin } from '@/apis/api/auth/signin';
import { isAxiosErrorFromWantedPreOnboardingServer } from '@/apis/utils/isAxiosErrorFromWantedPreOnboardingServer';
import { ROUTES } from '@/routes/ROUTES';
import type { SigninFormData } from '@/types/SignFormData';
import { setAccessToken } from '@/utils/localStorage';
import { useForm } from '@/utils/useForm';
import { verifySignFormData } from '@/utils/verifySignFormData';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const SigninForm = () => {
  const navigate = useNavigate();
  const { formData, handleChange } = useForm<SigninFormData>({
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
      const res = await signin(formData);
      if (res.status === 200) {
        setAccessToken(res.data.access_token);
        navigate(ROUTES.TODO);
      }
    } catch (e: unknown) {
      if (isAxiosErrorFromWantedPreOnboardingServer<SigninResponse>(e)) {
        const { message } = e.response.data;
        if (message === 'Unauthorized') {
          alert('비밀번호가 틀렸습니다'); // TODO: replace with toast
        } else {
          alert(message); // TODO: replace with toast
        }
      }
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        data-testid="email-input"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        data-testid="password-input"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
      />
      <button data-testid="signin-button" disabled={disabled}>
        로그인
      </button>
    </form>
  );
};
