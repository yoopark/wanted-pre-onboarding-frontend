import { SignupResponse, postSignup } from '@/apis/api/auth/postSignup';
import { isAxiosErrorFromWantedPreOnboardingServer } from '@/apis/utils/isAxiosErrorFromWantedPreOnboardingServer';
import { ROUTES } from '@/routes/ROUTES';
import { useForm } from '@/utils/useForm';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface SignupFormData {
  email: string;
  password: string;
}

const SignupPage = () => {
  const navigate = useNavigate();
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
