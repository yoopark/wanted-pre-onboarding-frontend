import { SigninResponse, signin } from '@/apis/api/auth/signin';
import { isAxiosErrorFromWantedPreOnboardingServer } from '@/apis/utils/isAxiosErrorFromWantedPreOnboardingServer';
import { FormLabel } from '@/components/styled/FormLabel';
import { useForm } from '@/hooks/useForm';
import { ROUTES } from '@/routes/ROUTES';
import type { SigninFormData } from '@/types/SignFormData';
import { setAccessToken } from '@/utils/localStorage';
import { verifyEmailConstraint } from '@/utils/verifyEmailConstraint';
import { verifyPasswordConstraint } from '@/utils/verifyPasswordConstraint';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const SigninForm = () => {
  const navigate = useNavigate();
  const { formData, handleChange } = useForm<SigninFormData>({
    email: '',
    password: '',
  });
  const [disabled, setDisabled] = useState<boolean>(true);
  const [passwordShown, setPasswordShown] = useState<boolean>(false);

  useEffect(() => {
    const { email, password } = formData;
    const isValidEmail = verifyEmailConstraint(email);
    const isValidPassword = verifyPasswordConstraint(password);
    setDisabled(!(isValidEmail && isValidPassword));
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

  const handleCheckboxChange = () => {
    setPasswordShown((cur) => !cur);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormLabel>
        이메일
        <input
          data-testid="email-input"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </FormLabel>
      <FormLabel>
        비밀번호
        <input
          data-testid="password-input"
          type={!passwordShown ? 'password' : 'text'}
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </FormLabel>
      <FormLabel>
        <input
          type="checkbox"
          checked={passwordShown}
          onChange={handleCheckboxChange}
        />
        비밀번호 보이기
      </FormLabel>
      {/* {!isValidEmail && <p>이메일 형식이 올바르지 않습니다</p>}
      {!isValidPassword && <p>비밀번호는 8자 이상이어야 합니다</p>} */}
      <button data-testid="signin-button" disabled={disabled}>
        로그인
      </button>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;
