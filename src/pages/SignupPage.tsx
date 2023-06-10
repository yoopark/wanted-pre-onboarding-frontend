const SignupPage = () => {
  return (
    <>
      <h1>회원가입</h1>
      <form>
        <input data-testid="email-input" />
        <input data-testid="password-input" />
        <button data-testid="signup-button">회원가입</button>
      </form>
    </>
  );
};

export default SignupPage;
