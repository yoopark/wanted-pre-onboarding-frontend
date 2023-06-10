import { SigninResponse, postSignin } from '@/apis/api/auth/postSignin';
import { ACCESS_TOKEN_KEY } from '@/apis/constants';
import { isAxiosErrorFromWantedPreOnboardingServer } from '@/apis/utils/isAxiosErrorFromWantedPreOnboardingServer';
import { ROUTES } from '@/routes/ROUTES';
import type { SigninFormData } from '@/types/SignFormData';
import { useForm } from '@/utils/useForm';
import { verifySignFormData } from '@/utils/verifySignFormData';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SigninPage = () => {
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
      const res = await postSignin(formData);
      if (res.status === 200) {
        localStorage.setItem(ACCESS_TOKEN_KEY, res.data.access_token);
        alert('로그인 성공'); // TODO: replace with toast
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
    <>
      <h1>로그인</h1>
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
        <button data-testid="signin-button" disabled={disabled}>
          로그인
        </button>
      </form>
      <span>아직 계정이 없다면&nbsp;</span>
      <span>
        <Link to={ROUTES.SIGNUP}>회원가입</Link>
      </span>
    </>
  );
};

export default SigninPage;
