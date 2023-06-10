import { useForm } from '@/utils/useForm';

interface SignupFormData {
  email: string;
  password: string;
}

const SignupPage = () => {
  const { formData, handleChange } = useForm<SignupFormData>({
    email: '',
    password: '',
  });

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
        <button data-testid="signup-button">회원가입</button>
      </form>
    </>
  );
};

export default SignupPage;
